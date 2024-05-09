import React, { useState } from 'react';
import {useNavigate} from 'react-router-dom';
import $ from 'jquery';
import axios from 'axios';
import { useEffect } from 'react';
import { getToken } from '../../storage/loginedToken';
import { Link } from 'react-router-dom';
import { getRefreshToken } from '../../util/refreshToken';


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

    
    const navigate = useNavigate();     
        
    
    useEffect(() => {

       setUser();
       modifyForm();
    
    }, [accessToken]);


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
            headers:{Authorization : `Bearer ${accessToken}`,
            },
        })
        .then(res => {        
            console.log('res: ', res);
            console.log('res.data: ', res.data);                
            
            if (res.data !== null && res.data.message === undefined) {
                        
                console.log('AXIOS MODIFY_FORM COMMUNICATION SUCCESS ==> ', res.data);                    
                    
                setUNo( res.data.user.u_no);
                setUId(res.data.user.u_id);               
                setUMail(res.data.user.u_mail);
                setUPhone(res.data.user.u_phone);
                setUZipCode(res.data.user.u_zip_code);
                setUFirstAddr(res.data.user.u_first_address);
                setUSeconAddr(res.data.user.u_second_address);
                setUProfileImg(res.data.user.pi_name);                

            }         
        })
        .catch(error => {
            console.log('AXIOS MODIFY_FORM COMMUNICATION ERROR');

            console.log('AXIOS USER_DELETE COMMUNICATION ERROR');
            console.log(error.response.data.message);
            if(error.response.data.message !== undefined){

                getRefreshToken();
            }                    
            
        })
        .finally(data => {
            console.log('AXIOS MODIFY_FORM COMMUNICATION FINALLY');

        });           
            
    }               
        
    const userInfoChangeHandler = (e) => {
        console.log('userInfoChangeHandler()');

        let input_name = e.target.name;
        let input_value = e.target.value;

        if (input_name === "u_pw") {
            setUPw(input_value);

        } else if (input_name === "u_check_pw") {
            setUCheckPw(input_value);

        } else if (input_name === "u_mail") {
            setUMail(input_value);

        } else if (input_name === "u_phone") {
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

     
    const modifyBtnClickHandler = () => {
        console.log('modifyBtnClickHandler()');

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
                url: process.env.REACT_APP_SERVER_URL + `/api/user/modify_confirm`,                
                method: 'put',      
                data: formData,
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            })
            .then(res => {        
                console.log('res: ', res);
                console.log('res.data: ', res.data);
                console.log('res.affect: ', res.data.result.affectedRows);

                if (res.data !== null && Number(parseInt(res.data.result.affectedRows)) > 0) {
                    console.log('AXIOS MODIFY_CONFIRM COMMUNICATION SUCCESS ==> ', res.data);                                        
                    
                    alert('정보수정에 성공하였습니다.');
                    navigate('/');

                }
        
            
            })
            .catch(error => {
                console.log('AXIOS MODIFY_CONFIRM COMMUNICATION ERROR');
                alert('정보수정에 실패하였습니다.');  
            })
            .finally(data => {
                console.log('AXIOS MODIFY_CONFIRM COMMUNICATION FINALLY');
        
            });
                   
                        
            setUPw(''); setUCheckPw(''); setUMail(''); setUPhone('');
            setUZipCode(''); setUFirstAddr(''); setUSeconAddr(''); setUProfile('');  
     
        }
   
    }


    
    return (
        <div className='content-wrap'>

            <h2 className='title'>정보수정</h2>

            <div className='content'>

            <div className='modify-wrap'>            
                    <form name="modify_form" className='form'>
                        <div className='input-wrap'>                    
                            <input type="hidden" name="u_no" value={uNo} />
                            <input type="text" name="u_id" value={uId} onChange={(e) => userInfoChangeHandler(e)} readOnly/>                                                       
                        </div>

                        <div className='input-wrap'>
                            <input type="password" name="u_pw" value={uPw} onChange={(e) => userInfoChangeHandler(e)} placeholder="비밀번호를 입력해 주세요"/>    
                            <span id="icon_m_pw" class="input-icon"></span>
                            <span id="message_m_pw" class="input-message">비밀번호는 최소 8자 이상이어야 하며, 특수문자를 최소 1개 이상 포함해야 합니다.</span>
                        </div>

                        <div className='input-wrap'>
                            <input type="password" name="u_check_pw" value={uCheckPw} onChange={(e) => userInfoChangeHandler(e)} placeholder="비밀번호를 한번 더 입력해 주세요"/>
                            <span id="icon_u_check_pw" class="input-icon"></span>
                            <span id="message_u_check_pw" class="input-message">비밀번호가 일치하지 않습니다.</span>
                        </div>

                        <div className='input-wrap'>
                            <input type="text" name="u_mail" value={uMail} onChange={(e) => userInfoChangeHandler(e)} placeholder="이메일 주소를 입력해 주세요"/>
                            <span id="icon_u_mail" class="input-icon"></span>
                            <span id="message_u_mail" class="input-message">유효한 이메일 주소를 입력해 주세요.</span>
                        </div>

                        <div className='input-wrap'>
                            <input type="text" name="u_phone" value={uPhone} onChange={(e) => userInfoChangeHandler(e)} placeholder="휴대폰 번호를 입력해 주세요"/>
                            {/* <input type="text" name="m_phone" placeholder="전화번호를 입력해 주세요." oninput="extractNumbers(this)"/> */}
                            <span id="icon_u_phone" class="input-icon"></span>
                            <span id="message_u_phone" class="input-message">전화번호는 숫자 9~12자까지 입력 가능합니다.</span>
                        </div>

                        <div className='input-wrap'>
                            <div>
                                <input type="text" id="postcode" name="u_zip_code" value={uZipcode} onChange={(e) => userInfoChangeHandler(e)} placeholder="우편번호" readOnly/>
                                <button type="button" id="search_address_btn" onclick="searchAddress()" class="btn sub">
                                    <i class="fa-solid fa-location-crosshairs"></i>
                                </button>
                            </div>

                            <div className='col'>
                                <input type="text" id="address" name="u_first_address" value={uFirstAddr} onChange={(e) => userInfoChangeHandler(e)} placeholder="주소" readOnly/>
                                <input type="text" id="detailAddress" name="u_second_address" value={uSecondAddr} onChange={(e) => userInfoChangeHandler(e)} placeholder="상세주소"/>

                                <span id="icon_u_detail_addr" className="input-icon"></span>
                                <span id="message_u_detail_addr" className="input-message">주소를 입력해 주세요.</span>
                            </div>
                        </div>
                        
                        <div className='input-wrap' id='profile'>
                            <div className="profile-img">               
                                       
                                       {/*<img src={process.env.REACT_APP_SERVER_URL + `/home/ubuntu/user/upload/profile_imgs/${uId}/${uProfile}`} alt="" />*/}
                                       <img src="/imgs/logo/logo.png" alt="밥박사" />
                                       
                            </div>
                            <div>
                                <span id="icon_u_profile" className="input-icon"></span>
                                <span id="message_u_profile" className="input-message">프로필 사진을 선택해 주세요.</span>
                                <input type="file" name="u_profile" value={uProfile} onChange={(e) => userInfoChangeHandler(e)}/>                
                            </div>
                            
                        </div>
                    
                        <div className='btn-wrap'>
                            <button type="button" onClick={modifyBtnClickHandler} className="btn main full">정보수정</button>
                            <Link to = '/user/delete' className="btn sub full" >회원탈퇴</Link>

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

export default Modify;