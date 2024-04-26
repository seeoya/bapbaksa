import React from "react";
import { Link } from "react-router-dom";

const Error = () => {
    return (
        <div id="error" className="content-wrap">
            <div className="content">
                <h2 className="title">존재하지 않는 페이지입니다.</h2>

                <div className="error-content">
                    <p>다시 확인해주세요!</p>

                    <Link to="/" className="btn main full">메인으로</Link>
                    <Link to="/member/login_form" className="btn sub full">로그인</Link>
                </div>

            </div>
        </div>
    );
};

export default Error;