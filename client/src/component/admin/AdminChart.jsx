import React, { useEffect, useRef, useState } from "react";
import ApexCharts from 'apexcharts';
import axios from "axios";

const AdminChart = () => {

    const [chartData, setChartData] = useState([]);
    const [viewData, setViewData] = useState([]);
    const [saleInfo, setSaleInfo] = useState({});

    const chartRef = useRef(null);

    useEffect(() => {
        axios_getMonthChartData();
    }, []);

    const createChart = () => {
        if(!chartRef.current) return;

        let options = {
            series: [{
                
            }],
        }
    }

    async function axios_getMonthChartData() {
        try {
            const response = await axios.get(process.env.REACT_APP_SERVER_URL + "/market/monthChart")
            // setViewData(response.data[response.data.length - 1]);
            // const chartInfo = response.data.map(item => ({
            //     x: item.PROD_YMD,
            //     y: item.PROD_AVRG_PRCE
            // }));
            // console.log("response.data : ", response.data.cur[0].total_final_price);
            console.log("response.data : ", response.data);
            // setChartData(chartInfo);
        } catch (error) {
            console.log('error : ', error);
        }
    }

    return (
        <div className="admin-chart-wrap">
            Admin Chart Page
            <div ref={chartRef}></div>
        </div>
    )
}

export default AdminChart;