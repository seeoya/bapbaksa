import {USER_SIGNUP} from '../actions/user';

export const userReducer = (state={}, action) => {

   switch (action.type){

       case 'USER_SIGNUP':
        return {...state};
        break;

      
       default:
           return state;    
   }
 
}
