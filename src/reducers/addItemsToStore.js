const initialState = {}

export const addItemsToStore = (state = initialState, action) => {

    switch (action.type) {

        case 'ADD_ITEMS':
            return action.payload.map( item => item.token )

        default:
            return state;
    }
}
export default addItemsToStore;