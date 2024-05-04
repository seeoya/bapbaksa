<<<<<<< HEAD
import {combineReducers} from 'redux';
import { userReducer } from './user';


export const reducer = combineReducers({
  
=======
import { combineReducers } from "redux";
import { userReducer } from "../reducers/user";
import { fridgeReducer } from "./fridge";

export const reducer = combineReducers ({
>>>>>>> c9794c5e6712dd1f82fcdd7a88657b96c1467e1c
    userReducer,
    fridgeReducer,
});
