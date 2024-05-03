import { combineReducers } from "redux";
import { userReducer } from "../reducers/user";
import { fridgeReducer } from "./fridge";

export const reducer = combineReducers ({
    userReducer,
    fridgeReducer,
});
