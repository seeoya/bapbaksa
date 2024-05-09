import axios from "axios";

export const twelveProduct = async (newPordDate, number, search, page) => {
    let list = '';

    console.log("💟💟💟💟💟",number);
    console.log("✡✡✡✡✡✡✡✡",page);
    await axios({
        url: process.env.REACT_APP_REST_SERVER_URL + "/product/",
        method: 'get',
        params: {
            // 최신 날짜 항목만 불러옴
            'newProdDate': newPordDate, 
            // 탄수, 채소 등 필터 번호
            'filterNumber': number, 
            // 검색어
            'searchValue': search, 
             // 페이지
            'page': page,
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