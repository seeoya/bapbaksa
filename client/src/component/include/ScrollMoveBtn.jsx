import React from 'react';

const ScrollMoveBtn = () => {

    const toTopMoveEvent = () => {
        window.scrollTo(0, 0);
    }
    const toBottomMoveEvent = () => {
        window.scrollTo(0, document.body.scrollHeight);
    }

    return (
        <div className="addition-btn-wrap">
            <button type="button" id="to_top" className="btn highlight" onClick={toTopMoveEvent}><i className="fa-solid fa-up-long"></i></button>
            <button type="button" id="to_bottom" className="btn highlight" onClick={toBottomMoveEvent}><i className="fa-solid fa-down-long"></i></button>
        </div>
    );
};

export default ScrollMoveBtn;