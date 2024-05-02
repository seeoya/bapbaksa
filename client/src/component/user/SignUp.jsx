import React, { useState } from 'react';
import {useNavigate} from 'react-router-dom';
import { useDispatch } from 'react-redux';
import $ from 'jquery';

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

    const dispatch = useDispatch();
    const navigate = useNavigate();


    const userInfoChangeHandler = (e) => {
        console.log('userInfoChangeHandler()');

        let input_name = e.target.name;
        let input_value = e.target.value;

        if (input_name === "u_id") {
            setUId(input_value);

        } else if (input_name === "u_pw") {
            setUPw(input_value);

        } else if (input_name === "u_mail") {
            setUMail(input_value);

        } else if (input_name === "u_phone") {
            setUPhone(input_value);

        } else if (input_name === "u_profile") {
            setUProfile(input_value);
        } else if (input_name === "u_zip_code") {
            setZipCode(input_value);
        } else if (input_name === "u_first_address") {
            setUFirstAddr(input_value);
        } else if (input_name === "u_second_address") {
            setUSeconAddr(input_value);
        }
    }

     
    const signupBtnClickHandler =() => {
        console.log('signupBtnClickHandler()');

        let form = document.signup_form;

        if (uId === '') {
            alert('아이디를 입력해 주세요');
            form.u_id.focus();

        } else if (uPw === '') {
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
            
            const body = {
                u_id: uId,
                u_pw: uPw,
                u_mail: uMail,
                u_phone: uPhone,
                u_zip_code: uZipcode,
                u_first_address: uFirstAddr,
                u_second_address: uSecondAddr,
                file: files[0],
            }
        
            dispatch(getSignupAction(body)).then((res) => {

                if (res.data !== null && res.data > 0) {
                    console.log('AXIOS SIGN_UP COMMUNICATION SUCCESS ==> ', res.data);
                    alert('회원가입에 성공하였습니다.');
                    navigate('/user/signin');
        
                } else {
                    alert('회원가입에 실패하였습니다.');                
        
                    setUId(''); setUPw(''); setUCheckPw(''); setUMail(''); setUPhone('');
                    setUZipCode(''); setUFirstAddr(''); setUSeconAddr(''); setUProfile('');                    
        
                }

            });
        }
    }

    

    return (
        <div className='content-wrap'>

            <h2 className='title'>회원가입</h2>

            <div className='content'>

                <div className='signup-wrap'>            
                    <form name="input-wrap">
                        <div>                    
                            <input type="text" name="u_id" value={uId} onChange={(e) => userInfoChangeHandler(e)} placeholder="아이디를 입력해 주세요"/>    
                            {/* <button type="button" class="btn sub" onClick="isMember();">중복체크</button> */}

                            <span id="icon_m_id" class="input-icon"></span>
                            <span id="message_m_id" class="input-message">아이디는 5글자 이상이며, 영문 소문자와 숫자만 입력 가능합니다.</span>
                            <span id="message_same_m_id" class="input-message">중복된 아이디입니다.</span>
                        </div>

                        <div class='input-wrap'>
                            <input type="password" name="u_pw" value={uPw} onChange={(e) => userInfoChangeHandler(e)} placeholder="비밀번호를 입력해 주세요"/>    
                            <span id="icon_m_pw" class="input-icon"></span>
                            <span id="message_m_pw" class="input-message">비밀번호는 최소 8자 이상이어야 하며, 특수문자를 최소 1개 이상 포함해야 합니다.</span>
                        </div>

                        <div class='input-wrap'>
                            <input type="password" name="u_check_pw" value={uCheckPw} onChange={(e) => userInfoChangeHandler(e)} placeholder="비밀번호를 한번 더 입력해 주세요"/>
                            <span id="icon_u_check_pw" class="input-icon"></span>
                            <span id="message_u_check_pw" class="input-message">비밀번호가 일치하지 않습니다.</span>
                        </div>

                        <div class='input-wrap'>
                            <input type="text" name="u_mail" value={uMail} onChange={(e) => userInfoChangeHandler(e)} placeholder="이메일 주소를 입력해 주세요"/>
                            <span id="icon_u_mail" class="input-icon"></span>
                            <span id="message_u_mail" class="input-message">유효한 이메일 주소를 입력해 주세요.</span>
                        </div>

                        <div class='input-wrap'>
                            <input type="text" name="u_phone" value={uPhone} onChange={(e) => userInfoChangeHandler(e)} placeholder="휴대폰 번호를 입력해 주세요"/>
                            {/* <input type="text" name="m_phone" placeholder="전화번호를 입력해 주세요." oninput="extractNumbers(this)"/> */}
                            <span id="icon_u_phone" class="input-icon"></span>
                            <span id="message_u_phone" class="input-message">전화번호는 숫자 9~12자까지 입력 가능합니다.</span>
                        </div>

                        <div class='input-wrap'>
                            <div>
                                <input type="text" id="postcode" name="u_zip_code" value={uZipcode} onChange={(e) => userInfoChangeHandler(e)} placeholder="우편번호" readonly/>
                                <button type="button" id="search_address_btn" onclick="searchAddress()" class="btn sub">
                                    <i class="fa-solid fa-location-crosshairs"></i>
                                </button>
                            </div>

                            <div class='col'>
                                <input type="text" id="address" name="u_first_address" value={uFirstAddr} onChange={(e) => userInfoChangeHandler(e)} placeholder="주소" readonly/>
                                <input type="text" id="detailAddress" name="u_second_address" value={uSecondAddr} onChange={(e) => userInfoChangeHandler(e)} placeholder="상세주소"/>

                                <span id="icon_u_detail_addr" class="input-icon"></span>
                                <span id="message_u_detail_addr" class="input-message">주소를 입력해 주세요.</span>
                            </div>
                        </div>
                        
                        <div class='input-wrap'>
                            <div>
                                <span id="icon_u_profile" class="input-icon"></span>
                                <span id="message_u_profile" class="input-message">프로필 사진을 선택해 주세요.</span>
                                <input type="file" name="u_profile" value={uProfile} onChange={(e) => userInfoChangeHandler(e)}/>                
                            </div>
                        </div>
                    
                        <div class='btn-wrap'>
                            <button type="button" onclick={signupBtnClickHandler} class="btn main full">회원가입</button>
                        </div>
                        

                        {/* <div class="btn-wrap">
                            <button type="button" onclick="memberFormCheck('create');" class="btn main full">회원가입</button>
                        </div> */}

                    </form>
                    
                </div>
            </div>
        </div>
    );
};

export default SignUp;