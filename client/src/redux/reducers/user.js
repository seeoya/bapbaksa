import axios from 'axios';
import {useNavigate} from 'react-router-dom';




axios.defaults.withCredentials = true;

export const userReducer = (state={}, action) => {

   switch (action.type){

       case 'USER_SIGNUP':
            
            let formData = action.data;

            const result = axios({
                url: process.env.REACT_APP_SERVER_URL + `/api/user/signup_confirm`,                
                method: 'post',      
                data: formData,
            })
            .then(res => {        
                console.log('res: ', res);
                console.log('res.data: ', res.data);
                console.log('res.affect: ', res.data.affectedRows);

                if (res.data !== null && res.data.affectedRows > 0) {
                    console.log('AXIOS SIGN_UP COMMUNICATION SUCCESS ==> ', res.data);
                    alert('회원가입에 성공하였습니다.');
                    useNavigate('/');
        
                } else {
                    alert('회원가입에 실패하였습니다.');                
                }
            })
            .catch(error => {
                console.log('AXIOS SIGN_UP COMMUNICATION ERROR');
                
            })
            .finally(data => {
                console.log('AXIOS SIGN_UP COMMUNICATION FINALLY');
        
            });
            console.log('result: ', result);
            state['user']['userId']=result.userId;
            console.log('state.user.userId: ', state['user']['userId']);

        return {state};
        break;

        case 'USER_SIGNIN':

           
            


        return {state};
        break;
      
        case 'USER_MODIFY':
             

        return {...state};
        break;

       default:
           return state;    
   }
 
}
