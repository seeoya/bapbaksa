import React, { useEffect, useState } from 'react';
import {Link, useNavigate} from 'react-router-dom';
import axios from 'axios';
import { setToken } from '../../storage/loginedToken';

axios.defaults.withCredentials = true;

const SignIn = () => {

    const [uId, setUId] = useState('');
    const [uPw, setUPw] = useState('');    
    const [message, setMessage] = useState('');

    const navigate = useNavigate(); 

    useEffect(() => {

    }, []);

    const userInfoChangeHandler = (e) => {
        console.log('userInfoChangeHandler()');

        let input_name = e.target.name;
        let input_value = e.target.value;

        if (input_name === "u_id") {
            setUId(input_value);

        } else if (input_name === "u_pw") {
            setUPw(input_value);
        }
    }

     
    const signinBtnClickHandler = async () => {
        console.log('signinBtnClickHandler()');

        let form = document.signin_form;

        if (uId === '') {
            alert('아이디를 입력해 주세요');
            form.u_id.focus();

        } else if (uPw === '') {
            alert('비밀번호를 입력해 주세요');
            form.u_pw.focus();
        
        } else {            
                
                let data = {
                    "u_id": uId,
                    "u_pw": uPw
                }                 

                await axios({
                    url: process.env.REACT_APP_SERVER_URL + `/api/user/signin_confirm`,                
                    method: 'post',      
                    data: data,
                })
                .then(res => {        
                    console.log('AXIOS SIGN_IN COMMUNICATION SUCCESS ==> ', res.data);   
                    let message = res.data.message; 
                    setMessage(message);

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
                    console.log('AXIOS SIGN_IN COMMUNICATION ERROR');
                    
                    if(message.includes('아이디')){
                        alert('아이디가 일치하지 않습니다.');
                    } else {
                        alert('비밀번호가 일치하지 않습니다.'); 
                    }
                    
                    
                })
                .finally(data => {
                    console.log('AXIOS SIGN_IN COMMUNICATION FINALLY');
            
                });                
                   
                setUId(''); setUPw('');
                window.location.reload(true); 
                               
            }     
               
    }

          


    return (
        <div className='content-wrap'>

        <h2 className='title'>로그인</h2>

        <div className='content'>
            <div className='signin-wrap'>            
                <form name="signin_form" className='form'>
                    <div className='input-wrap'>                    
                        <input type="text" name="u_id" value={uId} onChange={(e) => userInfoChangeHandler(e)} placeholder="아이디를 입력해 주세요"/>    
                
                    </div>
                    <div className='input-wrap'>
                        <input type="password" name="u_pw" value={uPw} onChange={(e) => userInfoChangeHandler(e)} placeholder="비밀번호를 입력해 주세요"/>    
                        
                    </div>
                    <div className='btn-wrap'>
                        <button type="button" onClick={signinBtnClickHandler} className="btn main full">로그인</button>
                    </div>

                    <div className='login-link'>
                   
                         <Link to={'/auth/google'}>
                         <span className="google-link">GOOGLE</span>
                         </Link>

                         <Link to={'/auth/naver'}>
                         <span className="naver-link">NAVER</span>
                         </Link>

                         <Link to={'/auth/kakao'}>
                         <img src="https://developers.kakao.com/assets/img/about/logos/kakaolink/kakaolink_btn_medium.png" className='kakao-link' alt=''/>                         
                         </Link>
                    </div>
                </form>                
            </div>
        </div>
    </div>
    );
};

export default SignIn;