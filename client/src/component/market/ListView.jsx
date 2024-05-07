import ApexCharts from 'apexcharts';
import axios from 'axios';
import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { SERVER_URL } from '../../util/url';

const ListView = () => {
    const { no } = useParams();
    const [ num , code] = no.split('_');
    
    const [quantityInt, setQuantityInt] = useState(0);
    const [prodInfo, setProdInfo] = useState({});
    const [chartData, setChartData] = useState([]);
    const [viewData, setViewData] = useState([]);
    const chartRef = useRef(null);

    useEffect(() => {
        axios_getProdInfo();
    }, [no]);

    useEffect(() => {
        axiox_getChartData();
    }, [prodInfo]);

    useEffect(() => {
        if (prodInfo.PROD_NAME && chartData.length > 0) {
            createChart();
        }
    }, [prodInfo.PROD_NAME, chartData, viewData]);

    const createChart = () => {
        if (!chartRef.current) return; // 참조가 존재하지 않으면 종료

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

    async function axios_getProdInfo() {
        try {
            const response = await axios.post(`${SERVER_URL.TARGET_URL()}/product/postSelectedProduct`, {
                'PROD_NO' : num,
                'PROD_SPCS_CODE' : code
            })
            
            setProdInfo(response.data[0]);
        } catch (error) {
            console.log(error)
        }
    }

    async function axiox_getChartData() {
        try {
            const response = await axios.post(`${SERVER_URL.TARGET_URL()}/product/getChartData`, {
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

    return (
        <div className='content-wrap' id="market_list_view">
            <h2 className='title'>품목 상세</h2>
            <div className='content'>
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
                            <div className="ingredient-middle-wrap">
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
                                    <button type="button" className='go-cart-btn'>장바구니</button>
                                    <button type="button" className='go-payment-btn'>바로 결제</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    </div>
                </div>
                <div>
                    <h2 className='title'>품목 시세</h2>
                    <div id="price-chart-wrap" ref={chartRef}></div>
                </div>
            </div>
    );
};

export default ListView;
