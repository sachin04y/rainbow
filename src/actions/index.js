
export const subscribeAction = payload => {
    return {
        type: 'SUBSCRIBE',
        payload : payload,
    }
}

export const livePricesAction = payload => {
    return {
        type: 'LIVE_PRICE',
        payload : payload,
    }
}
