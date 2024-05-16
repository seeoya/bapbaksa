import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const AllRecipeQuery = () => {
    console.log("레시피 query");

    return useQuery({
        queryKey: ["all_recipe"],
        queryFn: async () => {
            return await axios
                .get(process.env.REACT_APP_REST_SERVER_URL + "/recipe", {
                    params: {
                        type: "list",
                    },
                })
                .then((data) => {
                    console.log("all---", data.data);
                    return data.data;
                });
        },
        staleTime: Infinity,
        gcTime: 1000 * 60 * 30,
        refetchInterval: 1000 * 60 * 30,
    });
};
