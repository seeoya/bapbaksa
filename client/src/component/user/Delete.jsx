import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';
import { getToken, removeToken } from '../../storage/loginedToken';
import Loading from '../include/Loading';

axios.defaults.withCredentials = true;
const Delete = () => {

    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        deleteForm();
    }, [setIsLoading])

    const deleteForm = async () => {
        if (window.confirm('회원탈퇴를 하시겠습니까?')) {
            alert('이용해주셔서 감사합니다.')
     
            axios_delete();
        }
    }

    const axios_delete = async () => {        

        let accessToken = getToken('accessToken');
        let loginedUId = getToken('loginedUId');
        let loginedUNo = getToken('loginedUNo');

        let data = {
            "u_id": loginedUId,
            "u_no": loginedUNo,
        }

        try{    
            const res = await axios.delete(
                process.env.REACT_APP_SERVER_URL + `/api/user/delete_confirm`,
                { headers:{Authorization: `Bearer ${accessToken}`},
                  data: data})
                
                  setIsLoading(false);
                console.log("++++++++", res.data.delete);
                if (res.data.delete === true) {

                    removeToken('accessToken');
                    removeToken('refreshToken');
                    removeToken('loginedUId');
                    removeToken('loginedUNo');

                    alert('회원탈퇴에 성공하였습니다.');
                    navigate('/');
                    window.location.reload('/');
                } else {
                    alert('회원탈퇴에 실패하였습니다.&&&');
                }
                setIsLoading(true);
            } catch (error) {
                alert('회원탈퇴에 실패하였습니다.');
            }
                
    }
    

    return (
        <>
         {isLoading ? null : <Loading />}
            <Link to="" />
        </>
    );
};

export default Delete;