import axios from "axios";

axios.defaults.withCredentials = true;

export const market = (state = {}, action) => {
    switch (action.type) {
        case "SELECT_PROD":
            return {
                ...state,
                selectData: action.data,
            };

        case "market_search_change":
            return { ...state, search: action.data };

        default:
            return state;
    }
};
