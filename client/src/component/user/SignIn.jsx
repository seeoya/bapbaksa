import React, { useEffect, useState } from 'react';
import {Link, useNavigate} from 'react-router-dom';
import axios from 'axios';
import { setToken } from '../../storage/loginedToken';
import $ from 'jquery';


axios.defaults.withCredentials = true;
const googleid = process.env.REACT_APP_GOOGLE_CLIENT_ID;
const kakaoid = process.env.REACT_APP_KAKAO_CLIENT_ID;
const naverid = process.env.REACT_APP_NAVER_CLIENT_ID;

const googleRedirect = `http%3A//localhost:3000/auth/google/callback`;
const kakaoRedirect = `http://localhost:3000/oauth/kakao/callback`;
const naverRedirect = `http://localhost:3000/oauth/naver/callback`;


//구글 로그인 요청 주소
const googleURL = `https://accounts.google.com/o/oauth2/v2/auth/oauthchooseaccount?client_id=${googleid}&state=state_parameter_passthrough_value&redirect_uri=${googleRedirect}&response_type=code&scope=https%3A//www.googleapis.com/auth/userinfo.email&include_granted_scopes=true`;

//카카오 로그인 요청 주소
const kakaoURL = `https://kauth.kakao.com/oauth/authorize?client_id=${kakaoid}&redirect_uri=${kakaoRedirect}&response_type=code`;

//네이버 로그인 요청 주소
const state = Math.floor(new Date().getTime() + Math.random() * 1000);

const naverURL = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${naverid}&state=${state}&redirect_uri=${naverRedirect}`;

const SignIn = () => {

    const [uId, setUId] = useState('');
    const [uPw, setUPw] = useState('');    
    const [message, setMessage] = useState('');

    const navigate = useNavigate(); 
    

    useEffect(() => {

    }, []);

    const userInfoChangeHandler = (e) => {
        console.log('userInfoChangeHandler()');
        console.log('google_id===>', googleid);
        console.log('google_url===>', googleURL);

        let input_name = e.target.name;
        let input_value = e.target.value;

        if (input_name === "u_id") {
            setUId(input_value);

        } else if (input_name === "u_pw") {
            setUPw(input_value);
        } 
    }

    const activeEnter = (e) => {
        console.log('activeEnter()');

        if(e.key === 'Enter') {
            signinBtnClickHandler();
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
                        <input type="text" name="u_id" value={uId} onChange={(e) => userInfoChangeHandler(e)} onKeyDown={(e) => activeEnter(e)} placeholder="아이디를 입력해 주세요"/>    
                
                    </div>
                    <div className='input-wrap'>
                        <input type="password" name="u_pw" value={uPw} onChange={(e) => userInfoChangeHandler(e)} onKeyDown={(e) => activeEnter(e)} placeholder="비밀번호를 입력해 주세요"/>    
                        
                    </div>
                    <div className='btn-wrap'>
                        <button type="button" onClick={signinBtnClickHandler} className="btn main full">로그인</button>
                    </div>

                    <div className='login-find'>
                   
                         <Link to="/user/findid" className='find-id'>아이디 찾기</Link>
                         <span>|</span>
                         <Link to="/user/findpw" className='find-pw'>비밀번호 찾기</Link>
                         
                    </div>

                    <div className='login-link'>
                   
                         <Link to={googleURL}>
                         <img src="/imgs/logo/login/web_neutral_sq_SU@1x.png" className='google-link' alt=''/>                                                  
                         </Link>

                         <Link to={kakaoURL}>
                         <img src="/imgs/logo/login/kakao_login_medium_narrow.png" className='kakao-link' alt=''/>                         
                         </Link>

                         <Link to={naverURL}>                         
                         <img src="/imgs/logo/login/btnG_완성형.png" className='naver-link' alt='' />
                         </Link>                         
                    </div>

                </form>                
            </div>
        </div>
    </div>
    );
};

export default SignIn;