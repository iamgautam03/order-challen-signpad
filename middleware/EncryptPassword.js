const bcrypt = require('bcrypt');
const {hash} = require("bcrypt");

const salt = bcrypt.genSaltSync(10);

const encryptPassword  = (password)=>{
    return bcrypt.hash(password,salt)
        .then(hash=>hash)
        .catch(err=>err);
}

module.exports= encryptPassword;
