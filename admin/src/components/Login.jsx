import React from 'react'
import { useState } from 'react'
import axios from 'axios'
import { backendUrl } from '../App'
import { toast } from 'react-toastify'

const Login = ({setToken}) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
        const response = await axios.post(backendUrl + '/api/auth/admin',{email,password} );
        if (response.data.success) {
            setToken(response.data.token);
        } else {
            toast.error(response.data.message || "Login failed");
        }
    } catch (error) {
        console.error("Login failed:", error.response?.data || error.message);
        toast.error(error.response?.data?.message || "An error occurred during login");
    }
};

    return (
        <div className="min-h-screen flex items-center justify-center w-full">
            <div className='bg-white shadow-md rounded-lg px-8 py-6 max-w-md'>
                <h1 className='text-2xl font-bold mb-4'>Admin Panel</h1>
                <form >
                    <div className='mb-3 min-w-72'>
                        <p className='text-sm font-medium text-gray-700 mb-2'>Email Address</p>
                        <input onChange={(e)=>setEmail(e.target.value)} className='rounded-md w-full px-3 py-2 border border-gray-300 outline-none' type="email" placeholder='your@email.com' required />
                    </div>
                    <div className='mb-3 min-w-72'>
                        <p className='text-sm font-medium text-gray-700 mb-2'>Password</p>
                        <input onChange={(e)=>setPassword(e.target.value)} className='rounded-md w-full px-3 py-2 border border-gray-300 outline-none' type="password" placeholder='Enter your password' required />
                    </div>
                    <button type='Submit' onClick={onSubmitHandler} className='mt-2 w-full px-4 py-2 rounded-md text-white bg-black'>Login</button>
                </form>
            </div>
        </div>
    )
}

export default Login
