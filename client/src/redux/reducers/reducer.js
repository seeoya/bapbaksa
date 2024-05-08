import {combineReducers} from 'redux';
import { userReducer } from './user';
import { fridgeReducer} from './fridge';


export const reducer = combineReducers({
  
    user: userReducer,
    fridgeReducer,
});
