export const recipe = (state = {}, action) => {
    switch (action.type) {
        case "view_state":
            console.log({ ...state });
            return { ...state, name: "가나다" };

        // case "load_recipe_list":
        //     return { ...state, recipeList: action.data };

        case "error":

        default:
            console.log("REDUCER ACTION ERROR");
            return { ...state };
    }
};
