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
                        <th className='u_no'>번호</th>
                        <th className='u_id'>아이디</th>
                        <th className='u_mail'>이메일</th>
                        <th className='u_phone'>전화번호</th>
                        <th className='u_status'>상태</th>
                        <th className='u_reg_date'>가입일</th>
                        <th className='u_more'>상세보기</th>
                    </tr>

                    {
                        userList ?
                            Object.keys(userList).map((el) => {
                                return <tr>
                                    <td className='u_no'>{userList[el].u_no}</td>
                                    <td className='u_id'>{userList[el].u_id}</td>
                                    <td className='u_mail'>{userList[el].u_mail}</td>
                                    <td className='u_phone'>{userList[el].u_phone}</td>
                                    <td className='u_status'>
                                        {
                                            userList[el].u_status == 0 ? "탈퇴" :
                                                userList[el].u_status == 1 ? "활동" :
                                                    userList[el].u_status == 2 ? "정지" : "관리자"
                                        }
                                    </td>
                                    <td className='u_reg_date'>{userList[el].u_reg_date.substr(0, 10)}</td>
                                    <td className='u_more'>
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