import React, { useState } from 'react';
import {Link, useNavigate} from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {getSigninAction} from '../../redux/actions/user';

const SignIn = () => {

    const [uId, setUId] = useState('');
    const [uPw, setUPw] = useState('');

    const dispatch = useDispatch();
    const navigate = useNavigate();

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

     
    const signinBtnClickHandler =() => {
        console.log('signinBtnClickHandler()');

        let form = document.signin_form;

        if (uId === '') {
            alert('아이디를 입력해 주세요');
            form.u_id.focus();

        } else if (uPw === '') {
            alert('비밀번호를 입력해 주세요');
            form.u_pw.focus();
        
        } else {            

            let formData = new FormData();
            formData.append("u_id", uId);
            formData.append("u_pw", uPw);            
        
            dispatch(getSigninAction(formData));
        
            setUId(''); setUPw('');
                    
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
                         <img src="https://developers.kakao.com/assets/img/about/logos/kakaolink/kakaolink_btn_medium.png" className='kakao-link'/>                         
                         </Link>
                    </div>
                </form>                
            </div>
        </div>
    </div>
    );
};

export default SignIn;