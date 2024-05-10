import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const AdminUser = () => {

    const [userList, setUserList] = useState({});

    useEffect(() => {
        initUsers();
    }, []);

    const initUsers = async () => {
        await axios.get(process.env.REACT_APP_SERVER_URL + "/admin/get_user", {
            params: {
            }
        }).then((data) => {
            console.log(data.data);
            setUserList(data.data);
        }).catch((err) => {
            return { type: "error" };
        });
    }

    return (
        <>
            <div className='title'>회원 목록</div>

            <div className='content'>
                <table>
                    <tr>
                        <th>번호</th>
                        <th>아이디</th>
                        <th>이메일</th>
                        <th>전화번호</th>
                        <th>상태</th>
                        <th>가입일</th>
                        <th>수정</th>
                    </tr>

                    {
                        userList ?
                            Object.keys(userList).map((el) => {
                                return <tr>
                                    <td>{userList[el].u_no}</td>
                                    <td>{userList[el].u_id}</td>
                                    <td>{userList[el].u_mail}</td>
                                    <td>{userList[el].u_phone}</td>
                                    <td>{userList[el].u_status}</td>
                                    <td>{userList[el].u_reg_date}</td>
                                    <td>
                                        <Link to={"/admin/user/" + userList[el].u_no}>상세보기</Link>
                                    </td>
                                </tr>
                            })
                            : <tr><td>회원이 없습니다.</td></tr>
                    }

                </table>
            </div>

        </>
    );
};

export default AdminUser;