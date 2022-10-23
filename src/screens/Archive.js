import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';

const Archive = () => {

    const [uderlyingsData, setUnderlyingsData] = useState([]);
    const xhrRunner = useRef( false );

    useEffect(() => {
        console.log('in')

        if ( xhrRunner.current ) {
            return;
        }

        xhrRunner.current = true;

        const fetchData = async () => {
            try {
                const {
                    data: { payload : response }
                } = await axios.get('https://prototype.sbulltech.com/api/underlyings');

                console.log(response)

                setUnderlyingsData(response);

            } catch (e) {
                console.error(e.message);
            }
        }

        fetchData();

        console.log('done')

    }, [])

    return (
        <>
        {
            uderlyingsData.map( (item) => {
                return (
                <p key={item.token}>
                    { item.symbol }
                </p>
                )
            })
        }
        </>
    )
};

export default Archive;