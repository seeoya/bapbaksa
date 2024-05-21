import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { AllProductQuery, NewProductQuery } from "../../query/productQuerys";
import { useDispatch, useSelector } from "react-redux";
import { setTitle } from "../../util/setTitle";
import { searchMarket } from "../../redux/actions/market";

const MarketList = () => {
    const { data: allProductList, isLoading: allProductIsLoading, isError: allProductIsError } = AllProductQuery();
    const { data: newProductList, isLoading: newProductIsLoading, isError: newProductIsError } = NewProductQuery();
    const [active, setActive] = useState("all");
    const [viewNumber, setViewNumber] = useState(12);
    const [filteredList, setFilteredList] = useState([]);
    const [displayedList, setDisplayedList] = useState([]);
    const marketSearch = useSelector((state) => state.market.search);

    const location = useLocation();
    const dispatch = useDispatch();

    useEffect(() => {
        if (location.state && location.state.searchVal) {
            dispatch(searchMarket(location.state.searchVal));
            document.getElementById("market_search").value = location.state.searchVal;
        } else {
            dispatch(searchMarket(''));
        }
    }, [location]);

    useEffect(() => {
        setTitle("제품 리스트");
    }, []);

    useEffect(() => {
        if (filteredList && viewNumber) {
            setDisplayedList(filteredList.slice(0, viewNumber));
        }
    }, [filteredList, viewNumber]);

    useEffect(() => {
        if (newProductList) {
            initList();
        }
    }, [newProductList, marketSearch, active]);

    const moreProductBtn = () => {
        setViewNumber((prev) => prev + 12);
    };

    const handleCategoryClick = (category_name) => {
        setActive(category_name);
    };

    const initList = () => {
        let tmp = filterList();
        setFilteredList(tmp);
    }

    const filterList = () => {
        let tmp = [];

        tmp = newProductList.filter((item) => {
            // 검색어 기반 필터링
            if (marketSearch && item.PROD_NAME.indexOf(marketSearch) < 0) {
                return false;
            }

            // 카테고리 기반 필터링
            if (active !== "all") {
                switch (active) {
                    case "carbohydrate":
                        if (item.PROD_CODE < 100 || item.PROD_CODE >= 200) return false;
                        break;
                    case "vegetable":
                        if (item.PROD_CODE < 200 || item.PROD_CODE >= 400) return false;
                        break;
                    case "fruit":
                        if (item.PROD_CODE < 400 || item.PROD_CODE >= 500) return false;
                        break;
                    case "meat":
                        if (item.PROD_CODE < 500 || item.PROD_CODE >= 600) return false;
                        break;
                    case "seaweed":
                        if (item.PROD_CODE < 600 || item.PROD_CODE >= 700) return false;
                        break;
                    case "processed_meet":
                        if (item.PROD_CODE < 700 || item.PROD_CODE >= 800) return false;
                        break;
                    case "processed_food":
                        if (item.PROD_CODE < 800 || item.PROD_CODE >= 900) return false;
                        break;
                    default:
                        break;
                }
            }

            return true;
        })

        return tmp;
    }

    return (
        <div id="market_list">
            <div className="ingredient-category">
                <div className="ingredient-category-btn">
                    <button
                        className={active === "all" ? "all btn_clicked" : "all"}
                        type="button"
                        onClick={() => handleCategoryClick("all")}
                    >
                        전체
                    </button>
                    <button
                        className={active === "carbohydrate" ? "carbo btn_clicked" : "carbohydrate"}
                        type="button"
                        onClick={() => handleCategoryClick("carbohydrate")}
                    >
                        탄수화물
                    </button>
                    <button
                        className={active === "vegetable" ? "vege btn_clicked" : "vegetable"}
                        type="button"
                        onClick={() => handleCategoryClick("vegetable")}
                    >
                        채소
                    </button>
                    <button
                        className={active === "fruit" ? "fruit btn_clicked" : "fruit"}
                        type="button"
                        onClick={() => handleCategoryClick("fruit")}
                    >
                        과일
                    </button>
                    <button
                        className={active === "meat" ? "meat btn_clicked" : "meat"}
                        type="button"
                        onClick={() => handleCategoryClick("meat")}
                    >
                        육류
                    </button>
                    <button
                        className={active === "seaweed" ? "seaweed btn_clicked" : "seaweed"}
                        type="button"
                        onClick={() => handleCategoryClick("seaweed")}
                    >
                        해조류
                    </button>
                    <button
                        className={active === "processed_meet" ? "pro-meet btn_clicked" : "processed_meet"}
                        type="button"
                        onClick={() => handleCategoryClick("processed_meet")}
                    >
                        가공육류
                    </button>
                    <button
                        className={active === "processed_food" ? "pro-food btn_clicked" : "processed_food"}
                        type="button"
                        onClick={() => handleCategoryClick("processed_food")}
                    >
                        가공식품
                    </button>
                </div>
            </div>

            <div className="content-wrap">
                <h2 className="title">제품 리스트</h2>
                <div className="content ingredient-wrap">
                    <ul>
                        {displayedList?.map((item, index) => (
                            <li key={index}>
                                <Link to={`/market/view/${item.PROD_CODE}_${item.PROD_SPCS_CODE}`}>
                                    <div>
                                        <img className="product-item-img" src={`/imgs/product/${item.PROD_IMG}`} alt={item.PROD_NAME} />
                                        <p className="product-item-name">{`${item.PROD_NAME} (${item.PROD_SPCS_NAME})`}</p>
                                        <p className="product-item-price">{item.PROD_AVRG_PRCE.toLocaleString()}원</p>
                                    </div>
                                </Link>
                            </li>
                        ))}
                    </ul>
                    {filteredList?.length > viewNumber && (
                        <button className="more-product-btn" onClick={moreProductBtn}>
                            더 보기
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default MarketList;