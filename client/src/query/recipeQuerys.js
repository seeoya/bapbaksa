import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const AllRecipeQuery = () => {
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
                    return data.data;
                });
        },
        staleTime: Infinity,
        gcTime: 1000 * 60 * 30,
        refetchInterval: 1000 * 60 * 30,
    });
};
