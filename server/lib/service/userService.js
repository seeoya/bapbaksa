const { response } = require('express');
const db = require('../db/db');
const bcrypt = require('bcrypt');
const fs = require('fs');
const path = require('path');
const jwt = require('jsonwebtoken');
const axios = require('axios');
const tokenUtils = require('../utils/token');
const $ = require('jquery');
const shortid = require('shortid');
const uuid4 = require('uuid4');
const qs = require('querystring');
const nodemailer = require('nodemailer');
const { sendMailForID, sendMailForPW } = require('../utils/mail');
const { sendSmsForID, sendSmsForPW } = require('../utils/sms');
require('dotenv').config();


const GOOGLE_WEB_CLIENT_ID = process.env.GOOGLE_WEB_CLIENT_ID;
const GOOGLE_WEB_CLIENT_SECRET = process.env.GOOGLE_WEB_CLIENT_SECRET;
const GOOGLE_TOKEN_URL = 'https://oauth2.googleapis.com/token';
const GOOGLE_USERINFO_URL = 'https://www.googleapis.com/oauth2/v2/userinfo';

const KAKAO_WEB_CLIENT_ID = process.env.KAKAO_WEB_CLIENT_ID;
const KAKAO_TOKEN_URL = 'https://kauth.kakao.com/oauth/token';
const KAKAO_USERINFO_URL = 'https://kapi.kakao.com/v2/user/me';

const NAVER_WEB_CLIENT_ID = process.env.NAVER_WEB_CLIENT_ID;
const NAVER_WEB_CLIENT_SECRET = process.env.NAVER_WEB_CLIENT_SECRET;
const NAVER_TOKEN_URL = `https://nid.naver.com/oauth2.0/token`;
const NAVER_USERINFO_URL = `https://openapi.naver.com/v1/nid/me`;

const NODEMAILER_USER = process.env.NODEMAILER_USER;
const NODEMAILER_SECRET = process.env.NODEMAILER_SECRET;



const userService = {

    isMember_confirm: (req, res) => {
        console.log('/user/isMember_confirm()');

        let post = req.body;
        console.log('post:', post);

        if(post.u_id !== ''){

            let regex = new RegExp();
            regex = /^(?=.*[a-z])(?=.*[0-9]).{5,20}$/;
            let pass = regex.test(post.u_id);
            console.log('++++++', pass);

            if(pass) {

                db.query(`SELECT * FROM TBL_USER WHERE u_id = ?`,
                    [post.u_id], (error, user) => {
                        console.log('user', user);

                        if (user.length > 0) {
                            res.json({ isMember: true });
                        } else {
                            res.json({ isMember: false });
                        }

                    });

            } else {
                res.json({ pass: false });
            }

        } else {
            res.json({ isMember: null });
        }
    },

    findid_confirm: (req, res) => {
        console.log('/user/findid_confirm()');

        let post = req.body;
        console.log('post:', post);

        if (post.u_mail) {

            let sql = `SELECT * FROM TBL_USER WHERE u_mail = ?`;
            let state = [post.u_mail];

            db.query(sql, state, (error, user) => {
                console.log('user', user);

                if (user.length > 0) {

                    let email = user[0].u_mail;
                    let id = user[0].u_id;

                    let result = sendMailForID(email, id);
                    if (result !== null) {

                        res.json({ findID: true, uId: user[0].u_id });
                    }

                } else {
                    res.json({ findID: false });
                }

            });

        } else if (post.u_phone) {

            let sql = `SELECT * FROM TBL_USER WHERE u_phone = ?`;
            let state = [post.u_phone];

            db.query(sql, state, (error, user) => {
                console.log('user', user);

                if (user.length > 0) {

                    let phone = user[0].u_phone;
                    let id = user[0].u_id;

                    let result = sendSmsForID(phone, id);
                    if (result !== null) {

                        res.json({ findID: true, uId: user[0].u_id });
                    }

                } else {
                    res.json({ findID: false });
                }

            });


        }

    },

    findpw_confirm: async (req, res) => {
        console.log('/user/findpw_confirm()');

        let post = req.body;
        console.log('post:', post);

        if (post.u_mail) {

            let sql = `SELECT * FROM TBL_USER WHERE u_id = ? && u_mail = ?`;
            let state = [post.u_id, post.u_mail];

            db.query(sql, state, (error, user) => {
                console.log('user', user);

                if (user.length > 0) {

                    let email = user[0].u_mail;
                    let pw = shortid.generate();

                    let mailResult = sendMailForPW(email, pw);
                    console.log('🎈🎈🎈', mailResult);

                    if (mailResult !== null) {

                        db.query(`UPDATE TBL_USER SET u_pw = ?, u_mod_date = now() WHERE u_id = ?`,
                            [bcrypt.hashSync(pw, 10), user[0].u_id], (error, result) => {

                                if (result.affectedRows > 0) {
                                    res.json({ findPW: true });
                                }
                            });
                    }

                } else {
                    res.json({ findPW: false });
                }

            });

        } else if (post.u_phone) {

            let sql = `SELECT * FROM TBL_USER WHERE u_id = ? && u_phone = ?`;
            let state = [post.u_id, post.u_phone];

            db.query(sql, state, (error, user) => {
                console.log('user', user);


                if (user.length > 0) {

                    let phone = user[0].u_phone;
                    let pw = shortid.generate();
                    console.log('pw', pw);

                    let smsResult = sendSmsForPW(phone, pw);
                    console.log('🎈🎈🎈', smsResult);


                    if (smsResult !== null) {

                        db.query(`UPDATE TBL_USER SET u_pw = ?, u_mod_date = now() WHERE u_id = ?`,
                            [bcrypt.hashSync(pw, 10), user[0].u_id], (error, result) => {

                                if (result.affectedRows > 0) {
                                    res.json({ findPW: true });
                                }
                            });
                    }

                } else {
                    res.json({ findPW: false });
                }

            });

        }
    },


    signup_confirm: (req, res) => {
        console.log('/user/signup_confirm()');

        let post = req.body;
        console.log('post:', post);

        console.log("req.file: ", req.file);


        let sql = `INSERT INTO TBL_USER (u_id, u_pw, u_mail, u_phone, u_zip_code, u_first_address, u_second_address ${req.file !== undefined ? `, pi_name` : ``}) 
        VALUES(?, ?, ?, ?, ?, ?, ? ${req.file !== undefined ? `, ?` : ``})`;

        let state = [post.u_id, bcrypt.hashSync(post.u_pw, 10), post.u_mail, post.u_phone, post.u_zip_code, post.u_first_address, post.u_second_address];
        if (req.file !== undefined) state.push(req.file.filename);

        db.query(sql, state, (error, result) => {

            if (error) {
                if (req.file !== undefined) {
                    fs.unlink(`C:\\bapbaksa\\upload\\profile_imgs\\${post.u_id}\\${req.file.filename}`,
                        //fs.unlink(`/home/ubuntu/user/upload/profile_imgs/${post.u_id}/${req.file.filename}`,
                        (error) => {

                        });
                }
                res.json({ result, message: "회원가입 실패" });

            } else {

                if (req.file !== undefined) {

                    db.query(`INSERT INTO TBL_USER_PROFILE_IMG (pi_name, u_no) VALUES(?, ?)`,
                        [req.file.filename, result.insertId], (error, result) => {

                            if (!error) {
                                res.json({ result, message: "회원가입 성공" });
                            }

                        });
                } else {
                    console.log('node===userId: ', post.u_id);
                    res.json({ result, message: "회원가입 성공" });

                }

            }

        });
    },

    signin_confirm: (req, res) => {
        console.log('/user/signin_confirm()');

        let post = req.body;
        console.log('post:', post);
        console.log("post.u_id: ", post.u_id);

        db.query(`SELECT * FROM TBL_USER WHERE u_id = ?`,
            [post.u_id], (error, user) => {
                
                if (user[0] !== undefined && user[0].u_id === post.u_id) {                         

                    console.log('user[0]=id', user[0].u_id === post.u_id);
                    
                    if(user[0].u_status === 1 || user[0].u_status === 999) {                                                 

                        if (bcrypt.compareSync(post.u_pw, user[0].u_pw)) {
            
                            let accessToken = tokenUtils.makeToken({ id: post.u_id });
                                    console.log("accessToken:", accessToken);
                            let refreshToken = tokenUtils.makeRefreshToken();
                                    console.log("refreshToken:", refreshToken);

                            db.query(`UPDATE TBL_USER SET u_refresh_token= ? WHERE u_id = ?`,
                                [refreshToken, post.u_id], (error, result) => {

                                    if (result.affectedRows > 0) {
                                        return res.json({ result, uId: post.u_id, uNo: user[0].u_no, accessToken, refreshToken });

                                    } else {
                                        return res.json({ result, message: 'DB 에러! 관리자에게 문의하세요.' });
                                    }

                                });

                        } else {

                            return res.json({ message: '비밀번호가 일치하지 않습니다.' });

                        }

                    } else if (user[0].u_status === 2){

                        return res.json({ message: '계정 정지된 회원입니다. 관리자에게 문의해 주세요.' });

                    }
                    
                } else {
                    return res.json({ message: '아이디가 일치하지 않습니다.' });
                }              

            });

    },


    modify_form: (req, res) => {
        console.log('/user/modify_form()');

        let post = req.body;
        console.log('post:', post);
        console.log('req', req.headers.authorization);

        if (req.headers.authorization) {
            const accessToken = req.headers.authorization.split(' ')[1];

            const verified = tokenUtils.verify(accessToken);

            console.log("verified: ", verified);

            if (verified.ok) {
                let sql = `SELECT * FROM TBL_USER WHERE u_id = ?`
                let state = post.u_id;
                db.query(sql, state, (error, user) => {

                    if (user.length > 0) {
                        res.json({ user: user[0] });

                    } else {
                        res.json({ message: '회원정보가 존재하지 않습니다.' });
                    }
                });

            } else {
                res.status(401).send("No authorized!");
            }


        } else {
            res.json({ message: "No accessToken!" });
        }

    },

    modify_confirm: (req, res) => {
        console.log('/user/modify_confirm()');

        let post = req.body;
        console.log('post:', post);
        console.log("req.file: ", req.file);
        console.log("post.u_id: ", post.u_id);


        if (req.headers.authorization) {
            const accessToken = req.headers.authorization.split(' ')[1];

            const verified = tokenUtils.verify(accessToken);

            console.log("verified: ", verified);

            if (verified.ok) {

                let sql = `UPDATE TBL_USER SET u_pw = ? , u_mail = ? , u_phone = ? , u_zip_code = ? , u_first_address = ? , u_second_address = ?  ${req.file !== undefined ? `, pi_name = ?` : ``}, u_mod_date = now() 
                        WHERE u_id = ?`;

                let state = [bcrypt.hashSync(post.u_pw, 10), post.u_mail, post.u_phone, post.u_zip_code, post.u_first_address, post.u_second_address];

                if (req.file !== undefined) state.push(req.file.filename);
                state.push(post.u_id);

                db.query(sql, state, (error, result) => {

                    if (error) {
                        if (req.file !== undefined) {
                            fs.unlink(`C:\\bapbaksa\\upload\\profile_imgs\\${post.u_id}\\${req.file.filename}`,
                                //                    fs.unlink(`/home/ubuntu/user/upload/profile_imgs/${post.u_id}/${req.file.filename}`,
                                (error) => {

                                });
                        }
                        res.json({ result, message: '정보수정 실패!' });

                    } else {

                        if (req.file !== undefined) {

                            db.query(`SELECT * FROM TBL_USER_PROFILE_IMG WHERE u_no = ?`, [post.u_no], (error, user) => {

                                if (user.length > 0) {

                                    db.query(`UPDATE TBL_USER_PROFILE_IMG SET pi_name = ? WHERE u_no = ?`,
                                        [req.file.filename, post.u_no], (error, result) => {

                                            if (result.affectedRows > 0) {
                                                res.json({ result, message: '정보수정 성공!' });

                                            } else {

                                                res.json({ result, message: '프로파일 수정 실패!' });
                                            }

                                        });

                                } else {

                                    db.query(`INSERT INTO TBL_USER_PROFILE_IMG (pi_name, u_no) VALUES(?, ?)`,
                                        [req.file.filename, post.u_no], (error, result) => {

                                            if (result.affectedRows > 0) {
                                                res.json({ result, message: '정보수정 성공!' });

                                            } else {

                                                res.json({ result, message: '프로파일 수정 실패!' });
                                            }

                                        });

                                }

                            });

                        } else {

                            res.json({ result, message: '정보수정 성공!' });

                        }

                    }

                });

            } else {
                res.status(401).send("No authorized!");
            }

        } else {
            res.json({ message: "No accessToken!" });
        }

    },

    delete_confirm: (req, res) => {
        console.log('/user/delete_confirm()');

        let post = req.body;
        console.log('post:', post);
        console.log("post.u_id: ", post.u_id);
        console.log("post.u_no: ", post.u_no);

        if (req.headers.authorization) {
            const accessToken = req.headers.authorization.split(' ')[1];

            const verified = tokenUtils.verify(accessToken);

            console.log("verified: ", verified);

            if (verified.ok) {

                let now = new Date();
                let year = now.getFullYear();
                let month = now.getMonth() +1;
                    month = "00" + month.toString();                    
                let date = now.getDate();
                    date = "00" + date.toString();

                now = `${year}${month.slice(-2)}${date.slice(-2)}`;                

                console.log('🎗🎗', post.u_id + now);

                let sql = `UPDATE TBL_USER SET u_id = ?, u_mail = ?, u_phone = ?, u_google_id = ?, u_kakao_id = ?, 
                            u_naver_id = ?, u_status = ?, u_zip_code = ?, u_first_address= ?, u_second_address = ?,
                            pi_name = ?, u_refresh_token = ?, u_mod_date = now() WHERE u_id = ?`;
                let state = [post.u_id + now, '', '', '', '', '', 0, '', '', '', '', '', post.u_id];

                db.query(sql, state, (error, result) => {

                    console.log('🎎', result);

                    if (error) {

                        res.json({ message: "회원정보 삭제 에러!" });

                    } else {

                        db.query(`SELECT * FROM  TBL_USER_PROFILE_IMG WHERE u_no = ?`, [post.u_no], (error, user) => {

                            console.log('🎄', user.length);

                            if (user.length > 0) {

                                let sql = `DELETE p, f, r, c FROM TBL_USER_PROFILE_IMG p, TBL_FRIDGE f, TBL_LIKE_RECIPE r, TBL_MARKET_CART c 
                                            WHERE p.u_no = ? AND f.u_no = ? AND r.u_no = ? AND c.u_no = ?`;
                                let state = [post.u_no, post.u_no, post.u_no, post.u_no];

                                db.query(sql, state, (error, result) => {

                                    console.log('🎆', result);

                                    if (error) {
                                        res.json({ message: "회원탈퇴 처리 실패" });
                                    } else {

                                        // fs.rmSync(`/home/ubuntu/user/upload/profile_imgs/${post.u_id}`, { recursive: true, force: true },                                        
                                        fs.rmSync(`C:\\bapbaksa\\upload\\profile_imgs\\${post.u_id}`, { recursive: true, force: true },
                                            (error) => {

                                            });

                                        console.log(`${post.u_id} directory deleted!`);
                                        res.json({ result, message: "회원탈퇴 처리 성공" });
                                    }


                                });


                            } else {

                                let sql = `DELETE FROM f, r, c USING TBL_FRIDGE f, TBL_LIKE_RECIPE r, TBL_MARKET_CART c 
                                        WHERE f.u_no = r.u_no = c.u_no = ?`;
                                let state = [post.u_no];

                                db.query(sql, state, (error, result) => {

                                    console.log('👓', result);

                                    if (error) {
                                        res.json({ message: "회원탈퇴 처리 실패" });
                                    } else {
                                        res.json({ result, message: "회원탈퇴 처리 성공" });
                                    }

                                });

                            }

                        });

                    }

                });

            } else {
                res.status(401).send({ message: verified.message });
            }

        } else {
            res.json({ message: "No accessToken!" });
        }

    },

    refresh_token: (req, res) => {
        console.log('/user/refresh_token()');

        let post = req.body;
        console.log('post:', post);
        console.log("post.u_id: ", post.u_id);


        if (req.headers.authorization) {
            const refreshToken = req.headers.authorization.split(' ')[1];

            const verified = tokenUtils.refreshVerify(refreshToken, post.u_id);
            console.log('verified===>', verified);

            if (verified) {
                let accessToken = tokenUtils.makeToken({ id: post.u_id });
                console.log("accessToken:", accessToken);
                let refreshToken = tokenUtils.makeRefreshToken();
                console.log("refreshToken:", refreshToken);


                db.query(`UPDATE TBL_USER SET u_refresh_token= ? WHERE u_id = ?`,
                    [refreshToken, post.u_id], (error, result) => {

                        if (result.affectedRows > 0) {
                            return res.json({ result, uId: post.u_id, accessToken, refreshToken });

                        } else {
                            return res.json({ result, message: 'DB 에러! 관리자에게 문의하세요.' });
                        }

                    });

            } else {

                res.json({ message: 'RefreshToken이 유효하지 않습니다. 로그인이 필요합니다.' });

            }
        }
    },
    regiest_question: (req, res) => {
        console.log('regiest_question');
        let post = req.body;
        console.log('regiest_question post : ', post);
        db.query(`
        INSERT INTO 
        TBL_USER_QUESTIONS(u_id, o_id, ques_title, ques_detail) 
        VALUES(?, ?, ?, ?)`,
            [post.u_id, post.o_id, post.ques_title, post.ques_detail],
            (error, result) => {
                if (error) {
                    res.json(null);
                } else {
                    res.json(result);
                }
            });
    },
    load_question: (req, res) => {
        let params = req.body;
        db.query(`SELECT * FROM TBL_USER_QUESTIONS WHERE U_ID = ? ORDER BY QUES_NO DESC`,
            [params.u_id],
            (error, result) => {
                if (error) {
                    res.json(null);
                } else {
                    res.json(result);
                }
            });
    },
    order_no: (req, res) => {
        let params = req.body;
        db.query(`SELECT o.O_ID FROM TBL_ORDER o JOIN TBL_USER u ON o.u_no = u.u_no WHERE u.u_id = ?`,
            [params.u_id],
            (error, result) => {
                if (error) {
                    res.json(null);
                } else {
                    res.json(result);
                }
            });
    },
    delete_question: (req, res) => {
        let params = req.body;
        console.log("delete_question params : ", params);
        console.log("delete_question params.ques_no", params.ques_no);
        db.query(`DELETE FROM TBL_USER_QUESTIONS WHERE QUES_NO = ? AND U_ID = ?`,
            [params.ques_no, params.u_id],
            (error, result) => {
                if (error) {
                    res.json(null);
                } else {
                    db.query(`SELECT * FROM TBL_USER_QUESTIONS WHERE U_ID = ? ORDER BY QUES_NO DESC`,
                        [params.u_id],
                        (error, result1) => {
                            if (error) {
                                res.json(null);
                            } else {
                                console.log("load_question result1 : ", result1);
                                res.json(result1);
                            }
                        });
                }
            });
    },
    google_callback: async (req, res) => {
        console.log('/google/callback/google_callback()');

        const GOOGLEID = GOOGLE_WEB_CLIENT_ID;
        const GOOGLESECRET = GOOGLE_WEB_CLIENT_SECRET;
        const GOOGLE_REDIRECT_URI = 'http://localhost:3000/auth/google/callback';


        let post = req.body;
        console.log('post:', post);
        console.log('post.code: ', post.code);
        let code = post.code;
        let google_u_id = '';
        let google_u_mail = '';


        try {
            let response_token = await axios.post(GOOGLE_TOKEN_URL, {
                code,
                client_id: GOOGLEID,
                client_secret: GOOGLESECRET,
                redirect_uri: GOOGLE_REDIRECT_URI,
                grant_type: 'authorization_code',
            });

            console.log('AXIOS GOOGLE GET ACCESS_TOKEN COMMUNICATION SUCCESS', response_token, response_token.data.access_token);

            try {
                let response_user_info = await axios.get(GOOGLE_USERINFO_URL, {
                    headers: {
                        Authorization: `Bearer ${response_token.data.access_token}`,
                    },
                });

                console.log('AXIOS GOOGLE GET USER INFO COMMUNICATION SUCCESS', response_user_info.data);

                google_u_id = response_user_info.data.id;
                google_u_mail = response_user_info.data.email;

            } catch (error) {
                console.log('AXIOS GOOGLE GET USER INFO COMMUNICATION FAIL', error);

            } finally {
                console.log('AXIOS GOOGLE GET USER INFO COMMUNICATION COMPLETE');

            }

        } catch (error) {
            console.log('AXIOS GOOGLE GET ACCESS_TOKEN COMMUNICATION FAIL', error);

        } finally {
            console.log('AXIOS GOOGLE GET ACCESS_TOKEN COMMUNICATION COMPLETE');

        }

        console.log("uid, umail======>", google_u_id, google_u_mail);


        db.query(`SELECT * FROM TBL_USER WHERE u_mail = ?`,
            [google_u_mail], (error, user) => {

                google_u_id = google_u_id;
                google_u_mail = google_u_mail;
                console.log('user', user);

                if (user.length > 0) {

                    db.query(`UPDATE TBL_USER SET u_google_id = ?, u_mod_date = now() WHERE u_id = ?`,
                        [google_u_id, user[0].u_id], (error, result) => {

                            console.log('result:', result);

                            if (result.affectedRows > 0) {

                                let accessToken = tokenUtils.makeToken({ id: user[0].u_id });
                                console.log("accessToken:", accessToken);
                                let refreshToken = tokenUtils.makeRefreshToken();
                                console.log("refreshToken:", refreshToken);

                                db.query(`UPDATE TBL_USER SET u_refresh_token= ? WHERE u_id = ?`,
                                    [refreshToken, user[0].u_id], (error, result) => {

                                        if (result.affectedRows > 0) {
                                            return res.json({ result, uId: user[0].u_id, uNo: user[0].u_no, accessToken, refreshToken });

                                        } else {
                                            return res.json({ result, message: 'DB 에러! 관리자에게 문의하세요.' });
                                        }

                                    });

                            } else {
                                return res.json({ result, message: 'DB 에러! 관리자에게 문의하세요.' });
                            }

                        });

                } else {

                    let u_id = shortid.generate();
                    let u_pw = shortid.generate();
                    let u_mail = google_u_mail;
                    let u_phone = '--';
                    let u_google_id = google_u_id;

                    console.log('====> ', u_id, u_pw, u_mail, u_phone, u_google_id);

                    let accessToken = tokenUtils.makeToken({ id: u_google_id });
                    console.log("accessToken:", accessToken);

                    let refreshToken = tokenUtils.makeRefreshToken();
                    console.log("refreshToken:", refreshToken);


                    db.query(`insert into TBL_USER (u_id, u_pw, u_mail, u_phone, u_google_id, u_refresh_token) values(?, ?, ?, ?, ?, ?)`,
                        [u_id, bcrypt.hashSync(u_pw, 10), u_mail, u_phone, u_google_id, refreshToken], (error, result) => {
                            console.log('result', result);
                            if (result.affectedRows > 0) {
                                return res.json({ result, uId: u_id, uNo: result.insertId, accessToken, refreshToken });
                            } else {
                                return res.json({ result, message: 'DB 에러! 관리자에게 문의하세요.' });
                            }

                        });

                }

            });

    },

    kakao_callback: async (req, res) => {
        console.log('/kakao/callback/kakao_callback()');

        const kakaoid = KAKAO_WEB_CLIENT_ID;

        const KAKAO_REDIRECT_URI = `http://localhost:3000/oauth/kakao/callback`;

        console.log('kakaoid: ', kakaoid);


        let post = req.body;
        console.log('post:', post);
        console.log('post.code: ', post.code);
        let code = post.code;
        let kakao_u_id = '';


        try {
            let response_token = await axios.post(KAKAO_TOKEN_URL, qs.stringify({
                code: code,
                client_id: kakaoid,
                redirect_uri: KAKAO_REDIRECT_URI,
                grant_type: 'authorization_code',
                headers: { 'Content-type': 'application/x-www-form-urlencoded;charset=utf-8' },
            }));

            console.log('AXIOS KAKAO GET ACCESS_TOKEN COMMUNICATION SUCCESS', response_token);

            let access_token = response_token.data.access_token;

            console.log('access_token ===', access_token);


            try {
                let response_user_info = await axios.get(KAKAO_USERINFO_URL, {
                    headers: {
                        Authorization: `Bearer ${access_token}`,
                    },
                });

                console.log('AXIOS KAKAO GET USER INFO COMMUNICATION SUCCESS', response_user_info.data);
                console.log('AXIOS KAKAO GET USER INFO COMMUNICATION SUCCESS', response_user_info.data.properties);


                kakao_u_id = response_user_info.data.id;

            } catch (error) {
                console.log('AXIOS KAKAO GET USER INFO COMMUNICATION FAIL', error);

            } finally {
                console.log('AXIOS KAKAO GET USER INFO COMMUNICATION COMPLETE');

            }

        } catch (error) {
            console.log('AXIOS KAKAO GET ACCESS_TOKEN COMMUNICATION FAIL', error);

        } finally {
            console.log('AXIOS KAKAO GET ACCESS_TOKEN COMMUNICATION COMPLETE');

        }

        console.log("kakao_u_id======>", kakao_u_id);


        db.query(`SELECT * FROM TBL_USER WHERE u_kakao_id = ?`,
            [kakao_u_id], (error, user) => {

                console.log('user', user);

                if (user.length > 0) {

                    let accessToken = tokenUtils.makeToken({ id: user[0].u_id });
                    console.log("accessToken:", accessToken);
                    let refreshToken = tokenUtils.makeRefreshToken();
                    console.log("refreshToken:", refreshToken);

                    db.query(`UPDATE TBL_USER SET u_refresh_token= ? WHERE u_id = ?`,
                        [refreshToken, user[0].u_id], (error, result) => {

                            if (result.affectedRows > 0) {
                                return res.json({ result, uId: user[0].u_id, uNo: user[0].u_no, accessToken, refreshToken });

                            } else {
                                return res.json({ result, message: 'DB 에러! 관리자에게 문의하세요.' });
                            }

                        });

                } else {

                    let u_id = shortid.generate();
                    let u_pw = shortid.generate();
                    let u_mail = '--';
                    let u_phone = '--';
                    let u_kakao_id = kakao_u_id;

                    console.log('====> ', u_id, u_pw, u_mail, u_phone, u_kakao_id);

                    let accessToken = tokenUtils.makeToken({ id: u_kakao_id });
                    console.log("accessToken:", accessToken);

                    let refreshToken = tokenUtils.makeRefreshToken();
                    console.log("refreshToken:", refreshToken);


                    db.query(`insert into TBL_USER (u_id, u_pw, u_mail, u_phone, u_kakao_id, u_refresh_token) values(?, ?, ?, ?, ?, ?)`,
                        [u_id, bcrypt.hashSync(u_pw, 10), u_mail, u_phone, u_kakao_id, refreshToken], (error, result) => {
                            console.log('result', result);
                            if (result.affectedRows > 0) {
                                return res.json({ result, uId: u_id, uNo: result.insertId, accessToken, refreshToken });
                            } else {
                                return res.json({ result, message: 'DB 에러! 관리자에게 문의하세요.' });
                            }

                        });

                }

            });

    },

    naver_callback: async (req, res) => {
        console.log('/kakao/callback/kakao_callback()');

        const naverid = NAVER_WEB_CLIENT_ID;
        const naversecret = NAVER_WEB_CLIENT_SECRET;

        const NAVER_REDIRECT_URI = `http://localhost:3000/oauth/naver/callback`;

        console.log('naverid: ', naverid);


        let post = req.body;
        console.log('post:', post);
        console.log('post.code: ', post.code);
        let code = post.code;
        let state = uuid4();
        let naver_u_id = '';


        try {
            let response_token = await axios.post(NAVER_TOKEN_URL, qs.stringify({
                code: code,
                client_id: naverid,
                client_secret: naversecret,
                redirect_uri: NAVER_REDIRECT_URI,
                state: state,
                grant_type: 'authorization_code',
            }));

            console.log('AXIOS NAVER GET ACCESS_TOKEN COMMUNICATION SUCCESS', response_token);

            let access_token = response_token.data.access_token;

            console.log('access_token ===', access_token);


            try {
                let response_user_info = await axios.get(NAVER_USERINFO_URL, {
                    headers: {
                        Authorization: `Bearer ${access_token}`,
                    },
                });

                console.log('AXIOS NAVER GET USER INFO COMMUNICATION SUCCESS', response_user_info.data);
                console.log('AXIOS NAVER GET USER INFO COMMUNICATION SUCCESS', response_user_info.data.response.id);


                naver_u_id = response_user_info.data.response.id;

            } catch (error) {
                console.log('AXIOS NAVER GET USER INFO COMMUNICATION FAIL', error);

            } finally {
                console.log('AXIOS NAVER GET USER INFO COMMUNICATION COMPLETE');

            }

        } catch (error) {
            console.log('AXIOS NAVER GET ACCESS_TOKEN COMMUNICATION FAIL', error);

        } finally {
            console.log('AXIOS NAVER GET ACCESS_TOKEN COMMUNICATION COMPLETE');

        }

        console.log("uid======>", naver_u_id);


        db.query(`SELECT * FROM TBL_USER WHERE u_naver_id = ?`,
            [naver_u_id], (error, user) => {

                console.log('user', user);

                if (user.length > 0) {

                    let accessToken = tokenUtils.makeToken({ id: user[0].u_id });
                    console.log("accessToken:", accessToken);
                    let refreshToken = tokenUtils.makeRefreshToken();
                    console.log("refreshToken:", refreshToken);

                    db.query(`UPDATE TBL_USER SET u_refresh_token= ? WHERE u_id = ?`,
                        [refreshToken, user[0].u_id], (error, result) => {

                            if (result.affectedRows > 0) {
                                return res.json({ result, uId: user[0].u_id, uNo: user[0].u_no, accessToken, refreshToken });

                            } else {
                                return res.json({ result, message: 'DB 에러! 관리자에게 문의하세요.' });
                            }

                        });

                } else {

                    let u_id = shortid.generate();
                    let u_pw = shortid.generate();
                    let u_mail = '--';
                    let u_phone = '--';
                    let u_naver_id = naver_u_id;

                    console.log('====> ', u_id, u_pw, u_mail, u_phone, u_naver_id);

                    let accessToken = tokenUtils.makeToken({ id: u_naver_id });
                    console.log("accessToken:", accessToken);

                    let refreshToken = tokenUtils.makeRefreshToken();
                    console.log("refreshToken:", refreshToken);


                    db.query(`insert into TBL_USER (u_id, u_pw, u_mail, u_phone, u_naver_id, u_refresh_token) values(?, ?, ?, ?, ?, ?)`,
                        [u_id, bcrypt.hashSync(u_pw, 10), u_mail, u_phone, u_naver_id, refreshToken], (error, result) => {
                            console.log('result', result);
                            if (result.affectedRows > 0) {
                                return res.json({ result, uId: u_id, uNo: result.insertId, accessToken, refreshToken });
                            } else {
                                return res.json({ result, message: 'DB 에러! 관리자에게 문의하세요.' });
                            }

                        });

                }

            });

    },
}

module.exports = userService;