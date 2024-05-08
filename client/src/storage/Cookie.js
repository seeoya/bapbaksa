import { Cookies } from 'react-cookie';

const cookies = new Cookies();

// accessToken Cookie에 저장
export const setAccessToken = (name, value) => {
    console.log('setAccessToken()');
   
    return cookies.set(name, value, {
        sameSite: "strict",       
        maxAge: 60 * 60,         
    });         
        
};


// refreshToken Cookie에 저장
export const setRefreshToken = (name, value) => {
    console.log('setRefreshToken()');
   
    return cookies.set(name, value, {
        sameSite: "strict",       
        expires: new Date(Date.now() + 3600 * 1000 * 24 * 30 * 6),         
    });         
        
};

// Cookie에 저장된 token 값을 갖고 옴
export const getCookieToken = (name) => {
    console.log('getCookieToken()');

    return cookies.get(name);
};

// Cookie 삭제(signout)
export const removeCookieToken = (name) => {
    console.log('removeCookieToken()');

    return cookies.remove(name);
};


