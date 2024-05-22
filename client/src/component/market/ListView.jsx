import ApexCharts from 'apexcharts';
import axios from 'axios';
import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getToken } from '../../storage/loginedToken';
import { setTitle } from '../../util/setTitle';
import Loading from '../include/Loading';
import { NewProductQuery } from '../../query/productQuerys';

const ListView = () => {
    const { no } = useParams();
    const [num, code] = no.split('_');

    const { data: newProductList, isLoading: newProductIsLoading, isError: newProductIsError } = NewProductQuery();
    const [itemPCode, itemPsCode] = no.split('_');
    const [item, setItem] = useState({});


    const [quantityInt, setQuantityInt] = useState(1);
    const [chartData, setChartData] = useState([]);
    const [viewData, setViewData] = useState([]);
    const [goToPay, setGoToPay] = useState([]);

    const [stock, setStock] = useState(0);

    const [isLoading, setIsLoading] = useState(true);

    const chartRef = useRef(null);
    const navigate = useNavigate();

    useEffect(() => {
        setTitle(viewData?.PROD_NAME);
    }, []);

    useEffect(() => {
        if (newProductList) {
            newProductList.map((el) => {
                if (el.PROD_CODE == parseInt(itemPCode) && el.PROD_SPCS_CODE == parseInt(itemPsCode)) {
                    setItem(el);
                }
            })
        }
    }, [newProductList, itemPCode, itemPsCode])

    useEffect(() => {
        console.log("item: ", item);

        axiox_getChartData();
        setPaymentInfo();
        getStock();
    }, [item]);

    useEffect(() => {
        if (item.PROD_NAME && chartData.length > 0) {
            createChart();
        }
    }, [item.PROD_NAME, chartData, viewData]);

    const createChart = () => {
        if (!chartRef.current) return;

        let options = {
            series: [{
                name: item.PROD_NAME,
                data: chartData.map(data => data.y)
            }],
            chart: {
                height: 350,
                type: 'line',
                zoom: {
                    enabled: true
                },
                toolbar: {
                    show: true,
                    offsetX: 0,
                    offsetY: 0,
                    tools: {
                        download: true,
                        selection: true,
                        zoom: true,
                        zoomin: true,
                        zoomout: true,
                        pan: false,
                        customIcons: []
                    }
                }
            },
            dataLabels: {
                enabled: false
            },
            stroke: {
                curve: 'smooth'
            },
            title: {
                text: item.PROD_NAME,
                align: 'left'
            },
            grid: {
                row: {
                    colors: ['#f3f3f3', 'transparent'],
                    opacity: 0.5
                }
            },
            xaxis: {
                categories: chartData.map(data => data.x),
            },
            fill: {
                type: "gradient",
                gradient: { gradientToColors: ["orange"], stops: [0, 100] },
            },
            colors: ["red"]
        };

        if (chartRef.current.chart) {
            chartRef.current.chart.updateOptions(options);
        } else {
            const chart = new ApexCharts(chartRef.current, options);
            chart.render();
            chartRef.current.chart = chart;
        }

        return () => {
            if (chartRef.current.chart) {
                chartRef.current.chart.destroy();
            }
        };
    }

    const goToMarketCartBtn = async () => {
        await getStock("MarketCart");
    }

    const handleCount = (type) => {
        if (type === "plus") {
            setQuantityInt(quantityInt + 1);
        } else if (type === "minus" && quantityInt > 0) {
            setQuantityInt(quantityInt - 1);
        }
    };

    const quantityValue = (e) => {
        setQuantityInt(parseInt(e.target.value));
    };

    const setPaymentInfo = () => {
        let items = [];

        items.push({
            'PROD_NO': item.PROD_NO,
            'MC_COUNT': quantityInt,
        });
        setGoToPay(items);
    }

    const getStock = async (type = "") => {
        try {
            const response = await axios.get(process.env.REACT_APP_SERVER_URL + "/admin/stock", {
                params: {
                    p_code: itemPCode,
                    ps_code: itemPsCode
                }
            });

            setStock(response.data);

            if (type === "MarketCart") {
                let u_no = getToken('loginedUNo');
                let p_code = item.PROD_CODE;
                let ps_code = item.PROD_SPCS_CODE;
                let mc_count = quantityInt;

                if (response.data > 0) {
                    await axios_goToMarketCart(u_no, p_code, ps_code, mc_count);
                    setQuantityInt(0);
                    navigate("/market/cart");
                } else {
                    alert('품절된 상품입니다.');
                }

                setIsLoading(false);
            }
        } catch (err) {
            console.log(err);
        }
    }

    async function axiox_getChartData() {
        try {
            const response = await axios.post(process.env.REACT_APP_REST_SERVER_URL + "/product/getChartData", {
                'PROD_CODE': item.PROD_CODE,
                'PROD_SPCS_CODE': item.PROD_SPCS_CODE
            });

            setViewData(response.data[response.data.length - 1]);
            const chartInfo = response.data.map(item => ({
                x: item.PROD_YMD,
                y: item.PROD_AVRG_PRCE
            }));
            setChartData(chartInfo);
            setIsLoading(false);
        } catch (error) {
            console.log(error);
        }
    }

    async function axios_goToMarketCart(u_no, p_code, ps_code, mc_count) {
        try {
            await axios.post(process.env.REACT_APP_SERVER_URL + "/market/goToMarketCart", {
                'U_NO': u_no,
                'P_CODE': p_code,
                'PS_CODE': ps_code,
                'MC_COUNT': mc_count
            })
            setIsLoading(false);
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <>
            {isLoading ? <Loading /> : null}
            <div className='content-wrap' id="market_list_view">
                <h2 className='title'>품목 상세</h2>
                <div className='content'>

                    {
                        item ? (
                            <div className='ingredient-view-wrap'>
                                <div className="ingredient-img-wrap">
                                    <img className="ingredient-img" src={`/imgs/product/${item.PROD_IMG}`} alt="ingredient" />
                                </div>
                                <div className='market-list-view-info-wrap'>
                                    <div className="ingredient-info-wrap">
                                        <span className="ingredient-title">{item.PROD_NAME} / {item.PROD_SPCS_NAME}</span>
                                        <div className="ingredient-top-wrap">
                                            <span className="ingredient-unit">{item.DSBN_STEP_ACTO_WT}{item.DSBN_STEP_ACTO_UNIT_NM}</span>
                                            <span className="ingredient-price">{parseInt(item.PROD_AVRG_PRCE).toLocaleString()}원</span>
                                        </div>
                                        {
                                            stock > 0 ? <>
                                                <div className="ingredient-middle-wrap">
                                                    <div>
                                                        재고: {stock}
                                                    </div>
                                                    <div>
                                                        <input type="button" onClick={() => handleCount("minus")} value="-" />
                                                        <input type="number" onChange={(e) => quantityValue(e)} value={quantityInt} id="result"></input>
                                                        <input type="button" onClick={() => handleCount("plus")} value="+" />
                                                    </div>
                                                </div>
                                                <div>
                                                </div>
                                                <div className="ingredient-bottom-wrap">
                                                    <div className="ingredient-bottom-wrap-price">
                                                        <span className="ingredient-info">총액 : </span>
                                                        <span className="ingredient-price">{parseInt(quantityInt * item.PROD_AVRG_PRCE).toLocaleString()}원</span>
                                                    </div>
                                                    <div className='ingredient-bottom-wrap-btn'>
                                                        <button type="button" className='go-cart-btn' onClick={goToMarketCartBtn}>장바구니</button>
                                                        {goToPay.length > 0 ? (
                                                            <Link to={`/market/payment`} state={{ goToPay: goToPay }} className='go-payment-btn main btn'>
                                                                선택 결제
                                                            </Link>
                                                        ) :
                                                            <button>선택 결제</button>
                                                        }
                                                    </div>
                                                </div>
                                            </> : <span>품절</span>
                                        }
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div>로딩 중...</div>
                        )}
                    <div>
                        <h2 className='title'>품목 시세</h2>
                        <div id="price-chart-wrap" ref={chartRef}></div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ListView;
