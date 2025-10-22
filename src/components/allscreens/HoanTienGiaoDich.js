// Node v10.15.3
const axios = require('axios').default; // npm install axios
const CryptoJS = require('crypto-js'); // npm install crypto-js
const moment = require('moment'); // npm install moment

const config = {
    app_id: "2553",
    key1: "PcY4iZIKFCIdgZvA6ueMcMHHUbRLYjPL",
    key2: "kLtgPl8HHhfvMuDHPwKfgfsY4Ydm9eIz",
    refund_url: "https://sb-openapi.zalopay.vn/v2/refund"
};

const timestamp = Date.now();
const uid = `${timestamp}${Math.floor(111 + Math.random() * 999)}`; // unique id

let params = {
    app_id: config.app_id,
    m_refund_id: `${moment().format('YYMMDD')}_${config.app_id}_${uid}`,
    timestamp, // miliseconds
    zp_trans_id: '190508000000022',
    amount: '50000',
    description: 'ZaloPay Refund Demo',
};

// app_id|zp_trans_id|amount|description|timestamp
let data = params.app_id + "|" + params.zp_trans_id + "|" + params.amount + "|" + params.description + "|" + params.timestamp;
params.mac = CryptoJS.HmacSHA256(data, config.key1).toString();

axios.post(config.refund_url, null, { params })
    .then(res => console.log(res.data))
    .catch(err => console.log(err));