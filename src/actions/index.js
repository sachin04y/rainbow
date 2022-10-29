
export const addItemsAction = payload => {
    return {
        type: 'ADD_ITEMS',
        payload : payload,
    }
}

export const livePricesAction = payload => {
    return {
        type: 'LIVE_PRICE',
        payload : payload,
    }
}
