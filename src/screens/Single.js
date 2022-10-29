import React, { useState, useEffect, useRef } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { addItemsAction } from '../actions/index'
import axios from 'axios';

const Single = () => {

    const [ derivativeData, setDerivativeData ] = useState([]);
    const livePrices = useSelector( state => state.livePriceOfItems);
    const xhrRunner = useRef();
    const params = useParams();
    const dispatch = useDispatch();

    useEffect( () => {

        if ( xhrRunner.current) {
            return;
        }

        xhrRunner.current = true;

        const fetchData = async () => {
            try {
                const {
                    data: { payload : response }
                } = await axios.get(`https://prototype.sbulltech.com/api/derivatives/${params.token}`);

                setDerivativeData(response);
                dispatch( addItemsAction(response) );

            } catch (e) {
                console.error(e.message);
            }
        }

        fetchData();

    }, [params] );

    return (
        <>
        <center>
        {
            derivativeData.map( (item) => {
                return (
                <p key={item.token} __token={item.token}>
                    { item.symbol } : <span className="price">{ livePrices[item.token] ? (livePrices[item.token]).price : '' }</span>&nbsp;&nbsp;
                </p>
                )
            })
        }
        <button><Link to="/">Back to Archives</Link></button>
        </center>
        </>
    )
};

export default Single;