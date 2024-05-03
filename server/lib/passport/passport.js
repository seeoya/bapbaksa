const bcrypt = require('bcrypt');
const DB = require('../db/db');
const shortid = require('shortid');

exports.passport = (app) => {

let passport = require('passport');
let LocalStrategy = require('passport-local').Strategy;
//let GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
//let KakaoStrategy = require('passport-kakao').Strategy;

app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function(user, done) {
    console.log('serializeUser: ', user);   

    done(null, user.u_id);
    
});

passport.deserializeUser(function(id, done) {
    console.log('deserializeUser(user.u_id): ', id);    

    done(null, id);

});

passport.use(new LocalStrategy(
    {
        usernameField: 'u_id',
        passwordField: 'u_pw',

    },
    function(username, password, done) {
        console.log('username LocalStrategy:', username);
        console.log('password LocalStrategy:', password);

        DB.query(`SELECT * FROM TBL_USER WHERE U_ID = ?`,
                    [username], (error, user) => {

                        if(error) {
                            return done(error);
                        }

                        if(user.length > 0) {

                            if(bcrypt.compareSync(password, user[0].u_pw)) {

                                return done(null, user[0], {message: 'WELCOME'});
                            
                            } else {

                                return done(null, false, {message: 'INCORRECT USER PASSWORD'});

                            }
                       
                        } else {

                            return done(null, false, {message: 'INCORRECT USER ID'});

                        }

                    });
  
        }
    ));   

    // let googleCredential = require('../config/google.json');
    // passport.use(new GoogleStrategy(        
    //     {
    //         clientID: googleCredential.web.client_id,
    //         clientSecret: googleCredential.web.client_secret,
    //         callbackURL: googleCredential.web.redirect_uris[0]
    //     },
    //     function(accessToken, refreshToken, profile, done) {   // 인증 후
    //         console.log('-----0');
    //         console.log('GoogleStrategy: ', accessToken, refreshToken, profile);
    //         console.log('profile.id ====>', profile.id);
    //         console.log('profile.emails[0].value ====>', profile.emails[0].value);  // google에 로그인한 이메일 정보

    //         let email = profile.emails[0].value;

    //         DB.query(`select * from tbl_member where m_mail = ?`,
    //                 [email], (error, member) => {                        

    //                     if(member.length > 0) {   // google 로그인 허락 + db에 존재하는 경우

    //                         DB.query(`update tbl_member set m_google_id = ? where m_mail = ?`,
    //                                 [profile.id, email],
    //                                  (error, result) => {

    //                                         done(null, member[0]);  // serializeUser.user로 객체 보냄
    //                                 });

    //                     } else {                // google 로그인 허락 + db에 존재하지 않는 경우

    //                         let m_id = shortid.generate();
    //                         let m_pw = shortid.generate();
    //                         let m_mail = email;
    //                         let m_phone = '--';
    //                         let m_google_id = profile.id;

    //                         console.log('====> ', m_id, m_pw, m_mail, m_phone, m_google_id);

    //                         DB.query(`insert into tbl_member (m_id, m_pw, m_mail, m_phone, m_google_id) values(?, ?, ?, ?, ?)`,
    //                                 [m_id, bcrypt.hashSync(m_pw, 10), m_mail, m_phone, m_google_id], (error, result) => {

    //                                     done(null, {M_ID: m_id});

    //                                 });
    //                     }

    //                 });
    //     /*    User.findOrCreate({ 
    //         googleId: profile.id 
    //         }, function (err, user) {
    //         return done(err, user);
    //         });*/
            
    //     }
    // ));


    // app.get('/auth/google',
    //         passport.authenticate('google', {
    //         scope: ['https://www.googleapis.com/auth/plus.login', 'email'] 
    //         }
    //         ));

    // app.get('/auth/google/callback',
    //         passport.authenticate('google', {
    //         failureRedirect: '/member/signin_form'
    //         }),
    //         function (req, res) {
    //             console.log('-----2');
    //             res.redirect('/');
    //         });

   
    // let kakaoCredential = require('../config/kakao.json');
    // passport.use(new KakaoStrategy(
    //     {
    //     clientID : kakaoCredential.kakao.client_id,        
    //     callbackURL : kakaoCredential.kakao.redirect_uris[0]
    //     },
    //     function(accessToken, refreshToken, profile, done) {
    //         console.log('-----0');
    //         console.log('kakaoStrategy: ', accessToken, refreshToken, profile);
    //         console.log('profile.id ====>', profile.id);
           
    //         let id = profile.id;
    //         DB.query(`select * from tbl_member where m_kakao_id = ?`,
    //                 [id], (error, member) => {                        

    //                     if(member.length > 0) {   // kakao 로그인 허락 + db에 존재하는 경우

    //                             done(null, member[0]);                            

    //                     } else {                // kakao 로그인 허락 + db에 존재하지 않는 경우

    //                         let m_id = shortid.generate();
    //                         let m_pw = shortid.generate();
    //                         let m_mail = '--';
    //                         let m_phone = '--';
    //                         let m_kakao_id = profile.id;

    //                         console.log('====> ', m_id, m_pw, m_mail, m_phone, m_kakao_id);

    //                         DB.query(`insert into tbl_member (m_id, m_pw, m_mail, m_phone, m_kakao_id) values(?, ?, ?, ?, ?)`,
    //                                 [m_id, bcrypt.hashSync(m_pw, 10), m_mail, m_phone, m_kakao_id], (error, result) => {

    //                                     done(null, {M_ID: m_id});

    //                                 });
    //                     }

    //                 });

    //     }
    // ))        

    // app.get('/auth/kakao',
    //     passport.authenticate('kakao', {
    //       failureRedirect: '#!/login',
    //     }),
        
    //   )
      
    // app.get('/oauth',
    //     passport.authenticate('kakao', {
    //       failureRedirect: '#!/login',
    //     }),
    //     function (req, res) {
    //         console.log('-----2');
    //         res.redirect('/');
    //     });



    return passport;

}