import axios from "axios";

export const loadFridgeAction = async () => {
    let result = {};

    await axios
        .get(process.env.REACT_APP_REST_SERVER_URL + "/refrigeator")
        .then((data) => {
            result = data.data;
        })
        .catch((err) => {
            return { type: "error" };
        });

    console.log("fridge", result);

    return { type: "set_all_fridge", data: result };
};

export const loadMyFridgeAction = async (uNo) => {
    let list = [];

    await axios
        .get(process.env.REACT_APP_SERVER_URL + "/fridge", {
            params: {
                u_no: uNo,
            },
        })
        .then((data) => {
            data.data.map((el) => {
                list.push(el.ig_no);
            });
        })
        .catch((err) => {
            return { type: "error" };
        });

    console.log("myfridge", list);

    return { type: "set_my_fridge", data: list };
};
