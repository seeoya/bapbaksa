import React, { useState } from 'react';
import DaumPostcode from 'react-daum-postcode';

const PostCode = (props) => {
const [zodecode, setZonecode] = useState('');
const [address, setAddress] = useState('');
const [isOpen, setIsOpen] = useState(false);
const [detailedAddress ,setDetailedAddress] = useState('');

const themeObj = {
    bgColor: '#FFFFFF', 
    pageBgColor: '#FFFFFF', 
    postcodeTextColor: '#C05850',
    emphTextColor: '#222222',
};

const postCodeStyle = {
    width: '400px',
    height: '480px',
};

const completeHandler = (data) => {
    const { address, zonecode } = data;
    setZonecode(zonecode);
    setAddress(address);
};

const closeHandler = (state) => {
    if (state === 'FORCE_CLOSE') {
    setIsOpen(false);
    } else if (state === 'COMPLETE_CLOSE') {
    setIsOpen(false);
    }
};

const toggleHandler = () => {
    setIsOpen((prevOpenState) => !prevOpenState);
};

const inputChangeHandler = (event) => {
    setDetailedAddress(event.target.value);
};

return (
    <div>
        <div>
            <strong>주소</strong>
        </div>
        <div>
            <div>
            <div>{zodecode}</div>
            <button
                type="button"
                onClick={toggleHandler}
            >
                주소 찾기
            </button>
            </div>
            {isOpen && (
            <div>
                <DaumPostcode
                theme={themeObj}
                style={postCodeStyle}
                onComplete={completeHandler}
                onClose={closeHandler}
                />
            </div>
            )}
            <div>{address}</div>
            <input
            value={detailedAddress}
            onChange={inputChangeHandler}
            placeholder='상세 주소'
            />
        </div>
    </div>
);
};

export default PostCode;