import { combineReducers } from "redux";
import { userReducer } from "../reducers/user";
import { fridge } from "./fridge";

export const reducer = combineReducers({
    userReducer,
    fridge,
});
