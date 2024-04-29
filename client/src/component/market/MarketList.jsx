import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const MarketList = () => {

    const [filterCategory, setFilterCategory] = useState([]);
    const [active, setActive] = useState("");
    
    useEffect(() => {
        handleCategoryClick("all");
    }, [])
    
    const handleCategoryClick = (category_name) => {
        
        console.log('category click');
        
        const filterIngredient = ingredients.filter(item => {
            let itemCategory = '';
            switch (category_name) {
                case "all" :
                    itemCategory = item.PROD_CODE >= 0 && item.PROD_CODE < 1000;
                    break;
                case "carbohydrate":
                    console.log('탄수화물 클릭');
                    itemCategory = item.PROD_CODE >= 100 && item.PROD_CODE < 200;
                    break;
                case "vegetable":
                    console.log('채소 클릭');
                    itemCategory = item.PROD_CODE >= 200 && item.PROD_CODE < 400;
                    break;
                case "meat":
                    console.log('육류 클릭');
                    itemCategory = item.PROD_CODE >= 400 && item.PROD_CODE < 500;
                    break;
                case "seaweed":
                    console.log('해조류 클릭');
                    itemCategory = item.PROD_CODE >= 500 && item.PROD_CODE < 600;
                    break;
                case "processed_meet":
                    console.log('가공육류 클릭');
                    itemCategory = item.PROD_CODE >= 600 && item.PROD_CODE < 700;
                    break;
                case "processed_food":
                    console.log('가공식품 클릭');
                    itemCategory = item.PROD_CODE >= 700 && item.PROD_CODE < 800;
                    break;
                default:
                    itemCategory = true;
                    break;
            }
            setActive(category_name);
            return itemCategory;
        });
        setFilterCategory(filterIngredient);
    };


    let ingredient = {
        PRCE_NO: 11,
        PRCE_YMD: 20240308,
        PROD_CODE: 142,
        PROD_NAME: '탄수화물 방울토마토',
        SPCS_CODE: 0,
        SPCS_NAME: '방울토마토(국산)',
        AVRG_PRCE: 8924,
        GRAD_CODE: 4,
        GRAD_NM: '상품',
        DSBN_STEP_ACTO_UNIT_NM: 'g',
        DSBN_STEP_ACTO_WT: 500,
        TDY_LWET_PRCE: 10800,
        TDY_MAX_PRCE: 9950,
    }

    let ingredient2 = {
        PRCE_NO: 5,
        PRCE_YMD: 20240308,
        PROD_CODE: 152,
        PROD_NAME: '탄수화물 상추',
        SPCS_CODE: 0,
        SPCS_NAME: '적상추(국산)',
        AVRG_PRCE: 300,
        GRAD_CODE: 4,
        GRAD_NM: '상품',
        DSBN_STEP_ACTO_UNIT_NM: 'g',
        DSBN_STEP_ACTO_WT: 500,
        TDY_LWET_PRCE: 10800,
        TDY_MAX_PRCE: 9950,
    }

    let ingredient3 = {
        PRCE_NO: 5,
        PRCE_YMD: 20240308,
        PROD_CODE: 202,
        PROD_NAME: '채소 상추',
        SPCS_CODE: 0,
        SPCS_NAME: '적상추(국산)',
        AVRG_PRCE: 300,
        GRAD_CODE: 4,
        GRAD_NM: '상품',
        DSBN_STEP_ACTO_UNIT_NM: 'g',
        DSBN_STEP_ACTO_WT: 500,
        TDY_LWET_PRCE: 10800,
        TDY_MAX_PRCE: 9950,
    }

    let ingredient4 = {
        PRCE_NO: 5,
        PRCE_YMD: 20240308,
        PROD_CODE: 302,
        PROD_NAME: '채소 상추',
        SPCS_CODE: 0,
        SPCS_NAME: '적상추(국산)',
        AVRG_PRCE: 300,
        GRAD_CODE: 4,
        GRAD_NM: '상품',
        DSBN_STEP_ACTO_UNIT_NM: 'g',
        DSBN_STEP_ACTO_WT: 500,
        TDY_LWET_PRCE: 10800,
        TDY_MAX_PRCE: 9950,
    }

    let ingredient5 = {
        PRCE_NO: 5,
        PRCE_YMD: 20240308,
        PROD_CODE: 402,
        PROD_NAME: '육류 상추',
        SPCS_CODE: 0,
        SPCS_NAME: '적상추(국산)',
        AVRG_PRCE: 300,
        GRAD_CODE: 4,
        GRAD_NM: '상품',
        DSBN_STEP_ACTO_UNIT_NM: 'g',
        DSBN_STEP_ACTO_WT: 500,
        TDY_LWET_PRCE: 10800,
        TDY_MAX_PRCE: 9950,
    }

    let ingredient6 = {
        PRCE_NO: 5,
        PRCE_YMD: 20240308,
        PROD_CODE: 502,
        PROD_NAME: '해조류 상추',
        SPCS_CODE: 0,
        SPCS_NAME: '적상추(국산)',
        AVRG_PRCE: 300,
        GRAD_CODE: 4,
        GRAD_NM: '상품',
        DSBN_STEP_ACTO_UNIT_NM: 'g',
        DSBN_STEP_ACTO_WT: 500,
        TDY_LWET_PRCE: 10800,
        TDY_MAX_PRCE: 9950,
    }
    let ingredient7 = {
        PRCE_NO: 5,
        PRCE_YMD: 20240308,
        PROD_CODE: 601,
        PROD_NAME: '가공육류 상추',
        SPCS_CODE: 0,
        SPCS_NAME: '적상추(국산)',
        AVRG_PRCE: 300,
        GRAD_CODE: 4,
        GRAD_NM: '상품',
        DSBN_STEP_ACTO_UNIT_NM: 'g',
        DSBN_STEP_ACTO_WT: 500,
        TDY_LWET_PRCE: 10800,
        TDY_MAX_PRCE: 9950,
    }
    let ingredient8 = {
        PRCE_NO: 5,
        PRCE_YMD: 20240308,
        PROD_CODE: 701,
        PROD_NAME: '가공식품 상추',
        SPCS_CODE: 0,
        SPCS_NAME: '적상추(국산)',
        AVRG_PRCE: 300,
        GRAD_CODE: 4,
        GRAD_NM: '상품',
        DSBN_STEP_ACTO_UNIT_NM: 'g',
        DSBN_STEP_ACTO_WT: 500,
        TDY_LWET_PRCE: 10800,
        TDY_MAX_PRCE: 9950,
    }

    let ingredients = [];
    ingredients.push(ingredient,ingredient2,ingredient3,ingredient4,ingredient5,ingredient6,ingredient7,ingredient8);


    
    return (
        <div id="market_list">
            <div className="ingredient-category">
                <button className={active === "all" ? "btn_clicked" : ""} type="button" onClick={() => handleCategoryClick("all")}>전체</button>
                <button className={active === "carbohydrate" ? "btn_clicked" : "" } type="button" onClick={() => handleCategoryClick("carbohydrate")}>탄수화물</button>
                <button className={active === "vegetable" ? "btn_clicked" : "" } type="button" onClick={() => handleCategoryClick("vegetable")}>채소</button>
                <button className={active === "meat" ? "btn_clicked" : "" } type="button" onClick={() => handleCategoryClick("meat")}>육류</button>
                <button className={active === "seaweed" ? "btn_clicked" : "" } type="button" onClick={() => handleCategoryClick("seaweed")}>해조류</button>
                <button className={active === "processed_meet" ? "btn_clicked" : ""} type="button" onClick={() => handleCategoryClick("processed_meet")}>가공육류</button>
                <button className={active === "processed_food" ? "btn_clicked" : ""} type="button" onClick={() => handleCategoryClick("processed_food")}>가공식품</button>
            </div>
            <div className='content-wrap'>
                <h2 className='title'>제품 리스트</h2>
                <div className='content ingredient-wrap'>
                <ul>
                        {filterCategory.map((item, index) => (
                            <li key={index}>
                                <Link to={`/market/view/${item.PRCE_NO}`}>
                                    <div>
                                        {/* <img className="ingredient-img" src={`/img/${item.PROD_NAME}.jpg`} alt="ingredient" /> */}
                                        <img className="ingredient-img" src={`/img/상추.jpg`} alt="ingredient" />
                                        <p>{item.PROD_NAME}</p>
                                        <p>{item.AVRG_PRCE.toLocaleString()}원</p>
                                    </div>
                                </Link>
                            </li>
                        ))}
                </ul>
                    <button>더 보기</button>
                </div>
            </div>
            </div>
    );
};

export default MarketList;
