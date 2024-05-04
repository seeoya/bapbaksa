import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { getCookieToken, removeCookieToken } from '../../storage/Cookie';
import { DELETE_TOKEN } from '../../redux/actions/authToken';
import { signoutUser } from '../../api/User';


function SignOut(){
    // store에 저장된 Access Token 정보를 받아 온다
    const { accessToken } = useSelector(state => state.accessToken);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    // Cookie에 저장된 Refresh Token 정보를 받아 온다
    const refreshToken = getCookieToken();

    async function signout() {
        // 백으로부터 받은 응답
        const data = await signoutUser({ refresh_token: refreshToken }, accessToken);

        if ((data.status/100)===2) {
            // store에 저장된 Access Token 정보를 삭제
            dispatch(DELETE_TOKEN());
            // Cookie에 저장된 Refresh Token 정보를 삭제
            removeCookieToken();
            return navigate('/');
        } else {
            window.location.reload();
        }
    }
    
    // 해당 컴포넌트가 요청된 후 한 번만 실행되면 되기 때문에 useEffect 훅을 사용
    useEffect( () => {
        signout();
    }, [])

    return (
        <>
            <Link to="/" />
        </>
    );
}

export default SignOut;