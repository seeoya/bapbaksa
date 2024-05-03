export const recipe = (state = {}, action) => {
    switch (action.type) {
        case "view_state":
            console.log({ ...state });
            return { ...state, name: "가나다" };

        case "set_all_fridge":
            return { ...state, allFridge: action.data };

        case "set_my_fridge":
            return { ...state, myFridge: action.data };

        case "insert_my_fridge":
            return { ...state, abc: "12345" };

        case "delete_my_fridge":
            return { ...state, abc: "12345" };

        case "load_category":
            return { ...state, category: { 1: "한식" } };
        case "error":
        default:
            console.log("REDUCER ACTION ERROR");
            return { ...state };
    }
};
