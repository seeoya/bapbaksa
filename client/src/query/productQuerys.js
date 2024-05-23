import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const AllProductQuery = () => {
    return useQuery({
        queryKey: ["all_product"],
        queryFn: async () => {
            return await axios
                .get(process.env.REACT_APP_REST_SERVER_URL + "/product/getAllProduct", {})
                .then((data) => {
                    return data.data;
                });
        },
        staleTime: Infinity,
        gcTime: 1000 * 60 * 30,
        refetchInterval: 1000 * 60 * 30,
    });
};

export const NewProductQuery = () => {
    return useQuery({
        queryKey: ["new_product"],
        queryFn: async () => {
            return await axios
                .get(process.env.REACT_APP_REST_SERVER_URL + "/product/getNewDate", {})
                .then((data) => {
                    return data.data;
                });
        },
        staleTime: Infinity,
        gcTime: 1000 * 60 * 30,
        refetchInterval: 1000 * 60 * 30,
    });
};
