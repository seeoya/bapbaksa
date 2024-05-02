export const getSignupAction = (formData) => {
        
    return {
        type: 'USER_SIGNUP',
        data: formData,
        };
    
}

export const getSigninAction = (formData) => {
        
    return {
        type: 'USER_SIGNIN',
        data: formData,
        };
    
}
    
    
