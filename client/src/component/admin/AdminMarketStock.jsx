import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { NewProductQuery } from '../../query/productQuerys';

const AdminMarketStock = () => {
    const { data: newProductList, isLoading: newProductIsLoading, isError: newProductIsError } = NewProductQuery();

    const [stockList, setStockList] = useState({});

    useEffect(() => {
        getStock();
    }, []);

    const getStock = async () => {
        await axios.get(process.env.REACT_APP_SERVER_URL + "/admin/stock", { params: {} })
            .then((data) => {
                setStockList(data.data);
            }).catch((err) => {
                return { type: "error" };
            });
    }

    const changeStock = async (e) => {
        let item = e.target;

        let p_code = item.dataset.pCode,
            ps_code = item.dataset.psCode,
            ps_count = item.previousSibling.value;

        await axios.put(process.env.REACT_APP_SERVER_URL + "/admin/stock", {
            p_code: p_code,
            ps_code: ps_code,
            ps_count: ps_count
        }).then((data) => {
            if (data.data.affectedRows > 0) {
                getStock();
                item.previousSibling.value = 0;
            } else {
                alert("재고 변경에 실패했습니다.");
            }
        }).catch((err) => {
            return { type: "error" };
        });
    }

    const initCount = () => {
        if (newProductList) {
            let tmp = [];
            newProductList.map((el) => {
                tmp.push({ p_code: el.PROD_CODE, ps_code: el.PROD_SPCS_CODE });
            })

            insertAllStock(tmp)
        } else {
            alert("상품 목록이 없습니다.");
        }
    }

    const insertAllStock = async (list) => {
        await axios.post(process.env.REACT_APP_SERVER_URL + "/admin/stock", {
            list: list
        }).then((data) => {
            getStock();
        }).catch((err) => {
            return { type: "error" };
        });
    }

    return (
        <>
            <div className='title'>재고 목록</div>

            <div className='content'>
                <div className="admin-btn-wrap">
                    <button type='button' onClick={initCount} className='btn main'>재고 초기화(전체 100으로 변경)</button>
                </div>

                <table>
                    <tr>
                        <th className='p-code'>상품 코드</th>
                        <th className='ps-code'>상품 상세 코드</th>
                        <th className=''>상품명</th>
                        <th className='ps-count'>재고</th>
                        <th className='p-btn-wrap'>재고 수정</th>
                    </tr>

                    {
                        newProductList?.length > 0 && Object.keys(stockList)?.length > 0 ?
                            newProductList.map((el) => {
                                return <tr>
                                    <td className='p-code'>{el.PROD_CODE}</td>
                                    <td className='ps-code'>{el.PROD_SPCS_CODE}</td>
                                    <td className=''>
                                        <Link to={`/market/view/${el.PROD_CODE}_${el.PROD_SPCS_CODE}`}>
                                            {el.PROD_SPCS_NAME}
                                        </Link>
                                    </td>
                                    <td className='ps-count'>{stockList[el.PROD_CODE][el.PROD_SPCS_CODE]}</td>
                                    <td className='p-btn-wrap'>
                                        <input type="number" className='input' defaultValue={0} />
                                        <button type='button' className='btn sub' data-p-code={el.PROD_CODE} data-ps-code={el.PROD_SPCS_CODE} onClick={(e) => changeStock(e)}>수정</button>
                                    </td>
                                </tr>
                            })
                            : <tr><td colSpan={5}>아이템이 없습니다.</td></tr>
                    }
                </table>
            </div>
        </>
    );
};

export default AdminMarketStock;