const nodeMailer = require("nodemailer");
const config = require('../config')
const MailConfig = nodeMailer.createTransport({
    host : 'smtp.gmail.com',
    port : 587,
    secure : false,
    requireTLS : true,
    auth : {
        user : config.Email,
        pass : config.Password
    }
})

var MailOption= {
    from:config.Email,
    subject:"Order Challah sign pad link",
    disableUrlAccess:false
}

const send = (email,token)=>{
    MailConfig.sendMail({
        ...MailOption,
        to:email,
        html:"Order Challah sign pad link <a href='http://localhost:3000/signpad.html?token=" + token + "'>Click Here</a>"
    },function (error, info) {

        if (error) {
            console.warn(error);
        }
        else {
            console.warn('Mail is send', info.response);
        }
    })
}

module.exports  = send;