import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    cartData:{
        type:Object,
        default: {}
    },
    verifyOtp : {
        type: String,
        default: ' ',
    },
    verifyOtpExpireAt: {
        type: Number,
        default: 0,
    },
    isAccountVerified: {
        type: Boolean,
        default: false,
    },
    resetOtp: {
        type: String,
        default: ' ',
    },
    resetOtpExpiresAt: {
        type: Number,
        default: 0,
    }
},{minimize:false})

const userModel = mongoose.models.user || mongoose.model('User', userSchema);
export default userModel;