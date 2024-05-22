import axios from 'axios';
import $ from 'jquery';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { setTitle } from '../../util/setTitle';
import Loading from '../include/Loading';

const FindID = () => {

    const [uMail, setUMail] = useState('');
    const [uPhone, setUPhone] = useState('');
    const [uId, setUId] = useState('');

    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setTitle('아이디 찾기');
    });

    const userInfoChangeHandler = (e) => {
        let input_name = e.target.name;
        let input_value = e.target.value;

        if (input_name === "u_mail") {
            emailCheck(input_value);
            setUMail(input_value);
        } else if (input_name === "u_phone") {
            phoneCheck(input_value);
            setUPhone(input_value);
        }
    }

    function emailCheck(input_value) {
        // 이메일 검증: 
        let regex = new RegExp();
        regex = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;

        if (regex.test(input_value)) {
            $('#message_u_mail').css('display', 'none');
            return input_value;
        } else {
            $('#message_u_mail').css('display', 'block');
        }
    }

    function phoneCheck(input_value) {
        // 전화번호 검증: 
        let regex = new RegExp();
        regex = /^01(?:0|1|[6-9])-(?:\d{3}|\d{4})-\d{4}$/;

        if (regex.test(input_value)) {
            $('#message_u_phone').css('display', 'none');
            return input_value;
        } else {
            $('#message_u_phone').css('display', 'block');
        }
    }

    const findIDMailBtnClickHandler = async () => {
        let form = document.findid_mail_form;
        setIsLoading(true);

        if (uMail === '') {
            alert('이메일을 입력해 주세요');
            form.u_mail.focus();
        } else {
            let data = {
                "u_mail": uMail,
            }

            await axios({
                url: process.env.REACT_APP_SERVER_URL + `/api/user/findid_confirm`,
                method: 'post',
                data: data,
            })
                .then(res => {
                    setIsLoading(false);
                    if (res.data.findID !== true) {
                        alert('가입하신 이메일을 찾지 못했습니다.\n 다시 한 번 확인해 주세요.');
                        setUMail('');
                    } else {
                        setUMail('');
                        let hideId = res.data.uId.slice(4);
                        let findId = res.data.uId.slice(0, 4) + hideId.replaceAll(/[a-z0-9]/gi, "*");
                        setUId(findId);
                        $('.find-button').css('display', 'none');
                        $('#find-input').css('display', 'none');
                        $('#find-input2').css('display', 'none');
                        $('#find-result').css('display', 'block');
                        alert('가입하신 이메일로 아이디가 발송되었습니다.');
                    }
                })
                .catch(error => {
                })
                .finally(data => {
                    setIsLoading(true);
                });
        }
    }

    const findIDSmsBtnClickHandler = async () => {
        let form = document.findid_sms_form;
        setIsLoading(true);

        if (uPhone === '') {
            alert('휴대폰 번호를 입력해 주세요');
            form.u_phone.focus();
        } else {
            let data = {
                "u_phone": uPhone,
            }

            await axios({
                url: process.env.REACT_APP_SERVER_URL + `/api/user/findid_confirm`,
                method: 'post',
                data: data,
            })
                .then(res => {
                    setIsLoading(false);
                    if (res.data.findID !== true) {
                        alert('가입하신 휴대폰 번호를 찾지 못했습니다.\n 다시 한 번 확인해 주세요.');
                        setUPhone('');
                    } else {
                        setUPhone('');
                        let hideId = res.data.uId.slice(4);
                        let findId = res.data.uId.slice(0, 4) + hideId.replaceAll(/[a-z0-9]/gi, "*");
                        setUId(findId);
                        $('.find-button').css('display', 'none');
                        $('#find-input').css('display', 'none');
                        $('#find-input2').css('display', 'none');
                        $('#find-result').css('display', 'block');
                        alert('가입하신 휴대폰 번호로 아이디가 발송되었습니다.');
                    }
                })
                .catch(error => {
                })
                .finally(data => {
                    setIsLoading(true);
                });
        }
    }

    const findMailClickHandler = () => {
        $('#sms').css('background-color', '#f4f4f4').css('color', '#333');
        $('#mail').css('background-color', '#8fc769').css('color', '#fff');
        $('.find-sms').css('display', 'none');
        $('.find-mail').css('display', 'block');
    }

    const findSmsClickHandler = () => {
        $('#sms').css('background-color', '#8fc769').css('color', '#fff');
        $('#mail').css('background-color', '#f4f4f4').css('color', '#333');
        $('.find-mail').css('display', 'none');
        $('.find-sms').css('display', 'block');
    }

    return (
        <>
            {isLoading ? null : <Loading />}
            <div className='content-wrap'>
                <h2 className='title'>아이디 찾기</h2>

                <div className='content'>
                    <div className='signin-wrap'>
                        <div className='find-button'>
                            <button id='mail' type='button' onClick={findMailClickHandler} className='btn main-light half mail'>이메일로 찾기</button>
                            <button id='sms' type='button' onClick={findSmsClickHandler} className='btn half sms'>문자메시지로 찾기</button>
                        </div>

                        <div className='find-mail'>
                            <form id='find-input' name='findid_mail_form' className='form'>
                                <div className='input-wrap'>
                                    <input type="text" name="u_mail" value={uMail} onChange={(e) => userInfoChangeHandler(e)} placeholder="이메일 주소를 입력해 주세요" />
                                    <span id="message_u_mail" className="input-message">가입시 등록한 이메일을 입력해 주세요.</span>
                                </div>

                                <div className='btn-wrap'>
                                    <button type="button" onClick={findIDMailBtnClickHandler} className="btn main full">확인</button>
                                </div>
                            </form>
                        </div>

                        <div className='find-sms'>
                            <form id='find-input2' name='findid_sms_form' className='form'>
                                <div className='input-wrap'>
                                    <input type="text" name="u_phone" value={uPhone} onChange={(e) => userInfoChangeHandler(e)} placeholder="휴대폰 번호를 입력해 주세요" />
                                    <span id="message_u_phone" className="input-message">가입시 등록한 휴대폰 번호를 입력해 주세요.</span>
                                </div>

                                <div className='btn-wrap'>
                                    <button type="button" onClick={findIDSmsBtnClickHandler} className="btn main full">확인</button>
                                </div>
                            </form>
                        </div>

                        <div id='find-result'>
                            <div className='find-wrap'>
                                <div>
                                    <p id="message_u_mail" className="result-message title">고객님 계정을 찾았습니다.</p>
                                    <p id="message_u_mail" className="result-message text">아이디를 확인 후 로그인해 주세요.</p>
                                    <p id="message_u_mail" className="result-message id">아이디 : {uId}</p>
                                </div>

                                <div className='btn-wrap'>
                                    <Link to='/user/signin' className='find-link'>
                                        <button type="button" className="btn main full">로그인</button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default FindID;