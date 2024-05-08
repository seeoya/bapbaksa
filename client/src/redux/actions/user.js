
export const setLoginedUIdAction = (uId) => {

    return {
        type: 'setLoginedUId',
        data: uId,
        };
    
}
    
export const setAction = (formData) => {
        
    return {
        type: 'USER_MODIFY',
        data: formData,
        };
    
}
   
    
