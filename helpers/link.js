var AES = require("crypto-js/aes");
var ENC = require("crypto-js/enc-utf8");
const Order = require("../models/Order");
const SECRET = "F.2(H\Kv/MvXCR&G!!B.Zf9c";

module.exports.generateLinkToken =  (orderId, companyId) => {
    const tokenFor = `${orderId}+${companyId}`;
    return  AES.encrypt(tokenFor, SECRET).toString();
};

module.exports.verifyLinkToken = async (token) => {
    const bytes = AES.decrypt(token, SECRET);
    const tokenFor = bytes.toString(ENC);
    const [OrderId, CompanyId] = tokenFor.split('+');
    console.log(OrderId,CompanyId);
    return await Order.findOne({
        CompanyId,
        OrderId,
        SignStatus: false,
    }).then((order) => {
        return order
    }).catch((err) => {
        return null;
    })
}