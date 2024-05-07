import axios from 'axios';
import { SERVER_URL } from '../../util/url';


axios.defaults.withCredentials = true;


export const marketReducer = (state = {}, action) => {

    switch (action.type) {

        case 'SELECT_PROD':

            return {
                ...state, selectData : action.data
            };

            case 'GET_TWELVE_PRODUCT':
                return {
                    ...state,
                    ProdData: Array.isArray(state.ProdData)
                    ? [...state.ProdData, ...action.data]
                    : [...action.data]
                };
        default:

            return state;
    }


}


