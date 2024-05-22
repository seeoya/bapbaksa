import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import $ from 'jquery';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getToken } from '../../storage/loginedToken';
import { getRefreshToken } from '../../util/refreshToken';
import { setTitle } from '../../util/setTitle';
import Loading from '../include/Loading';


axios.defaults.withCredentials = true;

const Modify = () => {

    const [uNo, setUNo] = useState(0);
    const [uId, setUId] = useState('');
    const [uPw, setUPw] = useState('');
    const [uCheckPw, setUCheckPw] = useState('');
    const [uMail, setUMail] = useState('');
    const [uPhone, setUPhone] = useState('');
    const [uProfile, setUProfile] = useState('');
    const [uProfileImg, setUProfileImg] = useState('');
    const [uZipcode, setUZipCode] = useState('');
    const [uFirstAddr, setUFirstAddr] = useState('');
    const [uSecondAddr, setUSeconAddr] = useState('');
    const [accessToken, setAccessToken] = useState('');
    const [pwFlag, setPwFlag] = useState(false);
    const [rPwFlag, setRPwFlag] = useState(false);
    const [mailFlag, setMailFlag] = useState(true);
    const [phoneFlag, setPhoneFlag] = useState(true);
    const [isProfile, setIsProfile] = useState(false);

    const [isLoading, setIsLoading] = useState(true);

    const navigate = useNavigate();

    useEffect(() => {
        let loginedUId = getToken('loginedUId');       

        if (loginedUId === null) {
            setIsLoading(false);
            alert('로그인이 필요한 서비스입니다.');
            navigate('/user/signin');    
        }

    }, [isLoading]);   

    useEffect(() => {

        setTitle('정보수정');
        setUser();
        modifyForm();

    }, [accessToken]);

    useEffect(() => {
        initModifyClick();
    }, [pwFlag, rPwFlag, mailFlag, phoneFlag]);


    const setUser = async () => {
        let loginedUId = await getToken('loginedUId');
        let token = await getToken('accessToken');
        setUId(loginedUId);
        setAccessToken(token);
    }

    const modifyForm = async () => {

        let data = {
            "u_id": uId,
        }

        await axios({
            url: process.env.REACT_APP_SERVER_URL + `/api/user/modify_form`,
            method: 'post',
            data: data,
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        })
            .then(res => {
                if (res.data !== null && res.data.message === undefined) {
                    setIsLoading(false);
                    setUNo(res.data.user.u_no);
                    setUId(res.data.user.u_id);
                    setUMail(res.data.user.u_mail);
                    setUPhone(res.data.user.u_phone);
                    setUZipCode(res.data.user.u_zip_code);
                    setUFirstAddr(res.data.user.u_first_address);
                    setUSeconAddr(res.data.user.u_second_address);
                    setUProfileImg(res.data.user.pi_name);
                    setIsProfile(true);
                }
            })
            .catch(error => {
                if (error.response.data.message !== undefined) {
                    getRefreshToken();
                }
            })
            .finally(data => {
                setIsLoading(true);
            });
    }

    const userInfoChangeHandler = (e) => {
        let input_name = e.target.name;
        let input_value = e.target.value;

        if (input_name === "u_pw") {
            pwCheck(input_value);
            setUPw(input_value);
        } else if (input_name === "u_check_pw") {
            rePwCheck(input_value);
            setUCheckPw(input_value);
        } else if (input_name === "u_mail") {
            emailCheck(input_value);
            setUMail(input_value);
        } else if (input_name === "u_phone") {
            phoneCheck(input_value);
            setUPhone(input_value);
        } else if (input_name === "u_profile") {
            setUProfile(input_value);
        } else if (input_name === "u_zip_code") {
            setUZipCode(input_value);
        } else if (input_name === "u_first_address") {
            setUFirstAddr(input_value);
        } else if (input_name === "u_second_address") {
            setUSeconAddr(input_value);
        }
    }

    const pwCheck = (input_value) => {
        // 비밀번호 검증: 8~20자, 영문 대소문자, 숫자, 특수 문자 1개 이상 포함되어야 함
        let regex = new RegExp();
        regex = /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[$!@$!%#?&]).{8,20}$/;

        if (regex.test(input_value) === true) {
            $('#message_u_pw').css('display', 'none');
            setPwFlag(true);
            return input_value;
        } else {
            $('#message_u_pw').css('display', 'block');
            setPwFlag(false);
            return '';
        }
    }


    const rePwCheck = (input_value) => {
        // 비밀번호 일치 검증        
        if (input_value === uPw) {
            $('#message_u_check_pw').css('display', 'none');
            setRPwFlag(true);
            return input_value;
        } else {
            $('#message_u_check_pw').css('display', 'block');
            setRPwFlag(false);
            return '';
        }
    }

    const emailCheck = (input_value) => {
        // 이메일 검증: 
        let regex = new RegExp();
        regex = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;

        if (regex.test(input_value)) {
            $('#message_u_mail').css('display', 'none');
            setMailFlag(true);
            return input_value;
        } else {
            $('#message_u_mail').css('display', 'block');
            setMailFlag(false);
            return '';
        }
    }

    const phoneCheck = (input_value) => {
        // 전화번호 검증: 
        let regex = new RegExp();
        regex = /^01(?:0|1|[6-9])-(?:\d{3}|\d{4})-\d{4}$/;

        if (regex.test(input_value)) {
            $('#message_u_phone').css('display', 'none');
            setPhoneFlag(true);
            return input_value;
        } else {
            $('#message_u_phone').css('display', 'block');
            setPhoneFlag(false);
            return '';
        }
    }

    const searchAddrClickHandler = () => {
        new window.daum.Postcode({
            oncomplete: (data) => {
                let extraRoadAddr = '';

                if (data.bname !== '' && /[동|로|가]$/g.test(data.bname)) {
                    extraRoadAddr += data.bname;
                }
                if (data.buildingName !== '' && data.apartment === 'Y') {
                    extraRoadAddr += (extraRoadAddr !== '' ? ', ' + data.buildingName : data.buildingName);
                }

                setUZipCode(data.zonecode);
                setUFirstAddr(data.roadAddress + ` (${extraRoadAddr})`);
            }
        }).open();
    }

    const initModifyClick = () => {
        let button = document.querySelector("#modifyBtn");
        button.disabled = true;
        button.style.cursor = 'default';
        button.style.backgroundColor = '#d3dfce';
        if (pwFlag && rPwFlag && mailFlag && phoneFlag) {
            button.disabled = false;
            button.style.cursor = 'pointer';
            button.style.backgroundColor = '#5f963a';
        }
    }

    const modifyBtnClickHandler = () => {
        let form = document.modify_form;

        if (uPw === '') {
            alert('비밀번호를 입력해 주세요');
            form.u_pw.focus();
        } else if (uCheckPw === '') {
            alert('비밀번호를 한번 더 입력해 주세요');
            form.u_check_pw.focus();
        } else if (uMail === '') {
            alert('이메일을 입력해 주세요');
            form.u_mail.focus();
        } else if (uPhone === '') {
            alert('휴대폰 번호를 입력해 주세요');
            form.u_phone.focus();
        } else {
            let u_profiles = $('input[name="u_profile"]');
            let files = u_profiles[0].files;

            let formData = new FormData();
            formData.append("u_no", uNo);
            formData.append("u_id", uId);
            formData.append("u_pw", uPw);
            formData.append("u_mail", uMail);
            formData.append("u_phone", uPhone);
            formData.append("u_zip_code", uZipcode);
            formData.append("u_first_address", uFirstAddr);
            formData.append("u_second_address", uSecondAddr);
            formData.append("u_profile_img", files[0]);

            axios({
                url: process.env.REACT_APP_SERVER_URL + `/api/user/modify_confirm`,
                method: 'put',
                data: formData,
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            }).then(res => {
                setIsLoading(false);
                if (res.data !== null && Number(parseInt(res.data.result.affectedRows)) > 0) {
                    setIsLoading(true);
                    alert('정보수정에 성공하였습니다.');
                    navigate('/');
                }
            })
                .catch(error => {
                    alert('정보수정에 실패하였습니다.');
                })
                .finally(data => {
                    setIsLoading(true);
                });

            setUPw('');
            setUCheckPw('');
        }
    }

    return (
        <>
            {isLoading ?
                <div className='content-wrap'>
                    <h2 className='title'>정보수정</h2>

                    <div className='content'>
                        <div className='modify-wrap'>
                            <form name="modify_form" className='form'>
                                <div className='input-wrap'>
                                    <input type="hidden" name="u_no" value={uNo} />
                                    <input type="text" name="u_id" value={uId} onChange={(e) => userInfoChangeHandler(e)} readOnly />
                                </div>

                                <div className='input-wrap'>
                                    <input type="password" name="u_pw" value={uPw} onChange={(e) => userInfoChangeHandler(e)} placeholder="비밀번호를 입력해 주세요" />
                                    <span id="message_u_pw" className="input-message">비밀번호는 8 ~ 20자,&nbsp;&nbsp;영문과 숫자, 특수문자를 1개 이상 포함해야 합니다.</span>
                                </div>

                                <div className='input-wrap'>
                                    <input type="password" name="u_check_pw" value={uCheckPw} onChange={(e) => userInfoChangeHandler(e)} placeholder="비밀번호를 한번 더 입력해 주세요" />
                                    <span id="message_u_check_pw" className="input-message">비밀번호가 일치하지 않습니다.</span>
                                </div>

                                <div className='input-wrap'>
                                    <input type="text" name="u_mail" value={uMail} onChange={(e) => userInfoChangeHandler(e)} placeholder="이메일 주소를 입력해 주세요" />
                                    <span id="message_u_mail" className="input-message">이메일 형식으로 입력해 주세요.</span>
                                </div>

                                <div className='input-wrap'>
                                    <input type="text" name="u_phone" value={uPhone} onChange={(e) => userInfoChangeHandler(e)} placeholder="휴대폰 번호를 입력해 주세요" />
                                    <span id="message_u_phone" className="input-message">예: 010-1234-5678</span>
                                </div>

                                <div className='input-wrap'>
                                    <div>
                                        <input type="text" id="postcode" name="u_zip_code" value={uZipcode} onChange={(e) => userInfoChangeHandler(e)} placeholder="우편번호" readOnly />
                                        <button type="button" id="search_address_btn" onClick={searchAddrClickHandler} className="btn sub">
                                            <FontAwesomeIcon icon="fa-solid fa-location-crosshairs" />
                                        </button>
                                    </div>

                                    <div className='col'>
                                        <input type="text" id="address" name="u_first_address" value={uFirstAddr} onChange={(e) => userInfoChangeHandler(e)} placeholder="주소" readOnly />
                                        <input type="text" id="detailAddress" name="u_second_address" value={uSecondAddr} onChange={(e) => userInfoChangeHandler(e)} placeholder="상세주소" />

                                        <span id="icon_u_detail_addr" className="input-icon"></span>
                                        <span id="message_u_detail_addr" className="input-message">주소를 입력해 주세요.</span>
                                    </div>
                                </div>

                                <div className='input-wrap' id='profile'>
                                    <div className="profile-img">
                                    {isProfile ? <>                                       
                                        <img src={process.env.REACT_APP_SERVER_URL + `/home/ubuntu/user/upload/profile_imgs/${uId}/${uProfileImg}`} alt="profile" />
                                        </>
                                        :
                                        <>
                                        <img src="/imgs/logo/logo.png" alt="마이페이지" />
                                        </>}

                                    </div>
                                    <div>
                                        <span id="icon_u_profile" className="input-icon"></span>
                                        <span id="message_u_profile" className="input-message">프로필 사진을 선택해 주세요.</span>
                                        <input type="file" name="u_profile" value={uProfile} onChange={(e) => userInfoChangeHandler(e)} />
                                    </div>
                                </div>

                                <div className='btn-wrap'>
                                    <button type="button" onClick={modifyBtnClickHandler} id="modifyBtn" className="btn main full">정보수정</button>
                                    <Link to='/user/delete' className="btn sub full" >회원탈퇴</Link>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                : <Loading />}
        </>
    );
};

export default Modify;