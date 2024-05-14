import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { getToken } from "../storage/loginedToken";

export const AllFridgeQuery = () => {
    console.log("모든 냉장고 재료 query");

    return useQuery({
        queryKey: ["all_fridge"],
        queryFn: async () => {
            return await axios
                .get(process.env.REACT_APP_REST_SERVER_URL + "/refrigeator")
                .then((data) => {
                    console.log("all", data.data);
                    return data.data;
                });
        },
        staleTime: Infinity,
        gcTime: 1000 * 60 * 30,
        refetchInterval: 1000 * 60 * 30,
    });
};

export const MyFridgeQuery = () => {
    console.log("내 냉장고 query");

    return useQuery({
        queryKey: ["fridge"],
        queryFn: async () => {
            return await axios
                .get(process.env.REACT_APP_SERVER_URL + "/fridge", {
                    params: {
                        u_no: getToken("loginedUNo"),
                    },
                })
                .then((data) => {
                    return data.data;
                });
        },
        staleTime: 0,
        gcTime: 1000 * 30,
        refetchInterval: 1000 * 30,
    });
};

export const AddMyFridgeQuery = () => {
    console.log("내 냉장고 추가");
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (no) => {
            return await axios
                .post(process.env.REACT_APP_SERVER_URL + "/fridge/add", {
                    data: {
                        u_no: getToken("loginedUNo"),
                        rf_no: no,
                    },
                })
                .then((data) => {
                    return data.data.status;
                });
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["fridge"] });
        },
    });
};

export const DeleteMyFridgeQuery = () => {
    console.log("내 냉장고 제거");
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (no) => {
            return await axios
                .delete(process.env.REACT_APP_SERVER_URL + "/fridge/delete", {
                    data: { u_no: getToken("loginedUNo"), rf_no: no },
                })
                .then((data) => {
                    return data.data.status;
                });
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["fridge"] });
        },
    });
};
