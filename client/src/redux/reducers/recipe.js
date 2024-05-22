export const recipe = (state = {}, action) => {
    switch (action.type) {
        case "view_state":
            return { ...state, name: "가나다" };

        case "recipe_search_change":
            return { ...state, search: action.data };

        case "error":
            break;

        default:
            return { ...state };
    }
};
