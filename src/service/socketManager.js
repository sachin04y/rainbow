import React, { useState, useEffect } from "react";

export const ProductContext = React.createContext(); 

// export const useWebsocket = () => React.useContext( ProductContext );

export const SocketManager = (props) => {

	const [ priceData, applyPriceData ] = useState([]);
	const [ connStatus, setConnStatus] = useState(false);

	const { children } = props;

	const setProductPrices = ( data ) => {

		applyPriceData( Object.fromEntries( data.map( ( { token } ) => ([token, '' ] ) ) ) );

	}

	useEffect( () => {

		// if ( ! priceData.length ) {
		// 	return;
		// }

		console.log( priceData )

		const exampleSocket = new WebSocket("wss://prototype.sbulltech.com/api/ws");

		exampleSocket.onopen = (event) => {

			setConnStatus(true);

			const msg = {
				"msg_command":"subscribe",
				"data_type":"quote",
				"tokens": [Object.keys( priceData )]
			};
			
			exampleSocket.send(JSON.stringify(msg));
		};

		exampleSocket.onmessage = (event) => {
			// setProductData ( event.data);
			console.log(event.data);
		}
	}, [priceData, applyPriceData] );

	return (
		<ProductContext.Provider value={ {priceData, setProductPrices }}>
			{children}
		</ProductContext.Provider>
	)

}