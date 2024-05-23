import axios from 'axios';
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { setToken } from '../../storage/loginedToken';


const Kakao = () => {
    const code = new URL(window.location.href).searchParams.get('code');

    const navigate = useNavigate();

    useEffect(() => {
        kakaoLogin();
    }, []);

    const kakaoLogin = async () => {
        let data = {
            "code": code,
        }

        await axios({
            url: process.env.REACT_APP_SERVER_URL + `/api/oauth/kakao/callback`,
            method: 'post',
            data: data,
        })
            .then(res => {
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
            })
            .finally(data => {
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

export default Kakao;