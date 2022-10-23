import React, { useState, useEffect, useRef, useContext } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { ProductContext } from '../service/socketManager';

const Archive = () => {

    const [uderlyingsData, setUnderlyingsData] = useState([]);
    const { priceData, setProductPrices } = useContext( ProductContext );
   
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
                setProductPrices( response );

            } catch (e) {
                console.error(e.message);
            }
        }

        fetchData();

        // const exampleSocket = new WebSocket("wss://prototype.sbulltech.com/api/ws");

        // exampleSocket.onopen = (event) => {
        //     const msg = {
        //         "msg_command":"subscribe",
        //         "data_type":"quote",
        //         "tokens":[2974320]
        //     };
            
        //     exampleSocket.send(JSON.stringify(msg));
        // };

        // exampleSocket.onmessage = (event) => {
        //     console.log(event.data);
        // }

    }, [] )

    return (
        <>
        <center>
        {
            uderlyingsData.map( (item) => {
                return (
                <p key={item.token} __token={item.token}>
                    { item.symbol } : <span className="price">678</span>&nbsp;&nbsp;
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