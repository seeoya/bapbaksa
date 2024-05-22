import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { setTitle } from '../../util/setTitle';
import Loading from '../include/Loading';

const AdminMarketRefundView = () => {
    const [isLoading, setIsLoading] = useState(true);

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
    const [orderFlag, setOrderFlag] = useState(false);
    const [prodFlag, setProdFlag] = useState(false);
    const [order, setOrder] = useState({});
    const [prod, setProd] = useState({});
    const [btnFlag, setBtnFlag] = useState(false);

    useEffect(() => {
        initOrder();
        setTitle('환불 상세 내역');
    }, [no, isLoading]);

    const initOrder = async () => {
        await axios.get(process.env.REACT_APP_SERVER_URL + "/admin/get_refund_order", {
            params: {
                o_no: no,
            }
        }).then((data) => {
            let order = data.data.refund;
            let prod = data.data.prod;

            if (order) {
                setOrderFlag(true);
                setOrder(order);
                setORegDate(order.o_reg_date);
                setOId(order.o_id);
                setUNo(order.u_no);
                setOSNo(order.o_s_no);
                if (order.o_s_no === 2) setBtnFlag(true);
                setOCount(order.o_count);
                setOPrice(order.o_price);
                setOFinalPrice(order.o_final_price);
                setOModDate(order.o_mod_date);
                setPmNo(order.pm_no);
                setPmPrice(order.pm_price);
                setPmMethod(order.pm_method);
                setPRegDate(order.p_reg_date);
                setPModDate(order.p_mod_date);
            }

            if (prod) {
                setProdFlag(true);
                setProd(prod);
                setPROD_NAME(prod.PROD_NAME);
                setPROD_SPCS_NAME(prod.PROD_SPCS_NAME);
            }
            setIsLoading(false);

        }).catch((err) => {
            return { type: "error" };
        });
    }

    const refundApproveClick = async (e) => {
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
            setIsLoading(false);
            alert('환불처리가 완료되었습니다.');

        }).catch((err) => {
            alert('환불처리에 실패하였습니다.');
            return { type: "error" };
        });
    }

    const refundRejectClick = async (e) => {
        await axios.put(process.env.REACT_APP_SERVER_URL + "/admin/put_reject", {
            params: {
                o_no: e,
                o_s_no: 6,
            }
        }).then((data) => {
            setIsLoading(false);
            alert('환불 승인불가 처리가 완료되었습니다.');

        }).catch((err) => {
            alert('환불 승인불가 처리에 실패하였습니다.');
            return { type: "error" };
        });
    }

    return (
        <>
            <div className='title'>환불 상세 내역</div>

            <div id='refund-detail'>
                <div className='content'>

                    <div className='refund-list-link'>
                        <Link to={"/admin/market"} className='link'>환불관리</Link>
                    </div>

                    {isLoading ? <Loading />
                        : (
                            <table className='refund-table'>
                                {orderFlag && prodFlag ?
                                    <>
                                        <tr>
                                            <td className='t1'>회원번호</td>
                                            <td className='t2'>{uNo}</td>

                                            <td className='t3'>결제번호</td>
                                            <td className='t4'>{pmNo}</td>
                                        </tr>
                                        <tr>
                                            <td className='t1'>주문번호</td>
                                            <td className='t2'>{oId}</td>

                                            <td className='t3'>구매상태</td>
                                            <td className='t4'>
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
                                            <td className='t1'>주문일자</td>
                                            <td className='t2'>{oRegDate.substring(0, 10)}</td>
                                            <td className='t3'>결제일자</td>
                                            <td className='t4'>{pRegDate.substring(0, 10)}</td>
                                        </tr>
                                        <tr>
                                            <td className='t1'>주문 수정일</td>
                                            <td className='t2'>{oModDate.substring(0, 10)}</td>
                                            <td className='t3'>결제 수정일</td>
                                            <td className='t4'>{pModDate.substring(0, 10)}</td>
                                        </tr>
                                        <tr>
                                            <td className='t1'>구매번호</td>
                                            <td className='t2'>{no}</td>
                                            <td className='t3'>결제방법</td>
                                            <td className='t4'>{pmMethod}</td>
                                        </tr>
                                        <tr>
                                            <td className='t1'>구매수량</td>
                                            <td className='t2'>{oCount}</td>
                                            <td className='t3'>결제금액</td>
                                            <td className='t4'>{pmPrice.toLocaleString('ko-KR')}</td>
                                        </tr>
                                        <tr>
                                            <td className='t1'>상품단가</td>
                                            <td className='t2'>{oPrice.toLocaleString('ko-KR')}</td>
                                            <td className='t3'>합계금액</td>
                                            <td className='t4'>{oFinalPrice.toLocaleString('ko-KR')}</td>
                                        </tr>
                                        <tr>
                                            <td className='t1'>구입상품</td>
                                            <td colSpan='3' className='t5'>{PROD_NAME + ' ' + PROD_SPCS_NAME}</td>
                                        </tr>
                                    </>
                                    :
                                    <><tr><td>구매 상세 내역이 없습니다.</td></tr></>}
                            </table>)}
                    {orderFlag && prodFlag && btnFlag ?
                        <div className='btn-wrap'>
                            <button type='button' className='btn sub half' onClick={(e) => refundApproveClick(order)}>환불 승인</button>
                            <button type='button' className='btn sub half' onClick={(e) => refundRejectClick(no)}>승인 불가</button>
                        </div>
                        : <></>}
                </div>
            </div>
        </>
    );
};

export default AdminMarketRefundView;