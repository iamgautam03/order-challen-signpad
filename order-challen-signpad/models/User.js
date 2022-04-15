const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserSchema = new Schema({
    // CompanyId : {
    //     type: mongoose.Types.ObjectId,
    //     required: true,
    //     unique: true,
    //     index: true,
    // },
    Email: {
        type: String,
        required: true,
        unique: true,
    },
    Password: {
        type: String,
        required: true
    },
    BusinessName: {
        type: String,
        required: true
    },
    BusinessAddress: {
        type: String,
        required: true
    },
    GSTIN: {
        type: String
    },
}, { timestamps: true });

const User = mongoose.model('User', UserSchema);

module.exports = User;