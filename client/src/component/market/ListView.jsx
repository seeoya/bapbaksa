import ApexCharts from 'apexcharts';
import axios from 'axios';
import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getToken } from '../../storage/loginedToken';
import { setTitle } from '../../util/setTitle';

const ListView = () => {
    const { no } = useParams();
    const [num, code] = no.split('_');

    const [quantityInt, setQuantityInt] = useState(1);
    const [prodInfo, setProdInfo] = useState({});
    const [chartData, setChartData] = useState([]);
    const [viewData, setViewData] = useState([]);
    const [goToPay, setGoToPay] = useState([]);

    const [stock, setStock] = useState(0);

    const chartRef = useRef(null);

    const navigate = useNavigate();

    useEffect(() => {
        setTitle(viewData?.PROD_NAME);
    });

    useEffect(() => {
        setPaymentInfo()
    }, [quantityInt]);

    useEffect(() => {
        axios_getProdInfo();
    }, [no, code]);

    useEffect(() => {
        axiox_getChartData();
    }, [prodInfo]);

    useEffect(() => {
        if (prodInfo?.PROD_NAME && chartData.length > 0) {
            createChart();
        }
    }, [prodInfo?.PROD_NAME, chartData, viewData]);

    const createChart = () => {
        if (!chartRef.current) return;

        let options = {
            series: [{
                name: prodInfo.PROD_NAME,
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
                text: prodInfo.PROD_NAME,
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

        // 이전 차트가 존재하면 파기
        return () => {
            if (chartRef.current.chart) {
                chartRef.current.chart.destroy();
            }
        };
    }

    const goToMarketCartBtn = async () => {
        let u_no = getToken('loginedUNo');
        let i_no = prodInfo.PROD_NO;
        let mc_count = quantityInt;

        await axios_goToMarketCart(u_no, i_no, mc_count);
        setQuantityInt(0);
        navigate("/market/cart");
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
            'I_NO': num,
            'MC_COUNT': quantityInt
        });
        setGoToPay(items);
    }

    async function axios_getProdInfo() {
        try {
            const response = await axios.post(process.env.REACT_APP_REST_SERVER_URL + "/product/postSelectedProduct", {
                'PROD_NO': num,
                'PROD_SPCS_CODE': code
            })

            setProdInfo(response.data[0]);
            getStock();
        } catch (error) {
            console.log(error)
        }
    }

    const getStock = async () => {
        await axios.get(process.env.REACT_APP_SERVER_URL + "/admin/stock", {
            params: {
                p_code: num,
                ps_code: code
            }
        }).then((data) => {
            setStock(data.data);
        }).catch((err) => {
            return { type: "error" };
        });
    }

    async function axiox_getChartData() {
        try {
            const response = await axios.post(process.env.REACT_APP_REST_SERVER_URL + "/product/getChartData", {
                'PROD_CODE': prodInfo.PROD_CODE,
                'PROD_SPCS_CODE': prodInfo.PROD_SPCS_CODE
            });

            setViewData(response.data[response.data.length - 1]);
            const chartInfo = response.data.map(item => ({
                x: item.PROD_YMD,
                y: item.PROD_AVRG_PRCE
            }));
            setChartData(chartInfo);
        } catch (error) {
            console.log(error);
        }
    }

    async function axios_goToMarketCart(u_no, i_no, mc_count) {
        try {

            const response = await axios.post(process.env.REACT_APP_SERVER_URL + "/market/goToMarketCart", {
                'U_NO': u_no,
                'I_NO': i_no,
                'MC_COUNT': mc_count
            })
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className='content-wrap' id="market_list_view">
            <h2 className='title'>품목 상세</h2>
            <div className='content'>

                {prodInfo ? (
                    <div className='ingredient-view-wrap'>
                        <div className="ingredient-img-wrap">
                            <img className="ingredient-img" src={`/imgs/product/${prodInfo.PROD_IMG}`} alt="ingredient" />
                        </div>
                        <div className='market-list-view-info-wrap'>
                            <div className="ingredient-info-wrap">
                                <span className="ingredient-title">{viewData?.PROD_NAME}</span>
                                <div className="ingredient-top-wrap">
                                    <span className="ingredient-unit">{prodInfo.DSBN_STEP_ACTO_WT}{prodInfo.DSBN_STEP_ACTO_UNIT_NM}</span>
                                    <span className="ingredient-price">{Number(viewData?.PROD_AVRG_PRCE).toLocaleString()}원</span>
                                </div>
                                {
                                    stock > 0 ? <>
                                        <div className="ingredient-middle-wrap">
                                            <span>재고: {stock}</span>

                                            <input type="button" onClick={() => handleCount("minus")} value="-" />
                                            <input type="number" onChange={(e) => quantityValue(e)} value={quantityInt} id="result"></input>
                                            <input type="button" onClick={() => handleCount("plus")} value="+" />
                                        </div>
                                        <div>
                                        </div>
                                        <div className="ingredient-bottom-wrap">
                                            <div className="ingredient-bottom-wrap-price">
                                                <span className="ingredient-info">총액 : </span>
                                                <span className="ingredient-price">{Number(quantityInt * viewData?.PROD_AVRG_PRCE).toLocaleString()}원</span>
                                            </div>
                                            <div className='ingredient-bottom-wrap-btn'>
                                                <button type="button" className='go-cart-btn' onClick={goToMarketCartBtn}>장바구니</button>
                                                {goToPay.length > 0 ? (
                                                    <Link to={`/market/payment`} state={{ goToPay: goToPay }} className='go-payment-btn'>
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
    );
};

export default ListView;
