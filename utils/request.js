const axios = require("axios");

exports.request = async function({
    endpoint,
    method = "get",
    getParams = {},
    headers = { "Content-Type": "text-plain" },
    callback = () => {},
    timeout = 0,
    data = ""
} = {}) {
    var config = {
        method: method,
        url: endpoint,
        headers: headers,
        data: data,
    };
    console.log(headers)
    return await axios(config)
};


const testRequest = () => {
    var data = JSON.stringify({
        "login_id": "admin@gmail.com",
        "password": "geek12345"
    });
    request({
        method: "get",
        headers: { 'Content-Type': 'application/json', 'authorization': 'asfasfasfsf' },
        endpoint: "http://localhost:3000",
        data: data
    }).then(data => {
        console.log(data)
    })
}