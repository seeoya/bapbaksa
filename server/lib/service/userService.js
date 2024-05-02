const {response}= require('express');
const db = require('../db/db');
const bcrypt = require('bcrypt');
const fs = require('fs');
const path = require('path');
const session = require('express-session');

const userService = {    

    signup_confirm: (req, res) => {
        console.log('/user/signup_confirm()');

        let post = req.body;
        console.log('post:', post);

        console.log("req.file: ", req.file);
        console.log("req.file.filename: ", req.file.filename);        

            
        let sql = `INSERT INTO TBL_USER (u_id, u_pw, u_mail, u_phone, u_zip_code, u_first_address, u_second_address ${req.file !== undefined ? `, pi_name` : `` }) 
        values(?, ?, ?, ? ${req.file !== undefined ? `, ?` : `` })`;

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
                res.json({data:result});

            } else {

                if(req.file !== undefined) {                    

                    db.query(`INSERT INTO TBL_USER_PROFILE_IMG (pi_name, u_no) VALUES(?, ?)`,
                                [req.file.filename, result.insertId], (error, result) => {

                                    res.json({data:result});

                                });
                } else {

                    res.json({data:result});

                }

            }

        }); 
    },



}

module.exports = userService;