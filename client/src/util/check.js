import axios from "axios";
import { getToken } from "../storage/loginedToken";

export const loginCheck = async () => {
    let u_no = getToken("loginedUNo");
    let u_id = getToken("loginedUId");

    let result = 0;
    await axios
        .get(process.env.REACT_APP_SERVER_URL + "/common/checkUser", {
            params: {
                u_no: u_no,
                u_id: u_id,
            },
        })
        .then((data) => {
            if (data.data[0].u_status) {
                result = data.data[0].u_status;
            } else {
                result = -1;
            }
        })
        .catch((err) => {
            return { type: "error" };
        });

    return result;
};

export const adminCheck = async () => {
    let u_no = getToken("loginedUNo");
    let u_id = getToken("loginedUId");

    let result = 0;
    await axios
        .get(process.env.REACT_APP_SERVER_URL + "/common/checkAdmin", {
            params: {
                u_no: u_no,
                u_id: u_id,
            },
        })
        .then((data) => {
            if (data.data.length > 0) {
                result = 1;
            } else {
                result = -1;
            }
        })
        .catch((err) => {
            return { type: "error" };
        });

    return result;
};
