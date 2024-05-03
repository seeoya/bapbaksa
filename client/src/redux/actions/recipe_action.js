// import axios from "axios";

// export const loadFridgeAction = async () => {
//     let result = {};

//     await axios
//         .get(process.env.REACT_APP_REST_SERVER_URL + "/refrigeator")
//         .then((data) => {
//             result = data.data;
//         })
//         .catch((err) => {
//             return { type: "error" };
//         });

//     return { type: "set_all_fridge", data: result };
// };
