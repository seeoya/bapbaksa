import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { getToken } from "../storage/loginedToken";

export const AllFridgeQuery = () => {
    return useQuery({
        queryKey: ["all_fridge"],
        queryFn: async () => {
            return await axios
                .get(process.env.REACT_APP_REST_SERVER_URL + "/refrigeator")
                .then((data) => {
                    return data.data;
                });
        },
        staleTime: Infinity,
        gcTime: 1000 * 60 * 30,
        refetchInterval: 1000 * 60 * 30,
    });
};

export const MyFridgeQuery = () => {
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
