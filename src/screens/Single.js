import React, { useState, useEffect, useRef } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';

const Single = () => {

    const [ derivativeData, setDerivativeData ] = useState([]);
    const xhrRunner = useRef();
    const params = useParams();

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
                    { item.symbol } : <span className="price">678</span>&nbsp;&nbsp;
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