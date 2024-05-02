import React, { useEffect, useState } from 'react';

const Fridge = () => {

    const [fridgeList, setFridgeList] = useState([]);

    useEffect(() => {

        setList();

    }, []);

    const setList = () => {
        setFridgeList([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])
    }

    const fridgeBtnClickEvent = () => {
        let fridgeBtn = document.getElementById("fridge_btn");
        let fridgeContent = document.querySelector(".fridge-content");
        let recipeAside = document.getElementById("recipe_aside");

        if (fridgeBtn.classList.contains("close")) {
            fridgeBtn.innerText = "CLOSE";
            fridgeContent.style.display = "grid";
            recipeAside.style.height = '600px';
        } else {
            fridgeBtn.innerText = "OPEN";
            fridgeContent.style.display = "none";
            recipeAside.style.height = '80px';
        }

        fridgeBtn.classList.toggle("close");



    }

    return (
        <div id='fridge'>
            <h2 className='title'>나의 냉장고</h2>

            <div className='fridge-btn-wrap'>
                <button type='button' id='fridge_btn' onClick={fridgeBtnClickEvent}>CLOSE</button>
            </div>

            <div className='fridge-content'>
                {
                    fridgeList.map((el, idx) => {
                        return <button className='fridge-item' key={idx}>
                            <div className='item-img'>
                                <img src="/img/방울토마토.jpg" alt="" />
                            </div>

                            <div className='item-title'>방울토마토 {el}</div>
                        </button>
                    })
                }
            </div>
        </div>
    );
};

export default Fridge;