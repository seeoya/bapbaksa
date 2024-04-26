import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
    return (<footer>
        <div className="info_footer">
            <ul className="info_li">
                <li><Link to="#">회사소개</Link></li>                
                <li><Link to="#">이용약관</Link></li>
                <li><Link to="#">개인정보처리방침</Link></li>
                <li><Link to="#">전자우편무단수집거부</Link></li>
                <li><Link to="#">대량주문안내</Link></li>
                <li><Link to="#">인재채용</Link></li>                
                <li><Link to="/admin">관리자 모드</Link></li>
            </ul>

            <div className="info_txt">
                <h5>상호:BABBAKSA</h5>
                <h5>주소:경기도 의정부시 시민로 80 센트럴타워 6층</h5>                                
                <h5>사업자등록번호 : 300-86-00428</h5>
                <h5>통신판매업신고번호 : 제2024-의정부-0425호</h5>                
            </div>
            <div>
                    <h4>@Copyright. 밥박사 All right reserved.</h4>
            </div>
        </div>

        <div className="join_footer">
            <ul className="_img">
                <li className="festamp_logo">
                    <Link to="/" className="link">
                        <img src="./imgs/logo/blackstamp.jpg" alt="메인으로" />
                    </Link>
                </li>

                <li>
                    <Link to="https://www.price.go.kr/tprice/portal/main/main.do" target="_blank" className="link">
                        <img src="./imgs/logo/kadx_logo.png" alt="농식품 빅데이터 거래소" />
                    </Link>
                </li>

                <li>
                    <Link to="https://knto.or.kr/index" target="_blank" className="link">
                        <img src="./imgs/logo/logo2.png" alt="한국소비자원 참가격" />
                    </Link>
                </li>

            </ul>

            <div class="util_footer">
                <div class="btn_footer">
                    <Link to="#none" class="btn sub">고객센터 : 050-240428-1966</Link>
                    <Link to="#none" class="btn sub">1:1 문의</Link>
                </div>
            </div>
        </div>
    </footer>


    );
};

export default Footer;
