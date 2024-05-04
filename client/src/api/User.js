import axios from 'axios';
import { useNavigate } from 'react-router-dom';


export const signinUser = async (formData) => { 
    
    const response = await axios({
        url: process.env.REACT_APP_SERVER_URL + `/api/user/signin_confirm`,                
        method: 'post',      
        data: formData,
    })
    .then(res => {        
        console.log('res.token: ', res.token);
        
        if (res.token !== null) {
            console.log('AXIOS SIGN_IN COMMUNICATION SUCCESS ==> ', res.token);            
            alert('로그인에 성공하였습니다.');            
            useNavigate('/');            

        } else {
            alert('로그인에 실패하였습니다.');                
        }
    })
    .catch(error => {
        console.log('AXIOS SIGN_IN COMMUNICATION ERROR');
        
    })
    .finally(data => {
        console.log('AXIOS SIGN_IN COMMUNICATION FINALLY');

    });

    return response;

};

// export const create_token = async(refreshToken) => {

//     const response = await axios({
//         url: process.env.REACT_APP_SERVER_URL + `/api/user/sign_token`,                
//         method: 'get',      
//         data: refreshToken
//     })
// }

// export const requestToken = async (refreshToken) => { 
    
//     const response = await axios({
//         url: process.env.REACT_APP_SERVER_URL + `/api/user/signin_confirm`,                
//         method: 'post',      
//         data: refreshToken,
//     })
//     .then(res => {        
//         console.log('res.data: ', res.data);
        
//         if (res.data !== null) {
//             console.log('AXIOS SIGN_IN COMMUNICATION SUCCESS ==> ', res.data);            
//             alert('로그아웃에 성공하였습니다.');            
//             useNavigate('/');            

//         } else {
//             alert('로그아웃에 실패하였습니다.');                
//         }
//     })
//     .catch(error => {
//         console.log('AXIOS SIGN_IN COMMUNICATION ERROR');
        
//     })
//     .finally(data => {
//         console.log('AXIOS SIGN_IN COMMUNICATION FINALLY');

//     });

//     return response;
// };

// export const signoutUser = async (refreshToken, accessToken) => { 
    
//     const response = await axios({
//         url: process.env.REACT_APP_SERVER_URL + `/api/user/signin_confirm`,                
//         method: 'post',      
//         refreshToken: refreshToken,
//         accessToken: accessToken
//     })
//     .then(res => {        
//         console.log('res.data: ', res.data);
        
//         if (res.data !== null) {
//             console.log('AXIOS SIGN_OUT COMMUNICATION SUCCESS ==> ', res.data);            
//             alert('로그아웃에 성공하였습니다.');            
//             useNavigate('/');            

//         } else {
//             alert('로그아웃에 실패하였습니다.');                
//         }
//     })
//     .catch(error => {
//         console.log('AXIOS SIGN_OUT COMMUNICATION ERROR');
        
//     })
//     .finally(data => {
//         console.log('AXIOS SIGN_OUT COMMUNICATION FINALLY');

//     });

//     return response;
// };