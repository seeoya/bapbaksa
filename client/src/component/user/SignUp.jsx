import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import $ from 'jquery';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { setTitle } from '../../util/setTitle';
import Loading from '../include/Loading';

axios.defaults.withCredentials = true;

const SignUp = () => {

    const [uId, setUId] = useState('');
    const [uPw, setUPw] = useState('');
    const [uCheckPw, setUCheckPw] = useState('');
    const [uMail, setUMail] = useState('');
    const [uPhone, setUPhone] = useState('');
    const [uProfile, setUProfile] = useState('');
    const [uZipcode, setUZipCode] = useState('');
    const [uFirstAddr, setUFirstAddr] = useState('');
    const [uSecondAddr, setUSeconAddr] = useState('');
    const [isMemberFlag, setIsMemberFlag] = useState(false);
    const [pwFlag, setPwFlag] = useState(false);
    const [rPwFlag, setRPwFlag] = useState(false);
    const [mailFlag, setMailFlag] = useState(false);
    const [phoneFlag, setPhoneFlag] = useState(false);
    const [signupClick, setSignupClick] = useState(false);
    

    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setTitle('회원가입');
        initSignupClick();
    }, [isMemberFlag, pwFlag, rPwFlag, mailFlag, phoneFlag]);

    const navigate = useNavigate();

    const userInfoChangeHandler = (e) => {
        console.log('userInfoChangeHandler()');

        let input_name = e.target.name;
        let input_value = e.target.value;

        if (input_name === "u_id") {
            idCheck(input_value);                       
            setUId(input_value);

        } else if (input_name === "u_pw") {
            pwCheck(input_value);                       
            setUPw(input_value)

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

        } else if (input_name === "u_second_address") {
            setUSeconAddr(input_value);
        }
    }

    const idCheck = (input_value) => {
        // 아이디 검증: 5~20 영어 소문자와 숫자 조합으로 구성되어야 함
        let regex = new RegExp();
        regex = /^(?=.*[a-z])(?=.*[0-9]).{5,20}$/;
        
        if (regex.test(input_value)) {
            $('#message_u_id').css('display', 'none');

            if(!isMemberFlag){
                $('#message_u_id_is').css('display', 'block');
                return input_value;
            } else {
                $('#message_u_id_is').css('display', 'none');    
                return true;
            }
            
        } else {
            $('#message_u_id').css('display', 'block');
            return '';
        }
    }

    const isMemberCheck = () => {
    
        if(!isMemberFlag){
            $('#message_u_id_is').css('display', 'block');
            return false;            
            
        } else if(isMemberFlag) {
            $('#message_u_id_is').css('display', 'none');
            return true;    
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

    const pwViewClickHandler = () => {
        console.log('pwViewClickHandler()');
        $('#view').css('display', 'block');
        $('#hide').css('display', 'none');
        $('.pw-view-icon input[name="u_pw"]').prop('type', 'text');

    }

    const pwHideClickHandler = () => {
        console.log('pwViewClickHandler()');
        $('#view').css('display', 'none');
        $('#hide').css('display', 'block');
        $('.pw-view-icon input[name="u_pw"]').prop('type', 'password');


    }

    const isMemberClickHandler = async () => {
        console.log('isMemberClickHandler()');
        setIsLoading(true);
        let data = {
            'u_id': uId
        }

        await axios(
            {
            url: process.env.REACT_APP_SERVER_URL + `/api/user/isMember_confirm`,
            method: 'post',
            data: data,
        })
            .then(res => {
                console.log('AXIOS SIGN_UP ISMEMBER COMMUNICATION SUCCESS ==> ', res.data);
                console.log('res.data: ', res.data);
                console.log(res.data.isMember);
                setIsLoading(false);                
                if (res.data.isMember === false) {
                    setIsMemberFlag(true);
                    $('#message_u_id_is').css('display', 'none');                      

                    alert('사용 가능한 아이디입니다.');
                } else if(res.data.isMember === true){
                    setIsMemberFlag(false);
                    setUId('');
                    alert('사용 불가능한 아이디입니다.');
                } else if(res.data.isMember === null) {
                    setIsMemberFlag(false);
                    setUId('');
                    alert('아이디를 입력해 주세요.');
                } else if(res.data.pass === false){
                    setIsMemberFlag(false);
                    setUId('');
                    alert('유효한 아이디를 입력해 주세요.');
                }

            })
            .catch(error => {
                console.log('AXIOS SIGN_UP ISMEMBER COMMUNICATION ERROR');
            })
            .finally(data => {
                console.log('AXIOS SIGN_UP ISMEMBER COMMUNICATION FINALLY');
                setIsLoading(true);
            });

    }

    const searchAddrClickHandler = () => {
        console.log('searchAddrClickHandler()');


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

    const initSignupClick = () => {
        console.log('initSignupClick()');
       
        let button = document.querySelector("#signupBtn");
            console.log('button', button);
            button.disabled = true;
            button.style.cursor = 'default';
            button.style.backgroundColor = '#d3dfce';            

        console.log('flag===========', isMemberFlag && pwFlag && rPwFlag && mailFlag && phoneFlag);
        if(isMemberFlag && pwFlag && rPwFlag && mailFlag && phoneFlag){
            button.disabled = false;
            button.style.cursor = 'pointer';
            button.style.backgroundColor = '#5f963a';            
        }

    }

    const signupBtnClickHandler = () => {
        console.log('signupBtnClickHandler()');
        setIsLoading(true);
        let form = document.signup_form;

        if (uId === '') {
            alert('아이디를 입력해 주세요');
            form.u_id.focus();                        

        } else if (uPw === ''){
            alert('비밀번호를 입력해 주세요');
            form.u_pw.focus();                                

        } else if (uCheckPw === '') {
            alert('비밀번호를 한번 더 입력해 주세요');
            form.u_check_pw.focus();                       
        
        } else if (uMail === '') {
            alert('이메일을 입력해 주세요');
            form.u_mail.focus();            
            setUMail('');

        } else if (uPhone === '') {
            alert('휴대폰 번호를 입력해 주세요');
            form.u_phone.focus();            
            setUPhone('');

        } else {

            let u_profiles = $('input[name="u_profile"]');
            console.log('u_profiles: ', u_profiles);
            let files = u_profiles[0].files;
            console.log('files: ', files);

            let formData = new FormData();
            formData.append("u_id", uId);
            formData.append("u_pw", uPw);
            formData.append("u_mail", uMail);
            formData.append("u_phone", uPhone);
            formData.append("u_zip_code", uZipcode);
            formData.append("u_first_address", uFirstAddr);
            formData.append("u_second_address", uSecondAddr);
            formData.append("u_profile_img", files[0]);

            axios({
                url: process.env.REACT_APP_SERVER_URL + `/api/user/signup_confirm`,
                method: 'post',
                data: formData,
            })
                .then(res => {
                    console.log('res: ', res);
                    console.log('res.data: ', res.data);
                    console.log(res.data.result.affectedRows);
                    setIsLoading(false);
                    if (res.data !== null && Number(parseInt(res.data.result.affectedRows)) > 0) {
                        console.log('AXIOS SIGN_UP COMMUNICATION SUCCESS ==> ', res.data);

                        alert('회원가입에 성공하였습니다.');
                        navigate('/');

                    }
                })
                .catch(error => {

                    alert('회원가입에 실패하였습니다.');
                })
                .finally(data => {
                    console.log('AXIOS SIGN_UP COMMUNICATION FINALLY');
                    setIsLoading(true);
                });


            setUId(''); setUPw(''); setUCheckPw(''); setUMail(''); setUPhone('');
            setUZipCode(''); setUFirstAddr(''); setUSeconAddr(''); setUProfile('');
        }
    }

    return (
        <>
            {isLoading ? null : <Loading />}
            <div className='content-wrap'>

                <h2 className='title'>회원가입</h2>

                <div className='content'>

                    <div className='signup-wrap'>
                        <form name="signup_form" className='form'>
                            <p className='signup-hint'>* 필수항목</p>
                            <div className='input-wrap'>
                                <div>
                                    <input type="text" name="u_id" value={uId} onChange={(e) => userInfoChangeHandler(e)} placeholder="아이디를 입력해 주세요 *" />
                                    <button type="button" className="btn sub" onClick={isMemberClickHandler}>중복확인</button>
                                </div>

                                <span id="message_u_id" className="input-message">아이디는 5 ~ 20자,&nbsp;&nbsp;영문과 숫자를 조합해야 합니다.</span>
                                <span id="message_u_id_is" className="input-message">아이디 중복확인을 해주세요.</span>
                            </div>

                            <div className='input-wrap'>
                                <div className='pw-view-icon'>
                                    <input type="password" name="u_pw" value={uPw} onChange={(e) => userInfoChangeHandler(e)} placeholder="비밀번호를 입력해 주세요 *" />
                                    <button id="hide" type="button" className="btn pw-icon" onClick={pwViewClickHandler}><FontAwesomeIcon icon="fa-regular fa-eye-slash" /></button>
                                    <button id="view" type="button" className="btn pw-icon" onClick={pwHideClickHandler}><FontAwesomeIcon icon="fa-regular fa-eye" /></button>
                                </div>
                                <span id="message_u_pw" className="input-message">비밀번호는 8~20자,&nbsp;&nbsp;영문, 숫자, 특수문자($!@$!%#?&) 1개 이상 포함해야 합니다.</span>
                            </div>

                            <div className='input-wrap'>
                                <input type="password" name="u_check_pw" value={uCheckPw} onChange={(e) => userInfoChangeHandler(e)} placeholder="비밀번호를 한번 더 입력해 주세요 *" />
                                <span id="message_u_check_pw" className="input-message">비밀번호가 일치하지 않습니다.</span>
                            </div>

                            <div className='input-wrap'>
                                <input type="text" name="u_mail" value={uMail} onChange={(e) => userInfoChangeHandler(e)} placeholder="이메일 주소를 입력해 주세요 *" />
                                <span id="message_u_mail" className="input-message">이메일 형식으로 입력해 주세요.</span>
                            </div>

                            <div className='input-wrap'>
                                <input type="text" name="u_phone" value={uPhone} onChange={(e) => userInfoChangeHandler(e)} placeholder="휴대폰 번호를 입력해 주세요 *" />
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

                            <div className='input-wrap'>
                                <div>
                                    <span id="icon_u_profile" className="input-icon"></span>
                                    <span id="message_u_profile" className="input-message">프로필 사진을 선택해 주세요.</span>
                                    <input type="file" name="u_profile" value={uProfile} onChange={(e) => userInfoChangeHandler(e)} />
                                </div>
                            </div>

                            <div className='btn-wrap'>
                                <button type="button" onClick={signupBtnClickHandler} id='signupBtn' className="btn main full">회원가입</button>
                            </div>
                        </form>

                    </div>
                </div>
            </div>
        </>
    );
};

export default SignUp;