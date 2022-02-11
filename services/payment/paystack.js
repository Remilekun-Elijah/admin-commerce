const path = require('path');
const { request } = require(path.resolve("utils", "request"));
const config = require(path.resolve("utils", "config"));

exports.pay = async function(obj) {
    const { email, amount, number, cvv, phone_number, expiry_year, expiry_month } = obj;

    var data = JSON.stringify({
        "email": email,
        "amount": `${amount}00`,
        "metadata": {
            "custom_fields": [{
                "value": phone_number,
                "display_name": "Number",
                "variable_name": "phone_number"
            }]
        },
        "card": {
            "cvv": cvv,
            "number": number,
            "expiry_month": expiry_month,
            "expiry_year": expiry_year
        }
    });

    const token = `Bearer ${config.paystack_secret}`;

    return await request({
        method: "post",
        headers: { 'Content-Type': 'application/json', 'Authorization': token },
        endpoint: "https://api.paystack.co/charge",
        data: data
    }).then(resp => {
        return resp.data;
    }).catch(err => {
        // console.log(err.response);
        return err.response.data;
    })

}

exports.getOtp = async(obj) => {
    const { otp, reference } = obj;
    let data = { otp, reference };
    return await request({
        method: "post",
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${config.paystack_secret}` },
        endpoint: "https://api.paystack.co/charge/submit_otp",
        data: data
    }).then(resp => {

        return resp.data;
    }).catch(err => {

        return err.response.data;
    });

}