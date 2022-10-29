const initialState = {}

export const livePriceOfItems = (state = initialState, action) => {
    
    switch (action.type) {

        case 'LIVE_PRICE':

            let item = action.payload.payload;
            // let newState = state;
            
            // newState[ item.token ] = item;
            return {...state, [item.token ]: {token: item.token, price : item.price } };

        default:
            return state;
    }
}
export default livePriceOfItems;