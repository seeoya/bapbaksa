const bcrypt = require("bcrypt");
const DB = require("../db/db");
const shortid = require("shortid");

exports.passport = (app) => {
    let passport = require("passport");
    let LocalStrategy = require("passport-local").Strategy;

    app.use(passport.initialize());
    app.use(passport.session());

    passport.serializeUser(function (user, done) {
        done(null, user.u_id);
    });

    passport.deserializeUser(function (id, done) {
        done(null, id);
    });

    passport.use(
        new LocalStrategy(
            {
                usernameField: "u_id",
                passwordField: "u_pw",
            },
            function (username, password, done) {
                DB.query(`SELECT * FROM TBL_USER WHERE U_ID = ?`, [username], (error, user) => {
                    if (error) {
                        return done(error);
                    }

                    if (user.length > 0) {
                        if (bcrypt.compareSync(password, user[0].u_pw)) {
                            return done(null, user[0], { message: "WELCOME" });
                        } else {
                            return done(null, false, { message: "INCORRECT USER PASSWORD" });
                        }
                    } else {
                        return done(null, false, { message: "INCORRECT USER ID" });
                    }
                });
            }
        )
    );

    return passport;
};
