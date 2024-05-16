import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
    return (<footer>
        <div className="footer-wrap">
            <div className="bottom_wrap">
                <div className="logo">
                    <Link to="/">
                        <img src="/imgs/logo/logo.png" alt="logo" />
                    </Link>
                </div>

                <div className="info_footer">
                    <div className="info_link">
                        <Link to="#">회사소개 | </Link>
                        <Link to="#"> 이용약관 | </Link>
                        <Link to="#"> 개인정보처리방침 | </Link>
                        <Link to="#"> 전자우편무단수집거부 | </Link>
                        <Link to="#"> 대량주문안내 | </Link>
                        <Link to="#"> 인재채용 | </Link>
                        <Link to="/admin"> 관리자 모드</Link>
                    </div>

                    <div className="info_txt">
                        <div className="name_addr">
                            <h5>상호:BABBAKSA</h5>
                            <h5>경기도 의정부시 시민로 80 센트럴타워 6층</h5>
                        </div>

                        <h5>사업자등록번호 : 300-86-00428</h5>
                        <h5>통신판매업신고번호 : 제2024-의정부-0425호</h5>

                    </div>
                    <div>
                        <h5>@Copyright. 밥박사 All right reserved.</h5>
                    </div>

                    <div className="join_footer">
                        <div className="link">
                            <Link to="/">
                                <img src="/imgs/logo/kadx_logo.png" alt="KADX 로고" />
                            </Link>
                        </div>
                        <div className="link">
                            <Link to="/">
                                <img src="/imgs/logo/logo2.jpg" alt="한국 소비자원 참 가격 로고" />
                            </Link>
                        </div>
                    </div>
                </div>

                <div className="util_footer">
                    <div className="btn_footer">
                        <Link to="#none" className="btn sub">고객센터&nbsp;:&nbsp;050-240428-1966</Link>
                        <Link to="/question" className="btn sub">1&nbsp;:&nbsp;1 문의</Link>
                    </div>
                </div>
            </div>
        </div>
    </footer>
    );
};

export default Footer;
