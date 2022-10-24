import { combineReducers } from 'redux';
import { subscribeToItems } from './subscribeToItems';


const rootReducer = combineReducers({
    subscribeToItems,
});

export default rootReducer;