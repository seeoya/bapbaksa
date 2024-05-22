const db = require("../db/db");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

const KEY = JWT_SECRET_KEY;

exports.makeToken = (Object) => {
    const token = jwt.sign(Object, KEY, { expiresIn: "60m" });

    return token;
};

exports.makeRefreshToken = () => {
    const refreshToken = jwt.sign({}, KEY, {
        algorithm: "HS256",
        expiresIn: "365days",
    });

    return refreshToken;
};

exports.refreshVerify = (token, u_id) => {
    db.query(
        `select u_refresh_token from tbl_user where u_id = ?`,
        [u_id],
        (error, refreshToken) => {
            if (refreshToken.length > 0) {
                if (refreshToken[0].u_refresh_token === token) {
                    let result = this.verify(token);

                    return result;
                } else {
                    return false;
                }
            } else {
                return false;
            }
        }
    );
};

exports.verify = (token) => {
    try {
        const verified = jwt.verify(token, KEY);
        const decoded = jwt.decode(token);

        if (decoded.id) {
            return {
                ok: true,
                id: verified.id,
            };
        } else {
            return {
                ok: false,
                id: verified.id,
            };
        }
    } catch (error) {
        return {
            ok: false,
            message: error.message,
        };
    }
};
