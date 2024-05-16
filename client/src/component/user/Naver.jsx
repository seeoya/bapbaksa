import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { setToken } from '../../storage/loginedToken';


const Naver = () => {
    console.log('Naver()');

    const code = new URL(window.location.href).searchParams.get('code');                
    console.log('code====>', code);
    
    const navigate = useNavigate();
  
    useEffect(() => {
      console.log('useEffect()');      
    
      naverLogin();

    }, []);

    const naverLogin = async () => {

      let data = {
        "code": code,        
      }   

      console.log('data====>', data);

    await axios({
        url: process.env.REACT_APP_SERVER_URL + `/api/oauth/naver/callback`,                
        method: 'post',      
        data: data,
        
    })
    .then(res => {        
        console.log('AXIOS KAKAO SIGN_IN COMMUNICATION SUCCESS ==> ', res.data);           

        console.log('res: ', res);
        console.log('res.data: ', res.data);      
        console.log('message: ', res.data.message);          
        console.log(res.data.accessToken);
        console.log(res.data.refreshToken);
        console.log(res.data.uId);
        console.log('res.data.result.affectedRows', res.data.result.affectedRows);
                                               
        if (res.data !== null && Number(parseInt(res.data.result.affectedRows)) > 0) {                                   

                let refreshToken = res.data.refreshToken;                                               
                let accessToken = res.data.accessToken;

                setToken('accessToken', accessToken);                     
                setToken('refreshToken', refreshToken);                     
                setToken('loginedUId', res.data.uId);                     
                setToken('loginedUNo', res.data.uNo);                            
                                     
                alert('로그인에 성공하였습니다.');                        
                navigate('/');                        
                window.location.reload(true);
        }                    
    
    })
    .catch(error => {
        console.log('AXIOS KAKAO SIGN_IN COMMUNICATION ERROR');               
        
    })
    .finally(data => {
        console.log('AXIOS KAKAO SIGN_IN COMMUNICATION FINALLY');

    });                

    }
  
  
    
    return (
      <>
         <div className='content-wrap'>

          <h3 className='title'>로그인이 진행 중 입니다</h3>
           
            <div className='content'>
              <div className='signin-wrap'>                                         
                <h4>페이지를 새로고침하지 마세요</h4>
              </div>
            </div>
         </div>
      </>
  );
}


export default Naver;