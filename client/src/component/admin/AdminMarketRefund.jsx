import React, { useEffect } from 'react';
import { setTitle } from '../../util/setTitle';

const AdminMarketRefund = () => {

    useEffect(() => {
        setTitle('물품 환불승인');
    });

    return (
        <>
        
        <div className='title'>환불 관리</div>
            <div className='content'>

                <table>
                    <tr>                        
                        <th className='o_reg_date'>주문일</th>
                        <th className='o_id'>주문번호</th>
                        <th className='o_no'>구매번호</th>
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
                                    <td className='o_no'>{orderList[el].o_no}</td>
                                    <td className='pm_no'>{orderList[el].pm_no}</td>
                                    <td className='u_no'>{orderList[el].u_no}</td>
                                    <td className='o_s_no'>
                                        {                                           
                                            orderList[el].o_s_no === 2 ? "환불 요청" : 
                                            orderList[el].o_s_no === 3 ? "환불 완료" : ""                                            
                                                
                                        }
                                    </td>                                                                       
                                    
                                    <td className='o_mod_date'>{orderList[el].o_mod_date.substr(0, 10)}</td>
                                    <td className='u_more'>
                                        <Link to={"/admin/market/refund/" + orderList[el].o_no}>상세보기</Link>
                                    </td>
                                    
                                </tr>
                            })
                            : <tr><td>환불 내역이 없습니다.</td></tr>
                    }

                </table>
            </div>
        </>
    );
};

export default AdminMarketRefund;