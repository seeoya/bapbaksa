import { getToken, setToken } from "../storage/loginedToken";
import axios from "axios";

export const getRefreshToken = () => {
    console.log('getRefreshToken()');
    let loginedUId = getToken('loginedUId');
    let refreshToken = getToken('refreshToken');

    let data = {
        u_id : loginedUId,
    }

    axios({
        url: process.env.REACT_APP_SERVER_URL + `/api/user/refresh_token`,
        method: 'post',      
        data: data,
        headers:{Authorization : `Bearer ${refreshToken}`,
        },
    })
    .then(res => {        
        console.log('res: ', res);
        console.log('res.data: ', res.data);                
        
        if (res.data !== null && Number(parseInt(res.data.result.affectedRows)) > 0) {
            console.log('AXIOS SIGN_IN COMMUNICATION SUCCESS ==> ', res.data);                          
            
            let refreshToken = res.data.refreshToken;                                               
            let accessToken = res.data.accessToken;
                
            setToken('accessToken', accessToken);                     
            setToken('refreshToken', refreshToken); 
            window.history.back();

        } else {
            console.log(res.data.message);                 
            alert('처리 중 오류가 발생했습니다. 다시 로그인 해주세요.');
        }

    })
    .catch(error => {
        console.log('AXIOS REFRESH_TOKEN COMMUNICATION ERROR');
        
    })
    .finally(data => {
        console.log('AXIOS REFRESH_TOKEN COMMUNICATION FINALLY');

    });
}
