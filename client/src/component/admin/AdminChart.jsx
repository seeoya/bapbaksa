import React, { useEffect, useRef, useState } from "react";
import ApexCharts from 'apexcharts';
import axios from "axios";
import { setTitle } from "../../util/setTitle";

const AdminChart = () => {

    const [monthDate, setMonthDate] = useState([]);
    const [monthViewData, setMonthViewData] = useState([]);

    const [curCtegoryDate, setCurCtegoryDate] = useState([]);
    const [curCtegoryViewData, setCurCtegoryViewData] = useState([]);

    const [lastCtegoryDate, setLastCtegoryDate] = useState([]);
    const [lastCtegoryViewData, setLastCtegoryViewData] = useState([]);

    const monthChartRef = useRef(null);
    const categoryChartRef = useRef(null);

    useEffect(() => {
        axios_getMonthmonthDate();
        axios_getCurCategorymonthDate();
        axios_getLastCategorymonthDate();
        setTitle('구매 차트');
    }, []);

    useEffect(() => {
        if (monthDate && curCtegoryDate && lastCtegoryDate) {
            createMonthChart();
            createCategoryChart();
            console.log('monthDate  : ', monthDate);
        }
    }, [monthDate, curCtegoryDate, lastCtegoryDate]);

    const createMonthChart = () => {
        if(!monthChartRef.current) return;

        let options = {
            series: [{
                name: "월별 차트",
                data: monthDate.map(data => data.y)
            }],
            chart: {
                height: 450,
                width: 600,
                type: 'bar',
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
                text: "월별 판매 차트",
                align: 'left'
            },
            grid: {
                row: {
                    colors: ['#f3f3f3', 'transparent'],
                    opacity: 0.5
                }
            },
            xaxis: {
                categories: monthDate.map(data => data.x),
            },
            fill: {
                type: "gradient",
                gradient: { gradientToColors: ["orange"], stops: [0, 100] },
            },
            colors: ['#99C2A2', '#C5EDAC', '#66C7F4'],
        };
        if (monthChartRef.current.chart) {
            monthChartRef.current.chart.updateOptions(options);
        } else {
            const chart = new ApexCharts(monthChartRef.current, options);
            chart.render();
            monthChartRef.current.chart = chart;
        }

        // 이전 차트가 존재하면 파기
        return () => {
            if (monthChartRef.current.chart) {
                monthChartRef.current.chart.destroy();
            }
        };
    }

    const createCategoryChart = () => {
        if(!categoryChartRef.current) return;

        let options = {
            series: [{
                name: "이번달 매출",
                data: curCtegoryDate.map(data => data.y)
            },
            {
                name: "전달 매출",
                data: lastCtegoryDate.map(data => data.y)
            }
            ],
            chart: {
                height: 450,
                width: 600,
                type: 'bar',
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
                text: "카테고리별 판매 차트",
                align: 'left'
            },
            grid: {
                row: {
                    colors: ['#f3f3f3', 'transparent'],
                    opacity: 0.5
                }
            },
            xaxis: {
                categories: curCtegoryDate.map(data => data.x),
            },
            fill: {
                type: "gradient",
                gradient: { gradientToColors: ["orange"], stops: [0, 100] },
            },
            colors: ["red"]
        };
        if (categoryChartRef.current.chart) {
            categoryChartRef.current.chart.updateOptions(options);
        } else {
            const chart = new ApexCharts(categoryChartRef.current, options);
            chart.render();
            categoryChartRef.current.chart = chart;
        }

        // 이전 차트가 존재하면 파기
        return () => {
            if (categoryChartRef.current.chart) {
                categoryChartRef.current.chart.destroy();
            }
        };
    }

    async function axios_getMonthmonthDate() {
        try {
            const response = await axios.get(process.env.REACT_APP_SERVER_URL + "/admin/monthChart")
            setMonthViewData(response.data[response.data.length - 1]);
            const chartInfo = response.data.map(item => ({
                x: item.formatted_date,
                y: item.total_final_price
            }));
            setMonthDate(chartInfo);
        } catch (error) {
            console.log('error : ', error);
        }
    }

    async function axios_getCurCategorymonthDate() {
        try {
            const response = await axios.get(process.env.REACT_APP_SERVER_URL + "/admin/curCategoryChart")
            setCurCtegoryViewData(response.data[response.data.length - 1]);
            const curChartInfo = response.data.map(item => ({
                x: item.P_NO,
                y: item.total_final_price
            }));
            setCurCtegoryDate(curChartInfo);
        } catch (error) {
            console.log('error : ', error);
        }
    }


    async function axios_getLastCategorymonthDate() {
        try {
            const response = await axios.get(process.env.REACT_APP_SERVER_URL + "/admin/lastCategoryChart")
            setLastCtegoryViewData(response.data[response.data.length - 1]);
            const lastChartInfo = response.data.map(item => ({
                x: item.P_NO,
                y: item.total_final_price
            }));
            setLastCtegoryDate(lastChartInfo);
        } catch (error) {
            console.log('error : ', error);
        }
    }


    return (
        <div className="admin-chart-wrap">
            <div ref={monthChartRef}></div>
            <div ref={categoryChartRef}></div>
        </div>
    )
}

export default AdminChart;