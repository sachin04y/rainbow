import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { subscribeAction, livePricesAction } from '../actions/index'

export const SocketManager = (props) => {

	const livePrices = useSelector( state => state.subscribeToItems );

	const [connStatus, setConnStatus] = useState( false );
	const { children } = props;
	const dispatch = useDispatch();
	let socket = useRef(  new WebSocket("wss://prototype.sbulltech.com/api/ws") );

	if ( connStatus ) {
	
		const msg = {
			"msg_command":"subscribe",
			"data_type":"quote",
			"tokens": ( Object.keys( livePrices ) ).map( Number )
		};
		
		socket.current.send(JSON.stringify(msg));
		
		socket.current.onmessage = (event) => {

			let response = JSON.parse( event.data);
			if ( 'quote' === response.data_type ) {
				dispatch( {
					type: 'LIVE_PRICE',
					payload : response,
				} );
			}
		}
	}


	useEffect( () => {

		socket.current.onopen = (event) => {
			setConnStatus(true)
		};

		let __cleanSocket = socket.current;

		// return () => {
		// 	__cleanSocket !== null && __cleanSocket.close()
		// };

	}, [] )

	return (
		<>
		{children}
		</>
	);

}