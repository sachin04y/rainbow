const initialState = {}

export const subscribeToItems = (state = initialState, action) => {

    switch (action.type) {
        case 'SUBSCRIBE':
            return Object.fromEntries( action.payload.map( ( { token } ) => ( [token, '' ] ) ) );

        case 'LIVE_PRICE':
            let item = action.payload.payload;
            let newState = state;
            newState[item.token] = item.price;
            return { ...newState };

        default:
            return state;
    }
}
export default subscribeToItems;