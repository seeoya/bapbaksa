import React from 'react';
import { useState } from 'react';
import $ from 'jquery';
import axios from 'axios';
import { Link } from 'react-router-dom';


const FindPW = () => {
    const [uMail, setUMail] = useState('');
    const [uId, setUId] = useState('');


    const userInfoChangeHandler = (e) => {
        console.log('userInfoChangeHandler()');
        
        let input_name = e.target.name;
        let input_value = e.target.value;

        if (input_name === "u_id") {            
            idCheck(input_value);
            setUId(input_value);
        } else if (input_name === "u_mail") {
            emailCheck(input_value);
            setUMail(input_value);
        } 
    }

    function idCheck(input_value) {
        // 아이디 검증: 영어 소문자와 숫자로만 구성되어야 함
        let regex = new RegExp();
        regex = /^[a-z0-9]{5,19}$/g;        

        if(regex.test(input_value)) {
            $('#message_u_id').css('display', 'none');
           return input_value;
        }else {            
            $('#message_u_id').css('display', 'block');
        }        
    }
     
    function emailCheck(input_value) {
        // 이메일 검증: 
        let regex = new RegExp();
        regex = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;        

        if(regex.test(input_value)) {
            $('#message_u_mail').css('display', 'none');
           return input_value;
        }else {            
            $('#message_u_mail').css('display', 'block');
        }        
    }

    const findPWBtnClickHandler = async () => {
        console.log('findPWBtnClickHandler()');

        let form = document.findpw_form;

        if (uId === '') {
            alert('아이디를 입력해 주세요');
            form.u_id.focus();
        } else if (uMail === '') {
            alert('이메일을 입력해 주세요');
            form.u_mail.focus();
        } else {

            let data = {
                "u_id": uId,
                "u_mail": uMail,
            }                 

            await axios({
                url: process.env.REACT_APP_SERVER_URL + `/api/user/findpw_confirm`,                
                method: 'post',      
                data: data,
            })
            .then(res => {        
                console.log('AXIOS FIND_ID COMMUNICATION SUCCESS ==> ', res.data);                                
                console.log('res.data: ', res.data);
                console.log(res.data.findPW);
    
                if (res.data.findPW !== true) {                       
                    alert('가입시 등록한 회원정보가 맞는지 확인해 주세요.');                   
                    setUId('');
                    setUMail('');                    
                } else {
                    setUMail('');
                    setUId('');                   
                    
                    $('#find-input').css('display', 'none');
                    $('#find-result').css('display', 'block');
                    alert('가입하신 이메일로 임시 비밀번호가 발송되었습니다.');               
                }
            })
            .catch(error => {           
                console.log('AXIOS FIND_ID COMMUNICATION ERROR');
            })
            .finally(data => {
                console.log('AXIOS FIND_ID COMMUNICATION FINALLY');
        
            });                
         
                           
        }
        const url = "http://localhost:3000/imgs/logo/logo.png";

    }

  return (
    <div className='content-wrap'>

        <h2 className='title'>비밀번호 찾기</h2>

        <div className='content'>
            <div className='signin-wrap'>            
                <form id='find-input' name='findid_form' className='form'>
                    <div className='input-wrap'>
                        <input type="text" name="u_id" value={uId} onChange={(e) => userInfoChangeHandler(e)} placeholder="아이디를 입력해 주세요"/>                         
                        <span id="message_u_id" className="input-message">가입시 등록한 아이디를 입력해 주세요.</span>
                    </div>
                    <div className='input-wrap'>
                        <input type="text" name="u_mail" value={uMail} onChange={(e) => userInfoChangeHandler(e)} placeholder="이메일 주소를 입력해 주세요"/>                         
                        <span id="message_u_mail" className="input-message">가입시 등록한 이메일을 입력해 주세요.</span>
                    </div>
                    
                    <div className='btn-wrap'>
                        <button type="button" onClick={findPWBtnClickHandler} className="btn main full">확인</button>
                    </div>
                </form>

                <div id='find-result'>                                        
                    <div className='find-wrap'>                            
                        <div>
                            <p id="message_u_mail" className="result-message title">고객님 계정을 찾았습니다.</p>
                            <p id="message_u_mail" className="result-message text">임시 &nbsp; 비밀번호로 &nbsp; 로그인 &nbsp; 후 &nbsp; 정보수정에서 &nbsp; 비밀번호를 &nbsp; 변경하실 &nbsp;수&nbsp; 있습니다.</p>                                                
                        </div>
                    
                    </div>                            
                </div>            
             
       
            </div>
        </div>
    </div>

  );
}
export default FindPW;