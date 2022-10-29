import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { addItemsAction } from '../actions/index'

const Archive = () => {

    const [uderlyingsData, setUnderlyingsData] = useState([]);
    
    const livePrices = useSelector( state => state.livePriceOfItems );

    const dispatch = useDispatch();

    const xhrRunner = useRef( false );

    useEffect(() => {

        if ( xhrRunner.current ) {
            return;
        }

        xhrRunner.current = true;

        const fetchData = async () => {
            try {
                const {
                    data: { payload : response }
                } = await axios.get('https://prototype.sbulltech.com/api/underlyings');

                setUnderlyingsData(response);

                dispatch( addItemsAction(response) );

            } catch (e) {
                console.error(e.message);
            }
        }

        fetchData();

    }, [] )

    return (
        <>
        <center>
        {
            uderlyingsData.map( (item) => {
                return (
                <p key={item.token} __token={item.token}>
                    { item.symbol } : <span className="price">{ livePrices[item.token] ? (livePrices[item.token]).price : '' }</span>&nbsp;&nbsp;
                    <Link to={`/item/${item.token}`}>
                        <button type="button">Show Derivatives</button>
                    </Link>
                </p>
                )
            })
        }
        </center>
        </>
    )
};

export default Archive;