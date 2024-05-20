import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';

const AdminMarketRefundView = () => {
    const { no } = useParams();                  
    const [oId, setOId] = useState('');       
    const [pmNo, setPmNo] = useState(0);    
    const [pmPrice, setPmPrice] = useState(0);
    const [pmMethod, setPmMethod] = useState('');
    const [pRegDate, setPRegDate] = useState('');
    const [pModDate, setPModDate] = useState('');   
    const [uNo, setUNo] = useState(0);    
    const [oSNo, setOSNo] = useState(0);    
    const [oCount, setOCount] = useState(0);    
    const [oPrice, setOPrice] = useState(0);    
    const [oFinalPrice, setOFinalPrice] = useState(0);    
    const [oRegDate, setORegDate] = useState('');
    const [oModDate, setOModDate] = useState('');   
    const [PROD_NAME, setPROD_NAME] = useState('');
    const [PROD_SPCS_NAME, setPROD_SPCS_NAME] = useState('');
    const [dataFlag, setDataFlag] = useState(false);
    const [order, setOrder] = useState({});
 

    useEffect(() => {
        initOrder();
    }, []);

    useEffect(() => {
        console.log(no);
        initOrder();
    }, [no]);

    const initOrder = async () => {
        await axios.get(process.env.REACT_APP_SERVER_URL + "/admin/get_refund_order", {
            params: {
                o_no: no,               
            }
        }).then((data) => {
            console.log('🎈', data.data);        

            let order = data.data[no];
            console.log(order);
            if(order){ 
                setDataFlag(true);
                setOrder(order);
                setORegDate(order.o_reg_date);
                setOId(order.o_id);            
                setUNo(order.u_no);               
                setOSNo(order.o_s_no);            
                setOCount(order.o_count);
                setOPrice(order.o_price);
                setOFinalPrice(order.o_final_price);            
                setOModDate(order.o_mod_date);                                
                setPmNo(order.pm_no);            
                setPmPrice(order.pm_price);            
                setPmMethod(order.pm_method);            
                setPRegDate(order.p_reg_date);            
                setPModDate(order.p_mod_date);            
                setPROD_NAME(order.PROD_NAME);
                setPROD_SPCS_NAME(order.PROD_SPCS_NAME);

            }

        }).catch((err) => {
            return { type: "error" };
        });
    } 
   

    const refundApproveClick = async (e) => {
        console.log('refundApproveClick()');       
    
        await axios.put(process.env.REACT_APP_SERVER_URL + "/admin/put_refund", {
                params: {
                    o_no: e.o_no,
                    o_id: e.o_id,
                    u_no: e.u_no,
                    o_s_no: 3,                    
                    pm_method: e.pm_method,
                    o_final_price: e.o_final_price,                
                }
            }).then((data) => {
                console.log('🎈', data.data);        
                alert('환불처리가 완료되었습니다.');
    
            }).catch((err) => {
                alert('환불처리에 실패하였습니다.');
                return { type: "error" };
            });
    } 
       
    
    
    
    const refundRejectClick = async (e) => {
        console.log('refundRejectClick()');
        
        await axios.put(process.env.REACT_APP_SERVER_URL + "/admin/put_reject", {
            params: {
                o_no: e.o_no,                                
                o_s_no: 6,                                    
            }
        }).then((data) => {
            console.log('🎈', data.data);        
            alert('환불 승인불가 처리가 완료되었습니다.');

        }).catch((err) => {
            alert('환불 승인불가 처리에 실패하였습니다.');
            return { type: "error" };
        });

    }



    return (
        <>
        <div className='title order-info'>환불 상세 내역</div>
                
            <div>
                <table>
                    <tr>
                        <td className='refund-list-link'>
                            <Link to={"/admin/market"}>환불리스트</Link>
                        </td>
                    </tr>
                    {dataFlag ? 
                    <>
                    <tr>
                        <td className='o_id'>주문번호</td>
                        <td className='o_s_no'>상태</td>                         
                    </tr>
                    <tr>    
                        <td className='o_id'>{oId}</td>                           
                        <td className='o_s_no'>
                        {
                            oSNo === -1 ? "결제 대기중" : 
                            oSNo === 0 ? "배송 준비중" : 
                            oSNo === 1 ? "배송중" : 
                            oSNo === 2 ? "환불 요청" : 
                            oSNo === 3 ? "환불 완료" : 
                            oSNo === 4 ? "구매 취소" : 
                            oSNo === 5 ? "구매 확정" : 
                            oSNo === 6 ? "배송 완료" : ""
                                
                        }
                        </td>
                    </tr>

                    <tr>                        
                        <td className='o_reg_date'>주문일</td>
                        <td className='o_mod_date'>주문 수정일</td>                        
                    </tr>
                    <tr>
                        <td className='o_reg_date'>{oRegDate.substring(0, 10)}</td>                        
                        <td className='o_mod_date'>{oModDate.substring(0, 10)}</td>
                    </tr>

                    <tr>
                        <td className='pm_no'>결제번호</td>
                        <td className='pm_method'>결제방법</td>
                        <td className='pm_price'>결제금액</td>
                    </tr>
                    <tr>    
                        <td className='pm_no'>{pmNo}</td>                       
                        <td className='pm_method'>{pmMethod}</td>                        
                        <td className='pm_price'>{pmPrice.toLocaleString('ko-KR')}</td>                      
                    </tr>

                    <tr>                        
                        <td className='p_reg_date'>결제일</td>
                        <td className='p_reg_date'>{pRegDate.substring(0, 10)}</td>
                        <td className='p_mod_date'>결제 수정일</td>                        
                        <td className='p_mod_date'>{pModDate.substring(0, 10)}</td>
                    </tr>
                    <tr>
                        <td className='no'>회원번호</td>
                        <td className='no'>{uNo}</td>
                    </tr>
                    <tr>
                        <td className='no'>구매번호</td>
                        <td className='no'>{no}</td>
                    </tr>
                    <tr>
                        <td className='name'>상품명</td>
                        <td className='name'>{PROD_NAME + ' ' + PROD_SPCS_NAME}</td>
                    </tr>
                    <tr>
                        <td className='no'>구매수량</td>
                        <td className='no'>{oCount}</td>
                    </tr>
                    <tr>
                        <td className='price'>단가</td>
                        <td className='price'>{oPrice.toLocaleString('ko-KR')}</td>
                    </tr>
                    <tr>
                        <td className='price'>합계</td>
                        <td className='price'>{oFinalPrice.toLocaleString('ko-KR')}</td>
                    </tr>
                    <tr>                                                           
                        <td className='refund'><button type='button' className='btn sub' onClick={(e) => refundApproveClick(order)}>승인</button></td>
                        <td className='reject'><button type='button' className='btn sub' onClick={(e) => refundRejectClick(no)}>승인불가</button></td>
                    </tr>
                    </>
                    :
                    <tr><td>구매 상세 내역이 없습니다.</td></tr>
            }
                </table>

            </div>        
    </>
    );
};

export default AdminMarketRefundView;