require('dotenv').config();
const nodemailer = require('nodemailer');

const { NODEMAILER_USER, NODEMAILER_SECRET } = process.env;
const logoUrl = "http://localhost:3000/imgs/logo/logo.png";
const signinUrl = "http://localhost:3000/user/signin";


const transPorter = nodemailer.createTransport({

    service: 'gmail',    
    auth: {
        user: NODEMAILER_USER,
        pass: NODEMAILER_SECRET
    },        
    secure: false,    
});


exports.sendMailForID = async (email, id) => {
    console.log('sendMailForID()');

    let html = "<div style='width: 600px; margin: 20px auto; padding: 30px 50px; border: 1 solid #8fc769; border-radius: 5px; box-shadow: 0 4 8 rgba(0, 0, 0, 0.1);'>"
               + "<div style='display: flex; justify-content: center;'>"
               + "<img src='"+ logoUrl +"' alt='Logo' style='margin: 0 0 20px; max-block-size: 80px;'>"
               + "<span style='margin-left: 10px; font-size: 2rem; font-weight: 700; line-height: 60px; align-items: center;'>Bapbaksa 아이디 찾기</span></div>"
               + "<h2 style='color: #333; text-align: center; margin: 0 0 30px'>아이디 : " + id + "</h2></div>"
		       
   
    const message = {
        
        from: "bapbaksa",
        to: email,
        subject: 'Bapbaksa에서 아이디를 알려드립니다.',
        html: html,
             
    };
    
     
    let result = await transPorter.sendMail(message, (err, info) => {

        if(err) {
            console.error('err', err);
            return null;
        }
   
        console.log('ok', info);
        return info.response;
    });
   
    return result;
}

exports.sendMailForPW = async (email, pw) => {
    console.log('sendMailForPW()');

    
    let html = "<div style='width: 500px; margin: 20px auto; padding: 30px 50px;'>"
               + "<div style='display: flex; justify-content: center;'>"
               + "<img src='"+ logoUrl +"' alt='Logo' style='margin: 0 0 20px; max-block-size: 80px;'></img>"
               + "<span style='margin-left: 10px; font-size: 2rem; font-weight: 600; line-height: 60px; align-items: center;'>Bapbaksa 비밀번호 찾기</span>"
               + "</div>"
               + "<h2 style='color: #333; text-align: center; margin: 0 0 30px'>임시 비밀번호 : " + pw + "</h2>"
               + "<p style='color: #40783e; text-align: center; margin-bottom: 10px;'>아래의 링크를 클릭하여 로그인하세요.</p>"
               + "<p style='font-weight: 700;, color: #555; text-align: center;'>임시 비밀번호로 로그인 하신 후, 반드시 비밀번호를 수정해 주세요.</p>"
               + "<a href='"+ signinUrl +"' style='width: 400px; display: block; margin: 30px auto; text-align: center; padding: 10px 20px; color: #fff; background-color: #6ba543; border-radius: 5px; text-decoration: none;'>로그인하기</a>"
               + "</div>"
   
    const message = {
        
        from: "bapbaksa",
        to: email,
        subject: 'Bapbaksa에서 임시 비밀번호를 알려드립니다.',
        html: html,
    };
    
     
    let result = await transPorter.sendMail(message, (err, info) => {

        if(err) {
            console.error('err', err);
            return null;
        }
   
        console.log('ok', info);
        return info.response;
    });
    
    return result;   

}


