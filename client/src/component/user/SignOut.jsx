import React, { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';
import { removeToken } from '../../storage/loginedToken';


const SignOut = () => {
    const navigate = useNavigate();

    useEffect(() => {
        signout();
        navigate('/');
        window.location.reload(true);
    }, [])

    const signout = async () => {
        removeToken('accessToken');
        removeToken('loginedUId');
        removeToken('loginedUNo');
    }

    return (
        <>
            <Link to="/" />
        </>
    );
}

export default SignOut;