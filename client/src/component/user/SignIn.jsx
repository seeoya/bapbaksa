import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { setToken } from '../../storage/loginedToken';
import { setTitle } from '../../util/setTitle';
import Loading from '../include/Loading';


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

    const [isLoading, setIsLoading] = useState(true);

    const navigate = useNavigate();

    useEffect(() => {
        setTitle('로그인');
    }, [setUId, setUPw, setIsLoading]);

    const userInfoChangeHandler = (e) => {
        let input_name = e.target.name;
        let input_value = e.target.value;

        if (input_name === "u_id") {
            setUId(input_value);

        } else if (input_name === "u_pw") {
            setUPw(input_value);
        }
    }

    const activeEnter = (e) => {
        if (e.key === 'Enter') {
            signinBtnClickHandler();
        }
    }

    const signinBtnClickHandler = () => {
        let form = document.signin_form;

        if (uId === '') {
            alert('아이디를 입력해 주세요');
            form.u_id.focus();
        } else if (uPw === '') {
            alert('비밀번호를 입력해 주세요');
            form.u_pw.focus();
        } else {
            axios_signin();
        }
    }

    const axios_signin = async () => {
        let data = {
            "u_id": uId,
            "u_pw": uPw
        }

        try {
            const res = await axios.post(
                process.env.REACT_APP_SERVER_URL + `/api/user/signin_confirm`,
                data)

            setIsLoading(false);

            if (res.data.message === undefined && res.data.result.affectedRows > 0) {
                let refreshToken = res.data.refreshToken;
                let accessToken = res.data.accessToken;

                setToken('accessToken', accessToken);
                setToken('refreshToken', refreshToken);
                setToken('loginedUId', res.data.uId);
                setToken('loginedUNo', res.data.uNo);
                setToken('uProfile', res.data.uProfile);

                alert('로그인에 성공하였습니다.');
                navigate('/');
                window.location.reload(true);
            } else {
                alert(res.data.message);
                setUId(''); setUPw('');
            }
            setIsLoading(true);
        } catch (error) {
            alert('로그인에 실패하였습니다.');
        }
    }

    return (
        <>
            {isLoading ? null : <Loading />}

            <div className='content-wrap'>
                <h2 className='title'>로그인</h2>

                <div className='content'>
                    <div className='signin-wrap'>
                        <form name="signin_form" className='form'>
                            <div className='input-wrap'>
                                <input type="text" name="u_id" value={uId} onChange={(e) => userInfoChangeHandler(e)} onKeyDown={(e) => activeEnter(e)} placeholder="아이디를 입력해 주세요" />
                            </div>

                            <div className='input-wrap'>
                                <input type="password" name="u_pw" value={uPw} onChange={(e) => userInfoChangeHandler(e)} onKeyDown={(e) => activeEnter(e)} placeholder="비밀번호를 입력해 주세요" />
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
                                    <img src="/imgs/logo/login/web_neutral_sq_SU@1x.png" className='google-link' alt='' />
                                </Link>

                                <Link to={kakaoURL}>
                                    <img src="/imgs/logo/login/kakao_login_medium_narrow.png" className='kakao-link' alt='' />
                                </Link>

                                <Link to={naverURL}>
                                    <img src="/imgs/logo/login/btnG_완성형.png" className='naver-link' alt='' />
                                </Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default SignIn;