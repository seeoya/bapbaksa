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

    return { type: "load_all_fridge", data: result };
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

    return { type: "load_my_fridge", data: list };
};

export const initIngreDivineAction = (allFridgeList, myFridgeList) => {
    if (allFridgeList && myFridgeList) {
        console.log("initIngreDivineAction");

        let tmpList = [];
        let tmpList2 = Object.keys(myFridgeList).map((el) => {
            return parseInt(el);
        });

        Object.keys(allFridgeList).map((el) => {
            if (!tmpList2.includes(parseInt(el))) {
                tmpList.push(parseInt(el));
            }
        });

        tmpList.sort((a, b) => {
            return allFridgeList[a].RF_NAME > allFridgeList[b].RF_NAME
                ? 1
                : allFridgeList[a].RF_NAME < allFridgeList[b].RF_NAME
                ? -1
                : 0;
        });
        tmpList2.sort((a, b) => {
            return allFridgeList[a].RF_NAME > allFridgeList[b].RF_NAME
                ? 1
                : allFridgeList[a].RF_NAME < allFridgeList[b].RF_NAME
                ? -1
                : 0;
        });

        return {
            type: "init_ingre_divine",
            data: {
                myFridgeState: tmpList2,
                notMyFridgeState: tmpList,
            },
        };
    } else {
        return {
            type: "error",
        };
    }
};
