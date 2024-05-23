import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { setTitle } from '../../util/setTitle';
import Loading from '../include/Loading';

const AdminMarketView = () => {

    const [isLoading, setIsLoading] = useState(true);

    const { id } = useParams();
    const [orderList, setOrderList] = useState({});
    const [oId, setOId] = useState('');
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
        setTitle('구매 상세 내역');
    }, []);

    useEffect(() => {
        initOrder();
    }, [id]);

    const initOrder = async () => {
        await axios.get(process.env.REACT_APP_SERVER_URL + "/admin/get_order", {
            params: {
                o_id: id,
            }
        }).then((data) => {
            let order = data.data[id][0];

            setIsLoading(false);
            setOrderList(data.data[id]);
            setOId(order.o_id);
            setUNo(order.u_no);
            setOSNo(order.o_s_no);
            setORegDate(order.o_reg_date);
            setOModDate(order.o_mod_date);
            setPmNo(order.pm_no);
            setPmPrice(order.pm_price);
            setPmMethod(order.pm_method);
            setPRegDate(order.p_reg_date);
            setPModDate(order.p_mod_date);
            setPZipCode(order.p_zip_code);
            setPFirstAddr(order.p_first_address);
            setPSeconAddr(order.p_second_address);
        }).catch((err) => {
            return { type: "error" };
        });
    }

    return (
        <>
            <div className='title'>구매 상세 내역</div>

            <div className='content' id='order-detail'>
                <div className='order-list-link'>
                    <Link to={"/admin/market"} className='link'>구매내역리스트</Link>
                </div>

                {isLoading ? (
                    <Loading />)
                    : (
                        <table>
                            <tr>
                                <td className='t1'>회원번호</td>
                                <td colSpan='2' className='t2'>주문번호</td>
                                <td colSpan='2' className='t4'>주문일</td>
                                <td colSpan='2' className='t6'>주문 수정일</td>
                            </tr>
                            <tr>
                                <td className='t1'>{uNo}</td>
                                <td colSpan='2' className='t2'>{oId}</td>
                                <td colSpan='2' className='t4'>{oRegDate.substring(0, 10)}</td>
                                <td colSpan='2' className='t6'>{oModDate.substring(0, 10)}</td>
                            </tr>
                            <tr>
                                <td className='t1'>결제 번호</td>
                                <td className='t2'>결제금액</td>
                                <td className='t4'>결제방법</td>
                                <td colSpan='2' className='t6'>결제일</td>
                                <td colSpan='2' className='t7'>결제 수정일</td>
                            </tr>
                            <tr>
                                <td className='t1'>{pmNo}</td>
                                <td className='t2'>{Number(pmPrice).toLocaleString('ko-KR')}</td>
                                <td className='t4'>{pmMethod}</td>
                                <td colSpan='2' className='t6'>{pRegDate.substring(0, 10)}</td>
                                <td colSpan='2' className='t7'>{pModDate.substring(0, 10)}</td>
                            </tr>
                            <tr>
                                <td className='t1'>우편번호</td>
                                <td colSpan='6' className='t2'>주소</td>
                            </tr>
                            <tr>
                                <td className='t1'>{pZipcode}</td>
                                <td colSpan='6' className='t2'>{pFirstAddr + ' ' + pSecondAddr}</td>
                            </tr>
                        </table>)}
                {isLoading ? (
                    <Loading />)
                    : (
                        <table>
                            <tr className='order-no-list'>
                                <th className='no'>구매번호</th>
                                <th className='name' colSpan='2'>상품명</th>
                                <th className='no'>구매수량</th>
                                <th className='price'>단가</th>
                                <th className='price'>합계</th>
                                <th className='o_s_no'>상태</th>
                            </tr>

                            {orderList ?
                                Object.keys(orderList).map((el) => {
                                    return <tr className='order-no-list'>
                                        <td className='no'>{orderList[el].o_no}</td>
                                        <td colSpan='2' className='name'>{orderList[el].PROD_NAME + ' ' + orderList[el].PROD_SPCS_NAME}</td>
                                        <td className='no'>{orderList[el].o_count}</td>
                                        <td className='price'>{Number(orderList[el].o_price).toLocaleString('ko-KR')}</td>
                                        <td className='price'>{Number(orderList[el].o_final_price).toLocaleString('ko-KR')}</td>
                                        <td className='o_s_no'>
                                            {
                                                orderList[el].o_s_no === -1 ? "결제 대기중" :
                                                    orderList[el].o_s_no === 0 ? "배송 준비중" :
                                                        orderList[el].o_s_no === 1 ? "배송중" :
                                                            orderList[el].o_s_no === 2 ? "환불 요청" :
                                                                orderList[el].o_s_no === 3 ? "환불 완료" :
                                                                    orderList[el].o_s_no === 4 ? "구매 취소" :
                                                                        orderList[el].o_s_no === 5 ? "구매 확정" :
                                                                            orderList[el].o_s_no === 6 ? "배송 완료" : ""

                                            }
                                        </td>
                                    </tr>
                                })
                                :
                                <>
                                    <tr><td>구매 상세 내역이 없습니다.</td></tr>
                                </>
                            }
                        </table>)}
            </div>
        </>
    );
};

export default AdminMarketView;