import React, { useContext, useState, FormEvent, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContent} from '../context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import personIcon from '../assets/person_icon.svg'; 
import mailIcon from '../assets/mail_icon.svg'; 
import lockIcon from '../assets/lock_icon.svg'; 
import Navbar from '../components/Navbar';
import Footer from '@/components/Footer';

type AuthState = 'Sign Up' | 'Login';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const { backendUrl, setIsLoggedin, getUserData,setToken } = useContext(AppContent) as {
    backendUrl: string;
    setIsLoggedin: (status: boolean) => void;
    getUserData: () => Promise<void>;
    token: string;
    setToken: (token: string) => void;
  };

  const [state, setState] = useState<AuthState>('Login');
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const onSubmitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      axios.defaults.withCredentials = true;
      
      if (state === 'Sign Up') {
        const { data } = await axios.post(`${backendUrl}/api/auth/register`, {
          name,
          email,
          password,
        });
        
        if (data.message === 'User registered successfully') {
          setIsLoggedin(true);
          setToken(data.token);
          
          localStorage.setItem('token',data.token) // Set token in context
          await getUserData();
          toast.success('Registration successful');
          navigate('/');
        } else {
          toast.error(data.message || 'Registration failed');
        }
      } else {
        const { data } = await axios.post(`${backendUrl}/api/auth/login`, {
          email,
          password,
        });
     
        if (data.success) {
          setIsLoggedin(true);
          setToken(data.token);
          
          localStorage.setItem('token',data.token) 
          
          await getUserData();
          toast.success('Login successful');
          navigate('/');
        } else {
          toast.error(data.message || 'Login failed');
        }
      }
    } catch (error: any) {
      console.error('Login Error:', error);
      toast.error(error?.response?.data?.message || 'Something went wrong');
    }
  };
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setToken(token);
      setIsLoggedin(true);
      getUserData();
      navigate('/');
    }
  }, [setIsLoggedin, getUserData, setToken]);

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />
      <div className="flex-1 flex items-center justify-center px-4 mb-40 mt-40">
        <div className="bg-white shadow-xl rounded-xl p-8 w-full max-w-md border border-gray-200">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-1">
            {state === 'Sign Up' ? 'Create Account' : 'Welcome Back'}
          </h2>
          <p className="mb-6 text-center text-gray-500">
            {state === 'Sign Up' ? 'Join us by creating your account.' : 'Login to continue.'}
          </p>

          <form className="space-y-5" onSubmit={onSubmitHandler}>
            {state === 'Sign Up' && (
              <div className="flex items-center border rounded-lg px-4 py-2 focus-within:ring-2 ring-blue-300">
                <img src={personIcon} alt="Person Icon" className="w-5 h-5 mr-2" />
                <input
                  onChange={(e) => setName(e.target.value)}
                  value={name}
                  type="text"
                  placeholder="Full Name"
                  required
                  className="w-full outline-none bg-transparent text-sm text-gray-700"
                />
              </div>
            )}
            <div className="flex items-center border rounded-lg px-4 py-2 focus-within:ring-2 ring-blue-300">
              <img src={mailIcon} alt="Mail Icon" className="w-5 h-5 mr-2" />
              <input
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                type="email"
                placeholder="Email"
                required
                className="w-full outline-none bg-transparent text-sm text-gray-700"
              />
            </div>
            <div className="flex items-center border rounded-lg px-4 py-2 focus-within:ring-2 ring-blue-300">
              <img src={lockIcon} alt="Lock Icon" className="w-5 h-5 mr-2" />
              <input
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                type="password"
                placeholder="Password"
                required
                className="w-full outline-none bg-transparent text-sm text-gray-700"
              />
            </div>

            {state === 'Login' && (
              <div className="text-right">
                <p
                  onClick={() => navigate('/reset-password')}
                  className="text-sm text-blue-600 hover:underline cursor-pointer"
                >
                  Forgot password?
                </p>
              </div>
            )}

            {state === 'Sign Up' && (
              <p className="text-xs text-gray-500 text-center leading-5">
                By signing up, you agree to our{' '}
                <span className="text-blue-600 underline cursor-pointer">Terms</span> and{' '}
                <span className="text-blue-600 underline cursor-pointer">Privacy Policy</span>.
              </p>
            )}

            <button
              type="submit"
              className="w-full bg-blue-600 text-white font-semibold py-2 rounded-lg hover:bg-blue-700 transition duration-200"
            >
              {state === 'Sign Up' ? 'Sign Up' : 'Login'}
            </button>
          </form>

          <div className="text-center mt-6">
            {state === 'Sign Up' ? (
              <p className="text-sm text-gray-600">
                Already have an account?{' '}
                <span
                  className="text-blue-600 hover:underline cursor-pointer font-medium"
                  onClick={() => setState('Login')}
                >
                  Login here
                </span>
              </p>
            ) : (
              <p className="text-sm text-gray-600">
                Don't have an account?{' '}
                <span
                  className="text-blue-600 hover:underline cursor-pointer font-medium"
                  onClick={() => setState('Sign Up')}
                >
                  Sign Up
                </span>
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
