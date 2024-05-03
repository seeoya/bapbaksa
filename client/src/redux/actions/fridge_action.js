import axios from "axios";

export const loadMyFridgeAction = async (uNo) => {
    let list = [];

    await axios
        .get(process.env.REACT_APP_SERVER_URL + "/fridge", {
            params: {
                u_no: uNo,
            },
        })
        .then((data) => {
            console.log("data: ", data.data);

            data.data.map((el) => {
                list.push(el.ig_no);
            });
        })
        .catch((err) => {
            return { type: "error" };
        })
        .finally((fin) => {
            return { type: "error" };
        });

    return { type: "set_my_fridge", data: list };
};
