import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const AdminUserView = () => {
    const { no } = useParams();
    const [userInfo, setUserInfo] = useState();

    const [uNo, setUNo] = useState(0);
    const [uId, setUId] = useState('');
    const [uMail, setUMail] = useState('');
    const [uPhone, setUPhone] = useState('');
    const [uZipcode, setUZipCode] = useState('');
    const [uFirstAddr, setUFirstAddr] = useState('');
    const [uSecondAddr, setUSeconAddr] = useState('');

    useEffect(() => {
        initUser()
    }, []);

    useEffect(() => {
        console.log(no);
        initUser();
    }, [no]);

    const initUser = async () => {
        await axios.get(process.env.REACT_APP_SERVER_URL + "/admin/get_user", {
            params: {
                u_no: no
            }
        }).then((data) => {
            let user = data.data[0];
            console.log(user);

            setUserInfo(data.data);
            setUNo(user.u_no);
            setUId(user.u_id);
            setUMail(user.u_mail);
            setUPhone(user.u_phone);
            setUZipCode(user.u_zip_code);
            setUFirstAddr(user.u_firset_address);
            setUSeconAddr(user.u_second_address);
        }).catch((err) => {
            return { type: "error" };
        });
    }


    const userInfoChangeHandler = (e) => {
        let input_name = e.target.name;
        let input_value = e.target.value;

        if (input_name === "u_mail") {
            setUMail(input_value);
        } else if (input_name === "u_phone") {
            setUPhone(input_value);
        } else if (input_name === "u_zip_code") {
            setUZipCode(input_value);
        } else if (input_name === "u_first_address") {
            setUFirstAddr(input_value);
        } else if (input_name === "u_second_address") {
            setUSeconAddr(input_value);
        }
    }


    const modifyBtnClickEvent = async () => {
        console.log(11111);
        if (uMail === '') {
            alert('이메일을 입력해 주세요');
            document.getElementById("u_mail").focus();
        } else if (uPhone === '') {
            alert('휴대폰 번호를 입력해 주세요');
            document.getElementById("u_phone").focus();
        } else {
            await axios.put(process.env.REACT_APP_SERVER_URL + `/admin/user`, {
                data: {
                    "u_no": uNo,
                    "u_id": uId,
                    "u_mail": uMail,
                    "u_phone": uPhone,
                    "u_zip_code": uZipcode ?? "",
                    "u_first_addr": uFirstAddr ?? "",
                    "u_second_addr": uSecondAddr ?? ""
                }
            })
                .then(res => {
                    console.log('res: ', res);

                    if (res.data && Number(parseInt(res.data.affectedRows)) > 0) {
                        alert('정보수정에 성공하였습니다.');
                        initUser();
                    }
                })
                .catch(error => {
                    alert('정보수정에 실패하였습니다.');
                })

        }

    }
    return (
        <>
            <div className='title user-info'>
                {
                    uNo && uId ?
                        <>{uId}({uNo}) 님 정보</>
                        : <>회원을 찾을 수 없습니다.</>
                }
            </div>

            {userInfo ?
                <div className='content user-info'>
                    <div className='input-wrap'>
                        <label htmlFor="u_id">아이디</label>
                        <input type="text" id="u_id" name="u_id" defaultValue={uId} onChange={(e) => userInfoChangeHandler(e)} className='input' readOnly />
                    </div>

                    <div className='input-wrap'>
                        <label htmlFor="u_mail">이메일</label>
                        <input type="text" id='u_mail' name="u_mail" defaultValue={uMail} onChange={(e) => userInfoChangeHandler(e)} className='input' placeholder="이메일 주소를 입력해 주세요" />
                        <span id="icon_u_mail" class="input-icon"></span>
                        <span id="message_u_mail" class="input-message">유효한 이메일 주소를 입력해 주세요.</span>
                    </div>

                    <div className='input-wrap'>
                        <label htmlFor="u_phone">연락처</label>
                        <input type="text" id='u_phone' name="u_phone" defaultValue={uPhone} onChange={(e) => userInfoChangeHandler(e)} className='input' placeholder="휴대폰 번호를 입력해 주세요" />
                        <span id="icon_u_phone" class="input-icon"></span>
                        <span id="message_u_phone" class="input-message">전화번호는 숫자 9~12자까지 입력 가능합니다.</span>
                    </div>

                    <div className='input-wrap'>
                        <label htmlFor="search_address_btn">주소</label>

                        <div className='address'>
                            <input type="text" id="postcode" name="u_zip_code" defaultValue={uZipcode} onChange={(e) => userInfoChangeHandler(e)} className='input' placeholder="우편번호" readOnly />
                            <button type="button" id="search_address_btn" onclick="searchAddress()" class="btn sub">
                                <FontAwesomeIcon icon="fa-solid fa-location-crosshairs" />
                            </button>
                        </div>

                        <div className='col'>
                            <input type="text" id="address" name="u_first_address" defaultValue={uFirstAddr} onChange={(e) => userInfoChangeHandler(e)} className='input' placeholder="주소" readOnly />
                            <input type="text" id="detailAddress" name="u_second_address" defaultValue={uSecondAddr} onChange={(e) => userInfoChangeHandler(e)} className='input' placeholder="상세주소" />

                            <span id="icon_u_detail_addr" className="input-icon"></span>
                        </div>
                    </div>

                    <div className='input-wrap btn-wrap'>
                        <button type='button' className='btn main' onClick={(e) => modifyBtnClickEvent()}>수정</button>
                    </div>

                </div>
                : <div className='content'>회원 정보가 없습니다.</div>}
        </>
    );
};

export default AdminUserView;