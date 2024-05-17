import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { loadMyFridgeAction } from '../../redux/actions/fridge_action';
import { getToken } from '../../storage/loginedToken';

const RecipeAside = () => {
    const dispatch = useDispatch();

    const allFridgeList = useSelector((state) => state.fridge.allFridge);
    const myFridgeList = useSelector((state) => state.fridge.myFridge);

    const [windowX, setWindowX] = useState(0);
    const [windowY, setWindowY] = useState(200);
    const [startX, setStartX] = useState(0);
    const [startY, setStartY] = useState(0);

    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        initMyFridge();
    }, []);

    useEffect(() => {
        if (document.getElementById("recipe_aside").classList.contains("close")) {
            setIsOpen(false)
        } else {
            setIsOpen(true)
        }
    }, []);

    useEffect(() => {
        dragEvent()
    }, [windowX, windowY, startX, startY]);

    const initMyFridge = async () => {
        let uNo = getToken('loginedUNo');

        if (uNo) {
            dispatch(await loadMyFridgeAction(uNo));
        }
    }

    const fridgeBtnClickEvent = () => {
        setIsOpen(prev => !prev);
    }

    const dragEvent = () => {
        const asideWindow = document.getElementById("recipe_aside");

        asideWindow.addEventListener('mousedown', (e) => {
            e.preventDefault();
            let offsets = asideWindow.getBoundingClientRect();

            setWindowX(offsets.left);
            setWindowY(offsets.top);

            setStartX(e.clientX);
            setStartY(e.clientY);

            asideWindow.classList.add("active");
        });

        document.addEventListener('mousemove', (e) => {
            e.preventDefault();
            if (e.target.closest(".active") !== null) {
                setWindowX(windowX + (e.clientX - startX));
                setWindowY(windowY + (e.clientY - startY));
                setStartX(e.clientX);
                setStartY(e.clientY);
            }
        })

        document.addEventListener('mouseup', (e) => {
            e.preventDefault();
            asideWindow.classList.remove("active");
        })
    }

    return (
        <aside id="recipe_aside" style={{ top: `${windowY}px`, left: `${windowX}px` }} className={isOpen ? "" : "close"}>
            <div id='fridge'>
                <h2 className='title'>나의 냉장고</h2>

                <button type='button' id='fridge_btn' className='btn main' onClick={fridgeBtnClickEvent}>
                    {
                        isOpen
                            ?
                            <>
                                <FontAwesomeIcon icon="fa-solid fa-chevron-left" />
                                <span class="blind">내 냉장고 닫기</span>
                            </>
                            :
                            <>
                                <FontAwesomeIcon icon="fa-solid fa-chevron-right" />
                                <span class="blind">내 냉장고 열기</span>
                            </>
                    }
                </button>

                <div className='fridge-content'>
                    {
                        allFridgeList && myFridgeList ?
                            myFridgeList.map((el, idx) => {
                                return <button className='fridge-item' key={allFridgeList[el].RF_NO}>
                                    <div className='item-img'>
                                        <img src={"/imgs/product/" + allFridgeList[el].RF_IMG} alt={allFridgeList[el].RF_NAME} />
                                    </div>

                                    <div className='item-title'>{allFridgeList[el].RF_NAME}</div>
                                </button>
                            })
                            :
                            <div className='empty'>냉장고에 재료가 없습니다.</div>
                    }

                    <Link to={"/mypage/myFridge"} className='fridge-item link'>
                        <div className='item-img'>
                            <FontAwesomeIcon icon="fa-solid fa-square-up-right" />
                        </div>

                        <div className='item-title'>내 냉장고로</div>
                    </Link>

                </div>
            </div>
        </aside>
    );
};

export default RecipeAside;