import React, { useState } from 'react';
import $ from 'jquery';
import axios from 'axios';
import { Link } from 'react-router-dom';

const FindID = () => {

    const [uMail, setUMail] = useState('');
    const [uId, setUId] = useState('');


    const userInfoChangeHandler = (e) => {
        console.log('userInfoChangeHandler()');
        
        let input_name = e.target.name;
        let input_value = e.target.value;

        if (input_name === "u_mail") {
            emailCheck(input_value);
            setUMail(input_value);
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

    const findIDBtnClickHandler = async () => {
        console.log('findIDBtnClickHandler()');

        let form = document.findid_form;

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
                console.log('AXIOS FIND_ID COMMUNICATION SUCCESS ==> ', res.data);                                
                console.log('res.data: ', res.data);
                console.log(res.data.findID);
    
                if (res.data.findID !== true) {                       
                    alert('가입하신 이메일을 찾지 못했습니다.\n 다시 한 번 확인해 주세요.');                   
                    setUMail('');
                    
                } else {
                    setUMail('');
                    let hideId = res.data.uId.slice(4);
                    let findId = res.data.uId.slice(0, 4) + hideId.replaceAll(/[a-z0-9]/gi, "*");
                    setUId(findId);
                    $('#find-input').css('display', 'none');
                    $('#find-result').css('display', 'block');
                    alert('가입하신 이메일로 아이디가 발송되었습니다.');               
                }
            })
            .catch(error => {           
                console.log('AXIOS FIND_ID COMMUNICATION ERROR');
            })
            .finally(data => {
                console.log('AXIOS FIND_ID COMMUNICATION FINALLY');
        
            });                
         
                           

        }
    }

  return (
    <div className='content-wrap'>

        <h2 className='title'>아이디 찾기</h2>

        <div className='content'>
            <div className='signin-wrap'>            
                <form id='find-input' name='findid_form' className='form'>
                    <div className='input-wrap'>
                            <input type="text" name="u_mail" value={uMail} onChange={(e) => userInfoChangeHandler(e)} placeholder="이메일 주소를 입력해 주세요"/>                         
                            <span id="message_u_mail" className="input-message">가입시 등록한 이메일을 입력해 주세요.</span>
                    </div>
                    
                    <div className='btn-wrap'>
                        <button type="button" onClick={findIDBtnClickHandler} className="btn main full">확인</button>
                    </div>
                </form>

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

  );
}

export default FindID;