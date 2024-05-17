import React, { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { removeToken, getToken } from '../../storage/loginedToken';



const Delete = () => {    
    
    const navigate = useNavigate();

    useEffect(() => {
        
        deleteForm();      

    }, [])
    

    const deleteForm = async () => {
        console.log('deleteForm()');

        if(window.confirm('회원탈퇴를 하시겠습니까?')) {
            alert('이용해주셔서 감사합니다.')
        
            let accessToken = getToken('accessToken');
            let loginedUId = getToken('loginedUId');
            let loginedUNo = getToken('loginedUNo');
            
            console.log('loginedUIdString', loginedUId);
        
                let data = {
                    "u_id": loginedUId,          
                    "u_no": loginedUNo,          
                }                 

                await axios({
                    url: process.env.REACT_APP_SERVER_URL + `/api/user/delete_confirm`,                
                    method: 'delete',      
                    data: data,
                    headers:{Authorization : `Bearer ${accessToken}`,
                    },
                })
                .then(res => {        
                    console.log('res: ', res);
                    console.log('res.data: ', res.data);                                    
                    console.log(res.data.result.affectedRows);      
                                 

                    if (res.data !== null && res.data.result.affectedRows > 0) {
                        
                  
                        console.log('AXIOS USER_DELETE COMMUNICATION SUCCESS ==> ', res.data);                    
                            
                        alert('회원탈퇴에 성공하였습니다.');                        

                        removeToken('accessToken');
                        removeToken('refreshToken');
                        removeToken('loginedUId');
                        removeToken('loginedUNo');    
                      
                        navigate('/');
                        window.location.reload('/');
                        
            
                   } 
                
                })
                .catch(error => {
                    console.log('AXIOS USER_DELETE COMMUNICATION ERROR', error);
                    alert('회원탈퇴에 실패하였습니다.');                

                })
                .finally(data => {
                    console.log('AXIOS USER_DELETE COMMUNICATION FINALLY', data);
            
                });

                
                                
                    
            
            }                           
                        
        }
      
    
    return (
        <>
            <Link to="" />
        </>
    );
};

export default Delete;