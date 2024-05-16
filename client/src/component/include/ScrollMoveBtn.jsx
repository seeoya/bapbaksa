import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
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
            <button type="button" id="to_top" class="btn highlight" onClick={toTopMoveEvent}><FontAwesomeIcon icon="fa-solid fa-up-long" /><span className='blind'>맨 위로</span></button>
            <button type="button" id="to_bottom" class="btn highlight" onClick={toBottomMoveEvent}><FontAwesomeIcon icon="fa-solid fa-down-long" /><span className='blind'>맨 밑으로</span></button>
        </div>
    );
};

export default ScrollMoveBtn;