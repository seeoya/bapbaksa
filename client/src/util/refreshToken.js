import axios from "axios";
import { getToken, setToken } from "../storage/loginedToken";

export const getRefreshToken = () => {
    let loginedUId = getToken("loginedUId");
    let refreshToken = getToken("refreshToken");

    let data = {
        u_id: loginedUId,
    };

    axios({
        url: process.env.REACT_APP_SERVER_URL + `/api/user/refresh_token`,
        method: "post",
        data: data,
        headers: { Authorization: `Bearer ${refreshToken}` },
    })
        .then((res) => {
            if (res.data !== null && Number(parseInt(res.data.result.affectedRows)) > 0) {
                let refreshToken = res.data.refreshToken;
                let accessToken = res.data.accessToken;

                setToken("accessToken", accessToken);
                setToken("refreshToken", refreshToken);
                window.history.back();
            } else {
                alert("처리 중 오류가 발생했습니다. 다시 로그인 해주세요.");
            }
        })
        .catch((error) => {})
        .finally((data) => {});
};
