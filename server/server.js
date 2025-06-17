import cors from 'cors'
import cookieParser from 'cookie-parser'
import 'dotenv/config'
import express from 'express'
import connectDB from './config/mongodb.js'
import authRouter from './routes/authRoutes.js'
import userRouter from './routes/userRoutes.js'
import cartRouter from './routes/cartRoutes.js'
const app = express()
const port = process.env.PORT || 3000
import multer from 'multer' 
import path from 'path'
import dotenv from 'dotenv';
import connectCloudinary from './config/cloudinary.js'
import productRouter from './routes/productRoutes.js'
import orderRouter from './routes/orderRoutes.js'

connectDB()
connectCloudinary()

const allowedOrigins = [
  'http://localhost:8080','http://localhost:8081','https://tatv-ecommerce-frontend.vercel.app/','https://tatv-ecommerce-admin.vercel.app/'
  // 'https://your-production-domain.com', // Replace with your production domain
]

app.use(cors({origin:allowedOrigins,credentials : true}))
app.use(cookieParser())
app.use(express.json())
dotenv.config();

app.get('/', (req, res) => {
  res.send('Hello World!')
})
app.use('/api/auth', authRouter)
app.use('/api/user', userRouter)
app.use('/api/product',productRouter)
app.use('/api/cart', cartRouter)
app.use('/api/order', orderRouter)


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
//mongodb+srv://tatvecommerce:tatv@2025@userdata.3e7suvm.mongodb.net/