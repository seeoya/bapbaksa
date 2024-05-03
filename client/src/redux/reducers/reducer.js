import {combineReducers} from 'redux';
import { userReducer } from '../reducers/user';
import { marketReducer} from '../reducers/market';


export const reducer = combineReducers({

    userReducer,
    marketReducer,
    

});