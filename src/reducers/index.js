import { combineReducers } from 'redux';
import { livePriceOfItems } from './livePriceOfItems';
import { addItemsToStore } from './addItemsToStore';

const rootReducer = combineReducers({
    addItemsToStore,
    livePriceOfItems,
});

export default rootReducer;