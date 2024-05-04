import axios from "axios";

axios.defaults.withCredentials = true;

export const fridgeReducer = (state = {}, action) => {
    switch (action.type) {
        case "view_state":
            console.log({ ...state });
            return { ...state };

        case "add_state":
            return { ...state, abc: "12345" };

        case "set_all_fridge":
            break;

        case "set_my_fridge":
            let data = action.data;

            return { ...state, MyFridge: data };
        default:
            return { ...state };
            break;
    }
};
