const coolsms = require('coolsms-node-sdk').default;
require('dotenv').config();
const $ = require('jquery');

const {COOLSMS_API_KEY, COOLSMS_API_SECRET } = process.env;

exports.sendSmsForID = async (phone, id) => {
    console.log('sendSmsForID()');

    let phoneNum = phone.replaceAll('-', '');
    console.log('🧨🧨🧨', phoneNum);
    
    let response = '';

    const idMessageService = new coolsms(COOLSMS_API_KEY, COOLSMS_API_SECRET);
    const result = await idMessageService.sendOne({
        to: `${phone}`,
        from : '01090191957',
        text : `안녕하세요. 요청하신 Bapbaksa 아이디는 [${id}]입니다.`
    }).then(res => {
        console.log(res)
        response = res.statusCode;

    }).catch(err => console.error(err));    

    console.log('🎀🎀', response);

    return response === '2000' ? 'ok' : null;
    
}

exports.sendSmsForPW = async (phone, pw) => {
    console.log('sendSmsForID()');

    let phoneNum = phone.replaceAll('-', '');
    console.log('🧨🧨🧨', phoneNum);

    let response = '';

    const idMessageService = new coolsms(COOLSMS_API_KEY, COOLSMS_API_SECRET);
    const result = await idMessageService.sendOne({
        to: `${phone}`,
        from : '01090191957',
        text : `안녕하세요. 요청하신 Bapbaksa 임시 비밀번호는 [${pw}]입니다.`
    }).then(res => {
        console.log(res)
        response = res.statusCode;   

    }).catch(err => console.error(err));    

    console.log('🎁🎁', response);
    console.log('👓👓', response === '2000');

    return response === '2000' ? 'ok' : null;
}