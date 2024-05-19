import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';

const AdminMarketRefundView = () => {
    const { id } = useParams();      
    const [orderList, setOrderList] = useState({});        
    const [pNameList, setPNameList] = useState({});        
    const [oId, setOId] = useState('');
    const [pNo, setPNo] = useState(0);    
    const [pmNo, setPmNo] = useState(0);    
    const [pmPrice, setPmPrice] = useState(0);
    const [pmMethod, setPmMethod] = useState('');
    const [pRegDate, setPRegDate] = useState('');
    const [pModDate, setPModDate] = useState('');   
    const [uNo, setUNo] = useState(0);    
    const [oSNo, setOSNo] = useState(0);    
    const [oRegDate, setORegDate] = useState('');
    const [oModDate, setOModDate] = useState('');   
    const [pZipcode, setPZipCode] = useState('');
    const [pFirstAddr, setPFirstAddr] = useState('');
    const [pSecondAddr, setPSeconAddr] = useState('');    
 

    useEffect(() => {
        initOrder();
    }, []);

    useEffect(() => {
        console.log(id);
        initOrder();
    }, [id]);

    const initOrder = async () => {
        await axios.get(process.env.REACT_APP_SERVER_URL + "/admin/get_refund_order", {
            params: {
                o_id: id,
            }
        }).then((data) => {
            console.log('🎈', data.data);        

            let order = data.data[id][0];
            console.log(order);

            setOrderList(data.data[id]);            
            setORegDate(order.o_reg_date);
            setOId(order.o_id);            
            setUNo(order.u_no);
            setPNo(order.p_no);
            setOSNo(order.o_s_no);            
            setOModDate(order.o_mod_date);
            setPZipCode(order.p_zip_code);
            setPFirstAddr(order.p_first_address);
            setPSeconAddr(order.p_second_address);
            setPmNo(order.pm_no);            
            setPmPrice(order.pm_price);            
            setPmMethod(order.pm_method);            
            setPRegDate(order.p_reg_date);            
            setPModDate(order.p_mod_date);            

        }).catch((err) => {
            return { type: "error" };
        });
    } 
   

    const refundApproveClick = (oNo) => {
        console.log('refundApproveClick()');
    
        const refundApprove = async () => {
            await axios.put(process.env.REACT_APP_SERVER_URL + "/admin/put_refund", {
                params: {
                    o_no: oNo,
                    o_s_no: 3,
                }
            }).then((data) => {
                console.log('🎈', data.data);        
                alert('환불처리가 완료되었습니다.');
    
            }).catch((err) => {
                alert('환불처리에 실패하였습니다.');
                return { type: "error" };
            });
        } 
       
    
    }
    
    const refundRejectClick = (e) => {
        console.log('refundRejectClick()');
        

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
                    
                    <tr>
                        <td className='o_id'>주문번호</td>
                        <td className='o_id'>{oId}</td>                   

                        <td className='o_s_no'>상태</td>                         
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
                        <td className='o_reg_date'>{oRegDate.substring(0, 10)}</td>
                        <td className='o_mod_date'>주문 수정일</td>                        
                        <td className='o_mod_date'>{oModDate.substring(0, 10)}</td>
                    </tr>

                    <tr>
                        <td className='pm_no'>결제번호</td>
                        <td className='pm_no'>{pmNo}</td>
                        <td className='pm_method'>결제방법</td>
                        <td className='pm_method'>{pmMethod}</td>
                        <td className='pm_price'>결제금액</td>
                        <td className='pm_price'>{pmPrice}</td>                      
                    </tr>

                    <tr>                        
                        <td className='p_reg_date'>결제일</td>
                        <td className='p_reg_date'>{pRegDate.substring(0, 10)}</td>
                        <td className='p_mod_date'>결제 수정일</td>                        
                        <td className='p_mod_date'>{pModDate.substring(0, 10)}</td>
                    </tr>

                    <tr>
                        <td className='p_zip_code'>우편번호</td>
                        <td className='p_zip_code'>{pZipcode}</td>

                        <td className='u_no'>회원번호</td>
                        <td className='u_no'>{uNo}</td>
                    </tr>
                    <tr>
                        <td className='p_address_text'>주소</td>
                        <td className='p_address'>{pFirstAddr + ' ' + pSecondAddr}</td>
                    </tr>
                    <tr className='order-no-list'>
                        <th>구매번호</th>                        
                        <th>상품명</th>
                        <th>구매수량</th>
                        <th>단가</th>
                        <th>합계</th>
                    </tr>
                    

            {orderList ?
                Object.keys(orderList).map((el) => {
                    return <tr>                                    
                              <td className='o_no'>{orderList[el].o_no}</td>
                              <td className='p_no'>{orderList[el].PROD_NAME + ' ' + orderList[el].PROD_SPCS_NAME}</td>                              
                              <td className='o_count'>{orderList[el].o_count}</td>
                              <td className='o_price'>{Number(orderList[el].o_price).toLocaleString('ko-KR')}</td>
                              <td className='o_final_price'>{Number(orderList[el].o_final_price).toLocaleString('ko-KR')}</td>
                              <td className='o_count'><button type='button' className='btn sub' onClick={(e) => refundApproveClick(orderList[el].o_no)}>승인</button></td>
                              <td className='o_count'><button type='button' className='btn sub' onClick={(e) => refundRejectClick(orderList[el].o_no)}>승인불가</button></td>
                          </tr>

                })                
                : <tr><td>구매 상세 내역이 없습니다.</td></tr>
            }
                </table>

            </div>        
    </>
    );
};

export default AdminMarketRefundView;