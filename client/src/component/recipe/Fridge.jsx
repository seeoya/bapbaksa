import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Fridge = () => {

    const [fridgeList, setFridgeList] = useState([]);

    useEffect(() => {

        setList();

    }, []);

    const setList = () => {
        setFridgeList([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15])
    }

    const fridgeBtnClickEvent = () => {
        let fridgeBtn = document.getElementById("fridge_btn");
        let fridgeContent = document.querySelector(".fridge-content");
        let recipeAside = document.getElementById("recipe_aside");

        if (fridgeBtn.classList.contains("close")) {
            fridgeBtn.innerHTML = '<i class="fa-solid fa-chevron-up"></i>';
            fridgeContent.style.display = "grid";
            recipeAside.style.height = '600px';
        } else {
            fridgeBtn.innerHTML = '<i class="fa-solid fa-chevron-down"></i>';
            fridgeContent.style.display = "none";
            recipeAside.style.height = '60px';
        }

        fridgeBtn.classList.toggle("close");
    }

    return (
        <div id='fridge'>

            <Link to="/" className='btn myfridge-link'>
                <h2 className='title'>
                    나의 냉장고
                </h2>
                <i class="fa-solid fa-arrow-up-right-from-square"></i>
            </Link>



            <button type='button' id='fridge_btn' className='btn main' onClick={fridgeBtnClickEvent}><i class="fa-solid fa-chevron-up"></i></button>

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