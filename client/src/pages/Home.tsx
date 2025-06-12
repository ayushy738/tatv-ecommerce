import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContent } from '../context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';

// Types for user data
interface UserData {
  name: string;
  email: string;
  isAccountVerified: boolean;
}

const Home: React.FC = () => {
  const navigate = useNavigate();

  const {
    userData,
    backendUrl,
    setIsLoggedin,
    setUserData,
  } = useContext(AppContent) as {
    userData: UserData | null;
    backendUrl: string;
    setIsLoggedin: (status: boolean) => void;
    setUserData: (data: UserData | null) => void;
  };

  const sendVerificationOtp = async () => {
    try {
      axios.defaults.withCredentials = true;
      const { data } = await axios.post(`${backendUrl}/api/auth/send-verify-otp`, {
        email: userData?.email,
      });


      if (data.message === 'OTP sent successfully') {
        navigate('/verify-account', { state: { email: userData?.email } });
        toast.success('Verification OTP sent to your email');
      } else {
        toast.error(data.message || 'Failed to send verification');
      }
    } catch (error: any) {
      toast.error(error?.response?.data?.message || 'Failed to send verification OTP');
    }
  };

  const handleLogout = async () => {
    try {
      axios.defaults.withCredentials = true;
      const { data } = await axios.post(`${backendUrl}/api/auth/logout`);
      if (data.message === 'Logout successful') {
        setIsLoggedin(false);
        setUserData(null);
        toast.success('Logout successful');
      }
      navigate('/');
    } catch (error: any) {
      console.error('Logout error:', error);
      toast.error(error?.response?.data?.message || 'Logout failed');
    }
  };

  const handleLogin = () => {
    window.location.href = '/login';
  };

  return (
    <div style={{ minHeight: '100vh', background: '#f5f6fa' }}>
      {/* Navbar */}
      <nav className="w-full p-4 bg-white shadow flex justify-end items-center sticky top-0 z-50">
        {userData ? (
          <div
            className="w-8 h-8 flex justify-center items-center rounded-full
                bg-black text-white relative group"
          >
            {userData.name[0].toUpperCase()}
            <div
              className="absolute hidden group-hover:block top-0 right-0
                    z-10 text-black rounded pt-10"
            >
              <ul className="list-none m-0 p-2 bg-gray-100 text-sm">
                {userData.isAccountVerified ? (
                  <li className="py-1 px-2 hover:bg-gray-200 cursor-pointer">Profile</li>
                ) : (
                  <li
                    className="py-1 px-2 hover:bg-gray-200 cursor-pointer"
                    onClick={sendVerificationOtp}
                  >
                    Verify Account
                  </li>
                )}
                <li
                  onClick={handleLogout}
                  className="py-1 px-2 hover:bg-gray-200 cursor-pointer pr-10"
                >
                  Logout
                </li>
              </ul>
            </div>
          </div>
        ) : (
          <div>
            <button
              onClick={handleLogin}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg text-base cursor-pointer transition hover:bg-blue-700"
            >
              Login
            </button>
          </div>
        )}
      </nav>

      {/* Main Content */}
      <div
        style={{
          minHeight: 'calc(100vh - 64px)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div
          style={{
            background: '#fff',
            padding: '2rem 3rem',
            borderRadius: '12px',
            boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
            textAlign: 'center',
          }}
        >
          <h1 style={{ marginBottom: '1rem', color: '#222' }}>
            Welcome to MERN Auth App
          </h1>
          <p style={{ fontSize: '1.1rem', marginBottom: '1.5rem', color: '#555' }}>
            Hey <b>{userData ? userData.name : 'Guest'}</b>, welcome to the home page!
          </p>
          <p style={{ color: '#888', marginBottom: '2rem' }}>
            This is a protected route, so you must be logged in to see this content.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;
