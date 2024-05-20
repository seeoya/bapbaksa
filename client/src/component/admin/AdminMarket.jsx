import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const AdminMarket = () => {

    const [orderList, setOrderList] = useState({});
    

    useEffect(() => {
        initOrders();
    }, []);

    const initOrders = async () => {
        await axios.get(process.env.REACT_APP_SERVER_URL + "/admin/get_order", {
            params: {
            }
        }).then((data) => {
            setOrderList(data.data);
        }).catch((err) => {
            return { type: "error" };
        });
    }


    return (
        <>
        
        <div className='title'>구매 내역</div>
            <div className='content'>

                <table>
                    <tr>                        
                        <th className='o_reg_date'>주문일</th>
                        <th className='o_id'>주문번호</th>                        
                        <th className='pm_no'>결제번호</th>
                        <th className='u_no'>회원번호</th>
                        <th className='o_s_no'>상태</th>                         
                        <th className='o_mod_date'>수정일</th>
                        <th className='o_more'>상세보기</th>
                    </tr>

                    
                    {
                        orderList ?
                            Object.keys(orderList).map((el) => {
                                return <tr>                                    
                                    <td className='o_reg_date'>{orderList[el].o_reg_date.substr(0, 10)}</td>
                                    <td className='o_id'>{orderList[el].o_id}</td>
                                    <td className='pm_no'>{orderList[el].pm_no}</td>
                                    <td className='u_no'>{orderList[el].u_no}</td>
                                    <td className='o_s_no'>
                                        {
                                            orderList[el].o_s_no === -1 ? "결제 대기중" : 
                                            orderList[el].o_s_no === 0 ? "배송 준비중" : 
                                            orderList[el].o_s_no === 1 ? "배송중" : 
                                            orderList[el].o_s_no === 2 ? "환불 요청" : 
                                            orderList[el].o_s_no === 3 ? "환불 완료" : 
                                            orderList[el].o_s_no === 4 ? "구매 취소" : 
                                            orderList[el].o_s_no === 5 ? "구매 확정" : 
                                            orderList[el].o_s_no ===6 ? "배송 완료" : ""
                                                
                                        }
                                    </td>                                                                       
                                    
                                    <td className='o_mod_date'>{orderList[el].o_mod_date.substr(0, 10)}</td>
                                    <td className='u_more'>
                                        <Link to={"/admin/market/" + orderList[el].o_id}>상세보기</Link>
                                    </td>
                                    
                                </tr>
                            })
                            : <tr><td>구매 내역이 없습니다.</td></tr>
                    }

                </table>
            </div>
        </>
    );
};

export default AdminMarket;