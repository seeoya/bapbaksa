import React from 'react';

const Fridge = () => {


    return (
        <div id='fridge'>
            <h2 className='title'>나의 냉장고</h2>

            <div className='fridge-content'>

                {
                    [1, 2, 3, 4, 5, 6, 7, 8, 9, 10,
                        1, 2, 3, 4, 5, 6, 7, 8, 9, 10,
                        1, 2, 3, 4, 5, 6, 7, 8, 9, 10,
                        1, 2, 3, 4, 5, 6, 7, 8, 9, 10,
                        1, 2, 3, 4, 5, 6, 7, 8, 9, 10,
                        1, 2, 3, 4, 5, 6, 7, 8, 9, 10,
                        1, 2, 3, 4, 5, 6, 7, 8, 9, 10,
                        1, 2, 3, 4, 5, 6, 7, 8, 9, 10,
                        1, 2, 3, 4, 5, 6, 7, 8, 9, 10,
                        1, 2, 3, 4, 5, 6, 7, 8, 9, 10,
                        1, 2, 3, 4, 5, 6, 7, 8, 9, 10,
                        1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((el) => {
                            return <button className='fridge-item'>
                                <div className='item-img'>
                                    <img src="/img/방울토마토.jpg" alt="" />
                                </div>

                                <div className='item-title'>방울토마토</div>
                            </button>
                        })
                }



            </div>
        </div>
    );
};

export default Fridge;