const {response}= require('express');
const db = require('../db/db');
const bcrypt = require('bcrypt');
const fs = require('fs');
const path = require('path');
const session = require('express-session');
const jwt = require('jsonwebtoken');

const userService = {    

    signup_confirm: (req, res) => {
        console.log('/user/signup_confirm()');

        let post = req.body;
        console.log('post:', post);

        console.log("req.file: ", req.file);     
        console.log("post.u_id: ", post.u_id);     

            
        let sql = `INSERT INTO TBL_USER (u_id, u_pw, u_mail, u_phone, u_zip_code, u_first_address, u_second_address ${req.file !== undefined ? `, pi_name` : `` }) 
        values(?, ?, ?, ?, ?, ?, ? ${req.file !== undefined ? `, ?` : `` })`;

        let state = [post.u_id, bcrypt.hashSync(post.u_pw, 10), post.u_mail, post.u_phone, post.u_zip_code, post.u_first_address, post.u_second_address];
        if(req.file !== undefined) state.push(req.file.filename);

        db.query(sql, state, (error, result) => {

            if(error){
                if(req.file !== undefined){
                    fs.unlink(`C:\\bapbaksa\\upload\\profile_imgs\\${post.u_id}\\${req.file.filename}`,
//                    fs.unlink(`/home/ubuntu/user/upload/profile_imgs/${post.u_id}/${req.file.filename}`,
                        (error) => {
                            
                        });
                }
                res.json(result);

            } else {

                if(req.file !== undefined) {                    

                    db.query(`INSERT INTO TBL_USER_PROFILE_IMG (pi_name, u_no) VALUES(?, ?)`,
                                [req.file.filename, result.insertId], (error, result) => {

                                    res.json(result);

                                });
                } else {

                    res.json(result, {'userId': post.u_id});

                }

            }

        }); 
    },

    signin_confirm: (req, res) => {
        console.log('/user/signin_confirm()');

        let post = req.body;
        console.log('post:', post);
        console.log("post.u_id: ", post.u_id);     
               
        db.query(`select u_id, u_pw from tbl_user where u_id = ?`,
                 [post.u_id], (error, user) => {

                if(user.length > 0) {

                    if(bcrypt.compareSync(password, user[0].u_pw)) {

                        let token = jwt.sign({name: post.u_id, exp: parseInt(Date.now()/1000) + 30}, key);
                            res.json({token});                    
                        
                    
                    } else {

                        return res.json({message: 'Incorrect user password'});

                    }
                
                } else {

                    return res.json({message: 'Incorrect member Id'});

                }

        });

    },    

    sign_token: (req, res) => {
        console.log('/user/sign_token()');
    },

    modify_form: (req, res) => {
        console.log('/user/modify_form()');

       
    },

    modify_confirm: (req, res) => {
        console.log('/user/modify_confirm()');

        let post = req.body;
        console.log('post:', post);

        console.log("req.file: ", req.file);     
        console.log("post.u_id: ", post.u_id);     

            
        let sql = `update TBL_USER set u_pw = ? , u_mail = ? , u_phone = ? , u_zip_code = ? , u_first_address = ? , u_second_address = ?  ${req.file !== undefined ? `, pi_name = ?` : `` }, u_mod_date = now() 
                   where u_id = ?`;

        let state = [bcrypt.hashSync(post.u_pw, 10), post.u_mail, post.u_phone, post.u_zip_code, post.u_first_address, post.u_second_address];
        if(req.file !== undefined) state.push(req.file.filename);

        db.query(sql, state, (error, result) => {

            if(error){
                if(req.file !== undefined){
                    fs.unlink(`C:\\bapbaksa\\upload\\profile_imgs\\${post.u_id}\\${req.file.filename}`,
//                    fs.unlink(`/home/ubuntu/user/upload/profile_imgs/${post.u_id}/${req.file.filename}`,
                        (error) => {
                            
                        });
                }
                res.json(result);

            } else {

                if(req.file !== undefined) {                    

                    db.query(`update TBL_USER_PROFILE_IMG set pi_name = ?  where u_no = ?) VALUES(?, ?)`,
                                [req.file.filename, post.u_no], (error, result) => {

                                    res.json(result);

                                });
                } else {

                    res.json(result);

                }

            }

        }); 
    },


}

module.exports = userService;