export const fridge = (state = {}, action) => {
    switch (action.type) {
        case "view_state":
            console.log({ ...state });
            return { ...state, name: "가나다" };

        case "load_all_fridge":
            return { ...state, allFridge: action.data };

        case "load_my_fridge":
            return { ...state, myFridge: action.data };

        case "insert_my_fridge":
            return { ...state, abc: "12345" };

        case "delete_my_fridge":
            return { ...state, abc: "12345" };

        case "error":
            
        default:
            console.log("REDUCER ACTION ERROR");
            return { ...state };
    }
};
