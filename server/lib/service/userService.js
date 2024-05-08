const {response}= require('express');
const db = require('../db/db');
const bcrypt = require('bcrypt');
const fs = require('fs');
const path = require('path');
const session = require('express-session');
const jwt = require('jsonwebtoken');
const tokenUtils = require('../utils/token');

const userService = {    

    signup_confirm: (req, res) => {
        console.log('/user/signup_confirm()');

        let post = req.body;
        console.log('post:', post);

        console.log("req.file: ", req.file);     
        console.log("post.u_id: ", post.u_id);     

            
        let sql = `INSERT INTO TBL_USER (u_id, u_pw, u_mail, u_phone, u_zip_code, u_first_address, u_second_address ${req.file !== undefined ? `, pi_name` : `` }) 
        VALUES(?, ?, ?, ?, ?, ?, ? ${req.file !== undefined ? `, ?` : `` })`;

        let state = [post.u_id, bcrypt.hashSync(post.u_pw, 10), post.u_mail, post.u_phone, post.u_zip_code, post.u_first_address, post.u_second_address];
        if(req.file !== undefined) state.push(req.file.filename);

        db.query(sql, state, (error, result) => {

            if(error){
                if(req.file !== undefined){
                    fs.unlink(`C:\\bapbaksa\\upload\\profile_imgs\\${post.u_id}\\${req.file.filename}`,
                    //fs.unlink(`/home/ubuntu/user/upload/profile_imgs/${post.u_id}/${req.file.filename}`,
                        (error) => {
                            
                        });
                }
                res.json({result, message:"회원가입 실패"});

            } else {

                if(req.file !== undefined) {                    

                    db.query(`INSERT INTO TBL_USER_PROFILE_IMG (pi_name, u_no) VALUES(?, ?)`,
                                [req.file.filename, result.insertId], (error, result) => {

                                    res.json({result, message:"회원가입 성공"});

                                });
                } else {
                    console.log('node===userId: ', post.u_id);
                    res.json({result, message:"회원가입 성공"});

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

            if(error){

            } else {

                console.log('user=====', user);

                if(user !== undefined) {

                    if(bcrypt.compareSync(post.u_pw, user[0].u_pw)) {
 
                        let accessToken = tokenUtils.makeToken({id: post.u_id});
                        console.log("accessToken:", accessToken);
                        let refreshToken = tokenUtils.makeRefreshToken();
                        console.log("refreshToken:", refreshToken);

                        db.query(`UPDATE TBL_USER SET u_refresh_token= ? WHERE u_id = ?`,
                                    [refreshToken, post.u_id], (error, result) => {

                                        if(result.affectedRows > 0){
                                           return res.json({result, uId:post.u_id, uNo:user[0].u_no, accessToken, refreshToken});     

                                        } else {
                                            return res.json({result, message: 'DB 에러! 관리자에게 문의하세요.'});
                                        }

                                    });
                    
                    } else {
                        
                        return res.json({message: '비밀번호가 일치하지 않습니다.'});

                    }
                
                } else {

                    return res.json({message: '아이디가 일치하지 않습니다.'});

                }

            }

        });

    },    

    
    modify_form: (req, res) => {
        console.log('/user/modify_form()');

        let post = req.body;
        console.log('post:', post);
        console.log('req', req.headers.authorization);

        if (req.headers.authorization){
            const accessToken = req.headers.authorization.split(' ')[1]; 
            
            const verified = tokenUtils.verify(accessToken);

            console.log("verified: ", verified);
     
            if(verified.ok){
                let sql = `SELECT * FROM TBL_USER WHERE u_id = ?` 
                let state = post.u_id;        
                db.query(sql, state, (error, user) => {
        
                    if(user.length > 0) {     
                        res.json({user:user[0]});
        
                    } else {
                        res.json({message: '회원정보가 존재하지 않습니다.'});
                    }
                });
                       
            } else {
                res.status(401).send("No authorized!");
            }


        } else {
            res.json({message:"No accessToken!"});
        }
               
    },

    modify_confirm: (req, res) => {
        console.log('/user/modify_confirm()');

        let post = req.body;
        console.log('post:', post);
        console.log("req.file: ", req.file);     
        console.log("post.u_id: ", post.u_id);     

        
        if (req.headers.authorization){
            const accessToken = req.headers.authorization.split(' ')[1]; 
            
            const verified = tokenUtils.verify(accessToken);

            console.log("verified: ", verified);
     
            if(verified.ok){
           
                let sql = `UPDATE TBL_USER SET u_pw = ? , u_mail = ? , u_phone = ? , u_zip_code = ? , u_first_address = ? , u_second_address = ?  ${req.file !== undefined ? `, pi_name = ?` : `` }, u_mod_date = now() 
                        WHERE u_id = ?`;

                let state = [bcrypt.hashSync(post.u_pw, 10), post.u_mail, post.u_phone, post.u_zip_code, post.u_first_address, post.u_second_address];
                if(req.file !== undefined) state.push(req.file.filename);
                state.push(post.u_id);

                db.query(sql, state, (error, result) => {

                    if(error){
                        if(req.file !== undefined){
                            fs.unlink(`C:\\bapbaksa\\upload\\profile_imgs\\${post.u_id}\\${req.file.filename}`,
        //                    fs.unlink(`/home/ubuntu/user/upload/profile_imgs/${post.u_id}/${req.file.filename}`,
                                (error) => {
                                    
                                });
                        }
                        res.json({result, message: '정보수정 실패!'});

                    } else {

                        if(req.file !== undefined) {                    

                            db.query(`UPDATE TBL_USER_PROFILE_IMG SET pi_name = ?  WHERE u_no = ?) VALUES(?, ?)`,
                                        [req.file.filename, post.u_no], (error, result) => {

                                            res.json({result, message: '프로파일 수정 실패!'});

                                        });
                        } else {

                            res.json({result, message: '정보수정 성공!'});

                        }

                    }

                }); 
        
            } else {
                res.status(401).send("No authorized!");
            }

        } else {
            res.json({message:"No accessToken!"});
        }

    },

    delete_confirm: (req, res) => {
        console.log('/user/delete_confirm()');

        let post = req.body;
        console.log('post:', post);        
        console.log("post.u_id: ", post.u_id);     
        console.log("post.u_no: ", post.u_no);     

        if (req.headers.authorization){
            const accessToken = req.headers.authorization.split(' ')[1]; 
            
            const verified = tokenUtils.verify(accessToken);

            console.log("verified: ", verified);
     
            if(verified.ok){
                    
                let sql = `DELETE FROM TBL_USER WHERE u_id = ?`;
                let state = [post.u_id];
                
                db.query(sql, state, (error, result) => {

                    if(error){
                        
                        res.json({result, message: "회원정보 삭제 에러!"});                

                    } else {

                        let sql = `DELETE FROM TBL_USER_PROFILE_IMG WHERE u_no = ?`;
                        let state = [post.u_no];
                        
                        db.query(sql, state, (error, result) => {

                            if(error){

                                res.json({result, message: "프로파일 이미지 삭제 에러!"});


                            } else {

                                fs.unlink(`C:\\bapbaksa\\upload\\profile_imgs\\${post.u_id}`,
                //                fs.unlink(`/home/ubuntu/user/upload/profile_imgs/${post.u_id}`,
                                        (error) => {
                                            
                                        });
                     
                                    res.json({result,  message:  "회원탈퇴 성공"});
                
                            }
                                
                        });
                        res.json({result,  message:  "회원정보 삭제 성공"});
                    } 
                             
                });                

            } else {
                res.status(401).send({message:verified.message});
            }

        } else {
            res.json({message:"No accessToken!"});
        }

    },

    refresh_token: (req, res) => {
        console.log('/user/refresh_token()');

        let post = req.body;
        console.log('post:', post);        
        console.log("post.u_id: ", post.u_id);     
        

        if (req.headers.authorization){
            const refreshToken = req.headers.authorization.split(' ')[1]; 
            
            const verified = tokenUtils.refreshVerify(refreshToken, post.u_id);
            console.log('verified===>', verified);

            if(verified){
                let accessToken = tokenUtils.makeToken({id: post.u_id});
                console.log("accessToken:", accessToken);
                let refreshToken = tokenUtils.makeRefreshToken();
                console.log("refreshToken:", refreshToken);

                
                db.query(`UPDATE TBL_USER SET u_refresh_token= ? WHERE u_id = ?`,
                [refreshToken, post.u_id], (error, result) => {

                    if(result.affectedRows > 0){
                       return res.json({result, uId:post.u_id, accessToken, refreshToken});     

                    } else {
                        return res.json({result, message: 'DB 에러! 관리자에게 문의하세요.'});
                    }

                });
            
            } else {

                res.json({message: 'RefreshToken이 유효하지 않습니다. 로그인이 필요합니다.'});

            }
        }
    },


}

module.exports = userService;