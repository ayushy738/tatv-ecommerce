import express from 'express'
import { adminLogin, isAuthenticated, login, logout, resetPassword, sendResetOtp, sendVerifyOtp, verifyEmail } from '../controllers/authController.js'
import { register } from '../controllers/authController.js' 
import userAuth from '../middleware/userAuth.js'

const authRouter = express.Router()


authRouter.post('/login', login)
authRouter.post('/register', register)
authRouter.post('/logout', logout)
authRouter.post('/send-verify-otp', userAuth,sendVerifyOtp)
authRouter.post('/verify-account', userAuth,verifyEmail)
authRouter.post('/admin',adminLogin)
authRouter.get('/is-auth', userAuth,isAuthenticated)
authRouter.post('/send-reset-otp', sendResetOtp)
authRouter.post('/reset-password', resetPassword)

export default authRouter