var AES = require("crypto-js/aes");
var ENC = require("crypto-js/enc-utf8");
const Order = require("../models/Order");
const SECRET = "F.2(H\Kv/MvXCR&G!!B.Zf9c";

exports.generateLinkToken = (orderId, companyId) => {
    const tokenFor = `${orderId}+${companyId}`;
    const linkToken = AES.encrypt(tokenFor, SECRET).toString();
    return linkToken;
}

exports.verifyLinkToken = async (token) => {
    const bytes = AES.decrypt(token, SECRET);
    const tokenFor = bytes.toString(ENC);
    const [orderId, companyId] = tokenFor.split('+');

    return await Order.findOne({
        companyId,
        orderId
    }).then((order) => {
        return order
    }).catch((err) => {
        return null;
    })
}