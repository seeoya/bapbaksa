import { combineReducers } from "redux";
import { marketReducer } from '../reducers/market';
import { userReducer } from "../reducers/user";
import { fridge } from "./fridge";
import { recipe } from "./recipe";

export const reducer = combineReducers({
    userReducer,
    marketReducer,
    fridge,
    recipe
});
