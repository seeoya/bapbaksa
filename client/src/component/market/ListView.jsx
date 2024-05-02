import ApexCharts from 'apexcharts';
import React, { useEffect, useState } from "react";

const ListView = () => {
    const [quantityInt, setQuantityInt] = useState(0);

    useEffect(() => {
        let options = {
            series: [{
                name: "상추",
                data: [1000, 1050, 1200, 950, 1050, 1300, 1470, 1200, 1050]
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
                text: '상추',
                align: 'left'
            },
            grid: {
                row: {
                    colors: ['#f3f3f3', 'transparent'],
                    opacity: 0.5
                }
            },
            xaxis: {
                categories: ['2023.07', '2023.08', '2023.09', '2023.10', '2023.11', '2023.12', '2024.01', '2024.02', '2024.03'],
            },
            fill: {
                type: "gradient",
                gradient: { gradientToColors: ["orange"], stops: [0, 100] },
            },
            colors: ["red"]
        };

        let chart = new ApexCharts(document.querySelector("#price-chart-wrap"), options);
        chart.render();

        return () => {
            chart.destroy();
        };
    }, []);

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

    return (
        <div className='content-wrap' id="market_list_view">
            <h2 className='title'>품목 상세</h2>
            
            <div className='content'>
                <div className='ingredient-view-wrap'>
                    <div className="ingredient-img-wrap">
                        <img className="ingredient-img" src="/img/방울토마토.jpg" alt="ingredient" />
                        <span className="ingredient-title">토마토</span>
                    </div>
                    <div className="ingredient-info-wrap">
                        <div className="ingredient-top-wrap">
                            <span className="ingredient-unit">5kg</span>
                            <span className="ingredient-price">10,000원</span>
                        </div>
                    </div>
                    <div>
                        <div className="ingredient-middle-wrap">
                            <input type="button" onClick={() => handleCount("minus")} value="-" />
                            <input type="number" onChange={(e) => quantityValue(e)} value={quantityInt} id="result"></input>
                            <input type="button" onClick={() => handleCount("plus")} value="+" />
                        </div>
                    </div>
                    <div>
                        <div className="ingredient-bottom-wrap">
                            <span className="ingredient-info">총액 : </span>
                            <span className="ingredient-price">10,000원</span>
                            &nbsp;&nbsp;&nbsp;<button type="button" className='go-cart-btn'>장바구니</button>
                            &nbsp;&nbsp;&nbsp;<button type="button" className='go-payment-btn'>바로 결제</button>
                        </div>
                    </div>
                    </div>
                </div>
                <div>
                    <h2 className='title'>품목 시세</h2>
                    <div id="price-chart-wrap"></div>
                </div>
            </div>
    );
};

export default ListView;
