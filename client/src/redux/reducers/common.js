export const common = (state = {}, action) => {
    switch (action.type) {
        case "set_loading":
            console.log(action.data);
            return { ...state, isLoading: action.data };

        case "error":
        default:
            console.log("REDUCER ACTION ERROR");
            return { ...state };
    }
};
