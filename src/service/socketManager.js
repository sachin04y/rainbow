import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addItemsAction, livePricesAction } from '../actions/index'


function usePrevious(value) {
	const ref = useRef();
	useEffect(() => {
		ref.current = value;
	});
	return ref.current;
}

export const SocketManager = (props) => {

	const items = useSelector( state => state.addItemsToStore );
	const previousItems = usePrevious( items );
	const [isConnected, setIsConnected] = useState(false);
	const ws = useRef(null);
	const dispatch = useDispatch();
	const { children } = props;


	useEffect( () => {

		const wsCurrent = new WebSocket("wss://prototype.sbulltech.com/api/ws");
		wsCurrent.onopen = (event) => {
			setIsConnected(true);
			ws.current = wsCurrent;
		
		};

		wsCurrent.onclose = () => console.log("ws closed");

		wsCurrent.onmessage = (event) => {
			let response = JSON.parse( event.data);
			if ( 'quote' === response.data_type ) {
				dispatch( livePricesAction(response) );
			}
		}

	}, [] )

	useEffect( () => {

		if( ! isConnected ) return;
		let msg = {}
		console.log(previousItems)
		msg = {
			"msg_command":'unsubscribe',
			"data_type":"quote",
			"tokens": previousItems
		};
		ws.current.send(JSON.stringify(msg));

		msg = {
			"msg_command":'subscribe',
			"data_type":"quote",
			"tokens": items
		};
		ws.current.send(JSON.stringify(msg));

		return () => {
			console.log('unmount');
		}

	}, [isConnected,items])

	return (
		<>
		{children}
		</>
	);

}