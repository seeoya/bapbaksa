import axios from 'axios';
import $ from 'jquery';
import {SERVER_URL} from '../../util/url';
import {USER_SIGNUP} from '../reducers/user';


export const getSignupAction = (signupData) => {

    const request = axios({
        url: `${SERVER_URL.TARGET_URL()}/user/signup_confirm`,
        method: 'post',
        data: signupData,
    })
    .then((res) => res.data)    
    .catch(error => {
        console.log('AXIOS SIGN_UP COMMUNICATION ERROR');
        
    })
    .finally(data => {
        console.log('AXIOS SIGN_UP COMMUNICATION FINALLY');

    })
    return {
        type: USER_SIGNUP,
        data: request,
        };
    
}
    
    
