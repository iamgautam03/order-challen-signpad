const mongoose = require('mongoose');
const User = require('./UserModel');

const main = async () => {
    await mongoose.connect('mongodb://localhost:27017/Order_challen_signPad');
}
main().then((db) => {
    console.log("Connection Established");
}).catch((err) => {
    console.log(err);
});

const userInfo = {
    Email:"adam&john@gmail.com",
    Password: "adam_john_1234",
    BusinessName: "All India One and Only One Pvt. Ltd.",
    BusinessAddress: "A1-3, International Business Center, Vesu, Surat-395007, Gujarat, India",
    GSTIN:"07AAWFR0503R1ZK"
}

const createUser = async (userInfo) => {
    try {
        const user = await User.create({
            CompanyId: new mongoose.Types.ObjectId(),
            Email : userInfo.Email,
            Password: userInfo.Password,
            BusinessName: userInfo.BusinessName,
            BusinessAddress: userInfo.BusinessAddress,
            GSTIN: userInfo.GSTIN,
        });
        console.log('user created');
        console.log(user);
    }
    catch (err) {
        console.error(err);
    }
}

const findUser = async (email, passsword) => {
    try {
        const user = await User.find({Email: email, Password: passsword});
        if (user.length)
            console.log(user);
        else
            throw new Error('Could not find such user');
    }
    catch (err) {
        console.error(err);
    }
}

console.log("Creating New User:");
createUser(userInfo);

console.log("Finding User By Email and Password (i.e Login):");
findUser("adam_john@gmail.com", "adam_john_1234");