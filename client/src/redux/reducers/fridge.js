export const fridge = (state = {}, action) => {
    switch (action.type) {
        case "view_state":
            console.log({ ...state });
            return { ...state, name: "가나다" };
        case "add_state":
            return { ...state, abc: "12345" };

        case "set_all_fridge":
            break;

        case "set_my_fridge":
            let data = action.data;

            return { ...state, MyFridge: data };
            break;
        default:
            return { ...state };
            break;
    }
};
