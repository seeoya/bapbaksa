import axios from "axios";
import { SERVER_URL } from "../../util/url";

export const getSelectedProduct = async (no) => {
        
    let list = '';

    await axios({
        url: `${SERVER_URL.TARGET_URL()}/product/selectedProduct`,
        method: 'post',
        params: {
            'PROD_NO' : no
        }
    })
        .then(res => {
            console.log('res: ', res);
            console.log('res.data: ', res.data);

            if (res.data !== null) {
                console.log('AXIOS SELECT_PROD COMMUNICATION SUCCESS ==> ', res.data);
                list = res.data;
                console.log("!@#!@#", list);
            } else {
                console.log('AXIOS SELECT_PROD COMMUNICATION fail ==> ', res.data);
            }
        })
        .catch(error => {
            console.log('AXIOS SELECT_PROD COMMUNICATION ERROR');

        })
        .finally(data => {
            console.log('AXIOS SELECT_PROD COMMUNICATION FINALLY');

        })
        return { type: "SELECT_PROD" , data: list};
}

export const twelveProduct = async (moreList) => {

    let list = '';

    await axios({
        url: `${SERVER_URL.TARGET_URL()}/product/twelveProduct`,
        method: 'get',
        params: {
            'moreList': moreList
        },
    })
        .then(res => {
            if (res.data !== null) {
                console.log('AXIOS GET_TWELVE_PRODUCT COMMUNICATION SUCCESS ==> ', res.data);
                list = res.data;
            } else {
                console.log('AXIOS GET_TWELVE_PRODUCT COMMUNICATION fail ==> ', res.data);
            }
        })
        .catch(error => {
            console.log('AXIOS GET_TWELVE_PRODUCT COMMUNICATION ERROR');
        })
        .finally(data => {
            console.log('AXIOS GET_TWELVE_PRODUCT COMMUNICATION FINALLY');
        })

    return { type: "GET_TWELVE_PRODUCT", data: list };
}