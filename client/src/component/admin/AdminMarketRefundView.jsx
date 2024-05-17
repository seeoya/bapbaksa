import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';

const AdminMarketRefundView = () => {
    const { id } = useParams();      
    const [orderList, setOrderList] = useState({});        
    const [oId, setOId] = useState('');
    const [pmNo, setPmNo] = useState(0);
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

            let order = data.data[0];
            console.log(order);

            setOrderList(data.data);            
            setORegDate(order.o_reg_date);
            setOId(order.o_id);
            setPmNo(order.pm_no);            
            setUNo(order.u_no);
            setOSNo(order.o_s_no);            
            setOModDate(order.o_mod_date);
            setPZipCode(order.p_zip_code);
            setPFirstAddr(order.p_first_address);
            setPSeconAddr(order.p_second_address);

        }).catch((err) => {
            return { type: "error" };
        });
    } 

    

    return (
        <>
        <div className='title order-info'>
                
            <div>
                <table>
                    <tr>
                        <td className='u_more'>
                            <Link to={"/admin/market"}>구매내역리스트</Link>
                        </td>
                    </tr>
                    <tr>                        
                        <td className='o_reg_date'>주문일</td>
                        <td className='o_reg_date'>{oRegDate.substring(0, 10)}</td>
                        <td className='o_mod_date'>수정일</td>                        
                        <td className='o_mod_date'>{oModDate.substring(0, 10)}</td>
                    </tr>
                    <tr>
                        <td className='o_id'>주문번호</td>
                        <td className='o_id'>{oId}</td>
                    
                        <td className='pm_no'>결제번호</td>
                        <td className='pm_no'>{pmNo}</td>

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
                        <td className='p_zip_code'>우편번호</td>
                        <td className='p_zip_code'>{pZipcode}</td>

                        <td className='u_no'>회원번호</td>
                        <td className='u_no'>{uNo}</td>
                    </tr>
                    <tr>
                        <td className='p_zip_code'>주소</td>
                        <td className='p_zip_code'>{pFirstAddr + ' ' + pSecondAddr}</td>
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
                              <td className='p_no'>{orderList[el].p_no}</td>
                              <td className='o_count'>{orderList[el].o_count}</td>
                              <td className='o_price'>{Number(orderList[el].o_price).toLocaleString('ko-KR')}</td>
                              <td className='o_final_price'>{Number(orderList[el].o_final_price).toLocaleString('ko-KR')}</td>
                              <td className='o_count'>{orderList[el].o_count}</td>
                          </tr>

                })
                // "${#numbers.formatInteger(cate8, 1, 'COMMA') + '원'}"
                : <tr><td>구매 상세 내역이 없습니다.</td></tr>
            }
                </table>

            </div>
        </div>
    </>
    );
};

export default AdminMarketRefundView;