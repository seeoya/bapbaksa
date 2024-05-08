import axios from 'axios';
import {useNavigate} from 'react-router-dom';


axios.defaults.withCredentials = true;

const init_state = {loginedUId : ''};

export const userReducer = (state=init_state, action) => {

   switch (action.type){

        case 'setLoginedUId':
          let data = action.data;  
          
          return {...state, loginedUId : data};        
      
        case 'USER_MODIFY':
             

        return {...state};        
        break;

        case 'USER_MODIFY':
             

        return {...state};
        break;

       default:
           return state;    
   }
 
}
