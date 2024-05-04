export const getSignupAction = (formData) => {
        
    return {
        type: 'USER_SIGNUP',
        data: formData,
        };
    
}

export const getSigninAction = async(formData) => {

    return {
        type: 'USER_SIGNIN',
        data: formData,
        };
    
}
    
export const getModifyAction = (formData) => {
        
    return {
        type: 'USER_MODIFY',
        data: formData,
        };
    
}
   
    
