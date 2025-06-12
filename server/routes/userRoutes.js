import express from 'express'
import { getUserData } from '../controllers/userController.js'
import userAuth from '../middleware/userAuth.js'

const userRouter = express.Router()

userRouter.get('/data', userAuth, getUserData) // Protected route to get user profile data

export default userRouter