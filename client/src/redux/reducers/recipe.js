export const recipe = (state = {}, action) => {
    switch (action.type) {
        case "view_state":
            console.log({ ...state });
            return { ...state, name: "가나다" };

        case "recipe_search_change":
            return { ...state, search: action.data };

        case "error":
            break;

        default:
            console.log("REDUCER ACTION ERROR");
            return { ...state };
    }
};
