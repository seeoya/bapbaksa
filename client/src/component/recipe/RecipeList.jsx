import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const RecipeList = () => {

    const [ingreList, setIngreList] = useState({});
    const [fridgeIngreList, setFridgeIngreList] = useState([]);
    const [notFridgeIngreList, setNotFridgeIngreList] = useState([]);
    const [activeIngreList, setActiveIngreList] = useState([]);

    const [cateList, setCateList] = useState(["한식", "중식", "일식"]);
    const [activeCateList, setActiveCateList] = useState([]);


    const [recipeBasicList, setRecipeBasicList] = useState([
    ]);

    useEffect(() => {
        initIngreList();
        initRecipeList();
    }, []);

    useEffect(() => {
        sortIngreList();
    }, [activeIngreList]);

    useEffect(() => {
        filterIngre();
    }, [ingreList]);


    const initIngreList = () => {
        console.log("init ingre")
        // #TODO axios 자리. ingre 리스트
        let dummyIngreList = {
            111: {
                RF_NO: 111,
                RF_NAME: "쌀"
            },
            112: {
                RF_NO: 112,
                RF_NAME: "찹쌀"
            },
            141: {
                RF_NO: 141,
                RF_NAME: "콩"
            },
            142: {
                RF_NO: 142,
                RF_NAME: "팥"
            },
            143: {
                RF_NO: 143,
                RF_NAME: "녹두"
            },
            151: {
                RF_NO: 151,
                RF_NAME: "고구마"
            },
            152: {
                RF_NO: 152,
                RF_NAME: "감자"
            },
            211: {
                RF_NO: 211,
                RF_NAME: "배추"
            },
            212: {
                RF_NO: 212,
                RF_NAME: "양배추"
            },
            213: {
                RF_NO: 213,
                RF_NAME: "시금치"
            },
            214: {
                RF_NO: 214,
                RF_NAME: "상추"
            },
            215: {
                RF_NO: 215,
                RF_NAME: "얼갈이배추"
            },
            216: {
                RF_NO: 216,
                RF_NAME: "갓"
            },
            221: {
                RF_NO: 221,
                RF_NAME: "수박"
            },
            223: {
                RF_NO: 223,
                RF_NAME: "오이"
            },
            224: {
                RF_NO: 224,
                RF_NAME: "애호박"
            },
            225: {
                RF_NO: 225,
                RF_NAME: "토마토"
            },
            226: {
                RF_NO: 226,
                RF_NAME: "딸기"
            },
            231: {
                RF_NO: 231,
                RF_NAME: "무"
            },
            232: {
                RF_NO: 232,
                RF_NAME: "당근"
            },
            233: {
                RF_NO: 233,
                RF_NAME: "열무"
            },
            241: {
                RF_NO: 241,
                RF_NAME: "건고추"
            },
            242: {
                RF_NO: 242,
                RF_NAME: "풋고추"
            },
            243: {
                RF_NO: 243,
                RF_NAME: "꽈리고추"
            },
            245: {
                RF_NO: 245,
                RF_NAME: "청양고추"
            },
            246: {
                RF_NO: 246,
                RF_NAME: "오이맛고추"
            },
            247: {
                RF_NO: 247,
                RF_NAME: "양파"
            },
            248: {
                RF_NO: 248,
                RF_NAME: "대파"
            },
            252: {
                RF_NO: 252,
                RF_NAME: "쪽파"
            },
            253: {
                RF_NO: 253,
                RF_NAME: "생강"
            }
        };

        setIngreList(dummyIngreList);

        // #TODO axios 자리, 냉장고 보유 재료 NO
        setFridgeIngreList([111, 212, 213, 221, 253]);
        setActiveIngreList([]);
    }

    const initRecipeList = () => {
        let dummyRecipeList = {
            1: {
                "RECP_CODE": 1,
                "RECP_NAME": "나물비빔밥",
                "RECP_INTRO": "육수로 지은 밥에 야채를 듬뿍 넣은 영양만점 나물비빔밥!",
                "RECP_REGION_CODE": 3020001,
                "RECP_REGION_NAME": "한식",
                "RECP_CATEGORY_CODE": 3010001,
                "RECP_CATEGORY_NAME": "밥",
                "RECP_TIME": "60분",
                "RECP_KCAL": "580Kcal",
                "RECP_SERVIN": "4인분",
                "RECP_DIFFICULT": "보통",
                "RECP_MAIN_IMG": "http://file.okdab.com/UserFiles/searching/recipe/000200.jpg"
            },
            2: {
                "RECP_CODE": 2,
                "RECP_NAME": "오곡밥",
                "RECP_INTRO": "정월대보름에 먹던 오곡밥! 영양을 한그릇에 담았습니다.",
                "RECP_REGION_CODE": 3020001,
                "RECP_REGION_NAME": "한식",
                "RECP_CATEGORY_CODE": 3010001,
                "RECP_CATEGORY_NAME": "밥",
                "RECP_TIME": "60분",
                "RECP_KCAL": "338Kcal",
                "RECP_SERVIN": "4인분",
                "RECP_DIFFICULT": "보통",
                "RECP_MAIN_IMG": "http://file.okdab.com/UserFiles/searching/recipe/000300.jpg"
            },
            3: {
                "RECP_CODE": 3,
                "RECP_NAME": "잡채밥",
                "RECP_INTRO": "잡채밥 한 그릇이면 오늘 저녁 끝! 입 맛 없을 때 먹으면 그만이지요~",
                "RECP_REGION_CODE": 3020004,
                "RECP_REGION_NAME": "중국",
                "RECP_CATEGORY_CODE": 3010001,
                "RECP_CATEGORY_NAME": "밥",
                "RECP_TIME": "30분",
                "RECP_KCAL": "520Kcal",
                "RECP_SERVIN": "4인분",
                "RECP_DIFFICULT": "보통",
                "RECP_MAIN_IMG": "http://file.okdab.com/UserFiles/searching/recipe/000400.jpg"
            },
            4: {
                "RECP_CODE": 4,
                "RECP_NAME": "콩나물밥",
                "RECP_INTRO": "다이어트에 으뜸인 콩나물밥. 밥 물 넣을때 평소보다 적게 넣는거 잊지마세요!",
                "RECP_REGION_CODE": 3020001,
                "RECP_REGION_NAME": "한식",
                "RECP_CATEGORY_CODE": 3010001,
                "RECP_CATEGORY_NAME": "밥",
                "RECP_TIME": "40분",
                "RECP_KCAL": "401Kcal",
                "RECP_SERVIN": "4인분",
                "RECP_DIFFICULT": "초보환영",
                "RECP_MAIN_IMG": "http://file.okdab.com/UserFiles/searching/recipe/000600.jpg"
            },
            5: {
                "RECP_CODE": 5,
                "RECP_NAME": "약식",
                "RECP_INTRO": "집에서도 쉽게 만들어 맛있게 먹을 수 있답니다. 어려워 마시고 만들어 보세요~!",
                "RECP_REGION_CODE": 3020001,
                "RECP_REGION_NAME": "한식",
                "RECP_CATEGORY_CODE": 3010013,
                "RECP_CATEGORY_NAME": "떡/한과",
                "RECP_TIME": "60분",
                "RECP_KCAL": "259Kcal",
                "RECP_SERVIN": "4인분",
                "RECP_DIFFICULT": "보통",
                "RECP_MAIN_IMG": "http://file.okdab.com/UserFiles/searching/recipe/000800.jpg"
            },
            6: {
                "RECP_CODE": 6,
                "RECP_NAME": "호박죽",
                "RECP_INTRO": "호박죽 한 그릇이면 하루가 든든하답니다.",
                "RECP_REGION_CODE": 3020001,
                "RECP_REGION_NAME": "한식",
                "RECP_CATEGORY_CODE": 3010001,
                "RECP_CATEGORY_NAME": "밥",
                "RECP_TIME": "30분",
                "RECP_KCAL": "115Kcal",
                "RECP_SERVIN": "4인분",
                "RECP_DIFFICULT": "보통",
                "RECP_MAIN_IMG": "http://file.okdab.com/UserFiles/searching/recipe/001300.jpg"
            },
            7: {
                "RECP_CODE": 7,
                "RECP_NAME": "흑임자죽",
                "RECP_INTRO": "검은깨를 갈아서 만든 고소함이 가득한 흑임자죽. 남녀노소 모두 사랑하는 맛!",
                "RECP_REGION_CODE": 3020001,
                "RECP_REGION_NAME": "한식",
                "RECP_CATEGORY_CODE": 3010001,
                "RECP_CATEGORY_NAME": "밥",
                "RECP_TIME": "25분",
                "RECP_KCAL": "450Kcal",
                "RECP_SERVIN": "4인분",
                "RECP_DIFFICULT": "보통",
                "RECP_MAIN_IMG": "http://file.okdab.com/UserFiles/searching/recipe/001400.jpg"
            },
            8: {
                "RECP_CODE": 8,
                "RECP_NAME": "카레라이스",
                "RECP_INTRO": "향긋한 카레향이 너무 좋지요. 누구나 좋아하는 만들기도 간편한 음식입니다.",
                "RECP_REGION_CODE": 3020005,
                "RECP_REGION_NAME": "동남아시아",
                "RECP_CATEGORY_CODE": 3010001,
                "RECP_CATEGORY_NAME": "밥",
                "RECP_TIME": "30분",
                "RECP_KCAL": "650Kcal",
                "RECP_SERVIN": "4인분",
                "RECP_DIFFICULT": "초보환영",
                "RECP_MAIN_IMG": "http://file.okdab.com/UserFiles/searching/recipe/001600.jpg"
            },
            9: {
                "RECP_CODE": 9,
                "RECP_NAME": "오므라이스",
                "RECP_INTRO": "각종 채소를 계란 속에 꼭꼭 숨겨 편식하는 아이들도 맛있게 먹어요~",
                "RECP_REGION_CODE": 3020002,
                "RECP_REGION_NAME": "서양",
                "RECP_CATEGORY_CODE": 3010001,
                "RECP_CATEGORY_NAME": "밥",
                "RECP_TIME": "30분",
                "RECP_KCAL": "630Kcal",
                "RECP_SERVIN": "4인분",
                "RECP_DIFFICULT": "초보환영",
                "RECP_MAIN_IMG": "http://file.okdab.com/UserFiles/searching/recipe/001800.jpg"
            },
            10: {
                "RECP_CODE": 10,
                "RECP_NAME": "감자수제비",
                "RECP_INTRO": "쫀득쫀득한 수제비와 담백한 맛의 감자가 이뤄내는 하모니!",
                "RECP_REGION_CODE": 3020001,
                "RECP_REGION_NAME": "한식",
                "RECP_CATEGORY_CODE": 3010016,
                "RECP_CATEGORY_NAME": "만두/면류",
                "RECP_TIME": "60분",
                "RECP_KCAL": "410Kcal",
                "RECP_SERVIN": "4인분",
                "RECP_DIFFICULT": "초보환영",
                "RECP_MAIN_IMG": "http://file.okdab.com/UserFiles/searching/recipe/001900.jpg"
            },
            11: {
                "RECP_CODE": 11,
                "RECP_NAME": "냉면",
                "RECP_INTRO": "더운 여름, 살얼음 동동 띄운 시원한 냉면 한그릇 생각나시죠~",
                "RECP_REGION_CODE": 3020001,
                "RECP_REGION_NAME": "한식",
                "RECP_CATEGORY_CODE": 3010016,
                "RECP_CATEGORY_NAME": "만두/면류",
                "RECP_TIME": "50분",
                "RECP_KCAL": "630Kcal",
                "RECP_SERVIN": "4인분",
                "RECP_DIFFICULT": "보통",
                "RECP_MAIN_IMG": "http://file.okdab.com/UserFiles/searching/recipe/002100.jpg"
            },
            12: {
                "RECP_CODE": 12,
                "RECP_NAME": "동치미막국수",
                "RECP_INTRO": "시원한 동치미에 쫄깃한 국수를 말아서 만들어보세요.",
                "RECP_REGION_CODE": 3020001,
                "RECP_REGION_NAME": "한식",
                "RECP_CATEGORY_CODE": 3010016,
                "RECP_CATEGORY_NAME": "만두/면류",
                "RECP_TIME": "30분",
                "RECP_KCAL": "400Kcal",
                "RECP_SERVIN": "4인분",
                "RECP_DIFFICULT": "보통",
                "RECP_MAIN_IMG": "http://file.okdab.com/UserFiles/searching/recipe/002400.jpg"
            },
            13: {
                "RECP_CODE": 13,
                "RECP_NAME": "열무김치냉면",
                "RECP_INTRO": "맛있게 담근 열무김치에 냉면을 말아 먹어 보세요~ 새콤달콤 끝내줍니다!",
                "RECP_REGION_CODE": 3020001,
                "RECP_REGION_NAME": "한식",
                "RECP_CATEGORY_CODE": 3010016,
                "RECP_CATEGORY_NAME": "만두/면류",
                "RECP_TIME": "25분",
                "RECP_KCAL": "625Kcal",
                "RECP_SERVIN": "4인분",
                "RECP_DIFFICULT": "보통",
                "RECP_MAIN_IMG": "http://file.okdab.com/UserFiles/searching/recipe/002800.jpg"
            },
            14: {
                "RECP_CODE": 14,
                "RECP_NAME": "채소국수",
                "RECP_INTRO": "갖가지 야채를 듬뿍 넣어서 만든 요리로 출출할 때 간식거리로 아주 좋답니다.",
                "RECP_REGION_CODE": 3020001,
                "RECP_REGION_NAME": "한식",
                "RECP_CATEGORY_CODE": 3010016,
                "RECP_CATEGORY_NAME": "만두/면류",
                "RECP_TIME": "30분",
                "RECP_KCAL": "460Kcal",
                "RECP_SERVIN": "2인분",
                "RECP_DIFFICULT": "초보환영",
                "RECP_MAIN_IMG": "http://file.okdab.com/UserFiles/searching/recipe/002900.jpg"
            },
            15: {
                "RECP_CODE": 15,
                "RECP_NAME": "해물국수",
                "RECP_INTRO": "해물로 시원한 국물에 국수를 말아 드셔보세요~",
                "RECP_REGION_CODE": 3020001,
                "RECP_REGION_NAME": "한식",
                "RECP_CATEGORY_CODE": 3010016,
                "RECP_CATEGORY_NAME": "만두/면류",
                "RECP_TIME": "40분",
                "RECP_KCAL": "530Kcal",
                "RECP_SERVIN": "4인분",
                "RECP_DIFFICULT": "보통",
                "RECP_MAIN_IMG": "http://file.okdab.com/UserFiles/searching/recipe/003000.jpg"
            }
        };

        setRecipeBasicList(dummyRecipeList);
    }

    const sortIngreList = () => {
        let finalList = [];
        let notActiveList = [];
        let activeList = [];

        let lists = [[fridgeIngreList, setFridgeIngreList], [notFridgeIngreList, setNotFridgeIngreList]];

        lists.map(list => {
            if (list[0].length > 0) {
                finalList = [];
                notActiveList = [];
                activeList = [];

                list[0].map((el) => {
                    if (activeIngreList.includes(el)) {
                        activeList.push(el);
                    } else {
                        notActiveList.push(el);
                    }
                })

                activeList.sort((a, b) => {
                    return ingreList[a].RF_NAME > ingreList[b].RF_NAME ? 1 : ingreList[a].RF_NAME < ingreList[b].RF_NAME ? -1 : 0;
                });
                notActiveList.sort((a, b) => {
                    return ingreList[a].RF_NAME > ingreList[b].RF_NAME ? 1 : ingreList[a].RF_NAME < ingreList[b].RF_NAME ? -1 : 0;
                });

                finalList = [...activeList, ...notActiveList];
                list[1](finalList);
            }
        })
    }

    const ingreBtnClickEvent = async (e) => {
        let item = e.target;

        if (item.classList.contains("on")) {
            let list = activeIngreList.filter((el) => {
                return el !== parseInt(item.dataset.idx)
            });

            setActiveIngreList(list);
        } else {
            setActiveIngreList([...activeIngreList, parseInt(item.dataset.idx)]);
        }
    }

    const filterIngre = () => {
        let tmp = [];

        Object.keys(ingreList).map((el) => {
            if (!fridgeIngreList.includes(parseInt(el))) {
                tmp.push(parseInt(el));
            }
        });

        setNotFridgeIngreList(tmp);
    }

    const cateBtnClickEvent = (e) => {
        // 아직 미작업
        let item = e.target;

        if (item.classList.contains("on")) {
            let list = activeCateList.filter((el) => {
                return el !== parseInt(item.dataset.idx)
            });

            setActiveCateList(list);
        } else {
            setActiveCateList([...activeCateList, parseInt(item.dataset.idx)]);
        }
    }

    return (
        <>
            <h2 className='title'>레시피 목록</h2>

            <div className='content'>

                <div className='recipe-filter'>
                    <div>내 냉장고 재료</div>
                    <div className='filter-wrap fridge-ingre'>
                        {fridgeIngreList.map((el, idx) => {
                            return <button type='button' data-idx={ingreList[el].RF_NO} className={activeIngreList.includes(ingreList[el].RF_NO) ? "btn ingre on" : "btn ingre"} onClick={(e) => ingreBtnClickEvent(e)} key={idx}>{ingreList[el].RF_NAME}</button>
                        })}
                    </div>

                    <div>추가 재료</div>
                    <div className='filter-wrap ingre'>
                        {notFridgeIngreList.map((el, idx) => {
                            return <button type='button' data-idx={ingreList[el].RF_NO} className={activeIngreList.includes(ingreList[el].RF_NO) ? "btn ingre on" : "btn ingre"} onClick={(e) => ingreBtnClickEvent(e)} key={idx}>{ingreList[el].RF_NAME}</button>
                        })}
                    </div>

                    <div>카테고리</div>
                    <div className='filter-wrap cate'>
                        {cateList.map((el, idx) => {
                            return <button type='button' data-idx={el} className={'btn cate'} onClick={(e) => cateBtnClickEvent(e)} key={idx}>{el}</button>
                        })}
                    </div>
                </div>

                <div className='recipe-list'>
                    {
                        Object.keys(recipeBasicList).map((el) => {
                            return <Link to={"/recipe/view/" + el} className='recipe-item'>
                                <div className='recipe-info'>
                                    <div>{recipeBasicList[el].RECP_CODE}</div>
                                    <img src={recipeBasicList[el].RECP_MAIN_IMG} alt={recipeBasicList[el].RECP_NAME} />
                                    <div className='recipe-name'>{recipeBasicList[el].RECP_NAME}</div>

                                    <div className='recipe-sub-info'>
                                        <div className='recipe-third-info'>
                                            <span>
                                                {recipeBasicList[el].RECP_REGION_NAME}
                                            </span>
                                            <span>
                                                {recipeBasicList[el].RECP_CATEGORY_NAME}
                                            </span>
                                            <span>
                                                {recipeBasicList[el].RECP_KCAL}
                                            </span>
                                            <span>
                                                {recipeBasicList[el].RECP_SERVIN}
                                            </span>
                                        </div>
                                        <div>{recipeBasicList[el].RECP_TIME}/{recipeBasicList[el].RECP_DIFFICULT} 난이도</div>
                                        <div className='recipe-intro'>{recipeBasicList[el].RECP_INTRO}</div>
                                    </div>
                                </div>
                            </Link>
                        })
                    }


                </div>

            </div>
        </>
    );
};

export default RecipeList;