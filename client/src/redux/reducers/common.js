export const common = (state = {}, action) => {
    switch (action.type) {
        case "set_loading":
            return { ...state, isLoading: action.data };

        case "error":
        default:
            return { ...state };
    }
};
