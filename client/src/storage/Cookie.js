import { Cookies } from 'react-cookie';


const cookies = new Cookies();

// refreshToken Cookie에 저장
export const setRefreshToken = (refreshToken) => {
    const today = new Date();
    const expireDate = today.setDate(today.getDate() + 30);

    return cookies.set('refresh_token', refreshToken, { 
        sameSite: 'strict', 
        path: "/", 
        expires: new Date(expireDate)
    });
};

// Cookie에 저장된 Refresh Token 값을 갖고 옴
export const getCookieToken = () => {
    return cookies.get('refresh_token');
};

// Cookie 삭제(signout)
export const removeCookieToken = () => {
    return cookies.remove('refresh_token', { 
        sameSite: 'strict',
        path: "/"
     });
};