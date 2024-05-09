import React from 'react';

const ScrollMoveBtn = () => {

    const toTopMoveEvent = () => {
        window.scrollTo(0, 0);
    }
    const toBottomMoveEvent = () => {
        window.scrollTo(0, document.body.scrollHeight);
    }

    return (
        <div class="addition-btn-wrap">
            <button type="button" id="to_top" class="btn highlight" onClick={toTopMoveEvent}><i class="fa-solid fa-up-long"></i></button>
            <button type="button" id="to_bottom" class="btn highlight" onClick={toBottomMoveEvent}><i class="fa-solid fa-down-long"></i></button>
        </div>
    );
};

export default ScrollMoveBtn;