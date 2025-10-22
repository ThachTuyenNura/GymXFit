// Node v10.15.3
const axios = require('axios').default; // npm install axios
const CryptoJS = require('crypto-js'); // npm install crypto-js

const config = {
    app_id: "2553",
    key1: "PcY4iZIKFCIdgZvA6ueMcMHHUbRLYjPL",
    key2: "kLtgPl8HHhfvMuDHPwKfgfsY4Ydm9eIz",
    endpoint: "https://sb-openapi.zalopay.vn/v2/query_refund"
};

const params = {
    app_id: config.app_id,
    timestamp: Date.now(), // miliseconds
    m_refund_id: "190312_2553_123456",
};

const data = config.app_id + "|" + params.m_refund_id + "|" + params.timestamp; // app_id|m_refund_id|timestamp
params.mac = CryptoJS.HmacSHA256(data, config.key1).toString()

axios.post(config.endpoint, null, { params })
    .then(res => console.log(res.data))
    .catch(err => console.log(err));