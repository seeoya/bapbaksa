import axios from "axios";

export const loadRecipeAction = async (param) => {
    let result = {};

    await axios
        .get(process.env.REACT_APP_REST_SERVER_URL + "/recipe", {
            params: param,
        })
        .then((data) => {
            result = data.data;
        })
        .catch((err) => {
            return { type: "error" };
        });

    return { type: "load_recipe", data: result };
};

export const searchRecipe = (param) => {
    return { type: "recipe_search_change", data: param };
};
