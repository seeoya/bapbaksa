import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { twelveProduct } from "../../redux/actions/market";
import axios from "axios";

const MarketList = () => {
    const dispatch = useDispatch();

    const prodData = useSelector((state) => state.marketReducer.ProdData);
    const [active, setActive] = useState("");
    const [newProdDate, setNewProdDate] = useState([]);
    const [number,setNumber] = useState(1);
    const [search,setSearch] = useState('');
    const [page, setPage] = useState(0);
    const [temp,setTemp] = useState(false);

    useEffect(() => {
        moreProductBtn();
        handleCategoryClick("all");
    }, []);
    
    const moreProductBtn = async () => {
        setPage(prev => prev + 1);
        const updatedNumber = number;
        dispatch(await twelveProduct(newProdDate, updatedNumber, search, page));        
    };
    
    const handleCategoryClick = async (category_name) => {
            switch (category_name) {
                case "all":
                    setNumber(1);
                    console.log('전체 클릭');
                    break;
                case "carbohydrate":
                    console.log('탄수화물 클릭');
                    setNumber(2);
                    break;
                case "vegetable":
                    console.log('채소 클릭');
                    setNumber(3);
                    break;
                case "meat":
                    console.log('육류 클릭');
                    setNumber(4);
                    break;
                case "seaweed":
                    console.log('해조류 클릭');
                    setNumber(5);
                    break;
                case "processed_meet":
                    console.log('가공육류 클릭');
                    setNumber(6);
                    break;
                case "processed_food":
                    console.log('가공식품 클릭');
                    setNumber(7);
                    break;
                default:
                    break;
            }
            setActive(category_name);
    };

    return (

        <div id="market_list">
            <div className="ingredient-category">

                <div className="ingredient-category-btn">
                    <button className={active === "all" ? "all btn_clicked" : "all"} type="button" onClick={() => handleCategoryClick("all")}>전체</button>
                    <button className={active === "carbohydrate" ? "carbo btn_clicked" : "carbohydrate"} type="button" onClick={() => handleCategoryClick("carbohydrate")}>탄수화물</button>
                    <button className={active === "vegetable" ? "vege btn_clicked" : "vegetable"} type="button" onClick={() => handleCategoryClick("vegetable")}>채소</button>
                    <button className={active === "meat" ? "meat btn_clicked" : "meat"} type="button" onClick={() => handleCategoryClick("meat")}>육류</button>
                    <button className={active === "seaweed" ? "seaweed btn_clicked" : "seaweed"} type="button" onClick={() => handleCategoryClick("seaweed")}>해조류</button>
                    <button className={active === "processed_meet" ? "pro-meet btn_clicked" : "processed_meet"} type="button" onClick={() => handleCategoryClick("processed_meet")}>가공육류</button>
                    <button className={active === "processed_food" ? "pro-food btn_clicked" : "processed_food"} type="button" onClick={() => handleCategoryClick("processed_food")}>가공식품</button>
                </div>
            </div>

            <div className='content-wrap'>
                <h2 className='title'>제품 리스트</h2>
                <div className='content ingredient-wrap'>
                <ul>
                    {prodData ? prodData.map((item, index) => (
                        <li key={index}>
                            <Link to={`/market/view/${item.PROD_NO}_${item.PROD_SPCS_CODE}`}> 
                                <div>
                                    <img className="product-item-img" src={`/imgs/product/${item.PROD_IMG}`}/>
                                    <p className="product-item-name">{item.PROD_NAME + ' (' + item.PROD_SPCS_NAME + ') '}</p>
                                    <p className="product-item-price">{item.PROD_AVRG_PRCE.toLocaleString()}원</p>
                                </div>
                            </Link>
                        </li>
                    )) : ''}
                </ul>
                    <button className="more-product-btn" onClick={moreProductBtn}>더 보기</button>
                </div>
            </div>
        </div>
    );
};

export default MarketList;