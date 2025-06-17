import axios from 'axios';
import React, { useContext, useEffect, useState, ChangeEvent, KeyboardEvent, ClipboardEvent, FormEvent } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { AppContent } from '../context/AppContext';
import { toast } from 'react-toastify';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const EmailVerify: React.FC = () => {
  axios.defaults.withCredentials = true;

  const [otp, setOtp] = useState<string[]>(['', '', '', '', '', '']);
  const { backendUrl, isLoggedin, userData, getUserData } = useContext(AppContent);
  const navigate = useNavigate();
  const location = useLocation();

  const handleChange = (e: ChangeEvent<HTMLInputElement>, idx: number) => {
    const value = e.target.value.replace(/[^0-9]/g, '');
    if (value.length > 1) return;
    const newOtp = [...otp];
    newOtp[idx] = value;
    setOtp(newOtp);
    if (value && idx < 5) {
      document.getElementById(`otp-input-${idx + 1}`)?.focus();
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>, idx: number) => {
    if (e.key === 'Backspace' && !otp[idx] && idx > 0) {
      document.getElementById(`otp-input-${idx - 1}`)?.focus();
    }
  };

  const handlePaste = (e: ClipboardEvent<HTMLDivElement>) => {
    e.preventDefault();
    const pasteData = e.clipboardData.getData('text').replace(/[^0-9]/g, '');
    if (pasteData.length !== 6) return;
    const newOtp = pasteData.split('');
    setOtp(newOtp);
    document.getElementById(`otp-input-5`)?.focus();
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const otpValue = otp.filter(d => d !== '').join('');
      const { data } = await axios.post(`${backendUrl}/api/auth/verify-account`, { otp: otpValue });

      if (data.message === "Email verified successfully") {
        toast.success("Email verified successfully");
        await getUserData();
        navigate('/');
      } else {
        toast.error(data.message || "Failed");
      }
    } catch (error: any) {
      console.error("Verification error:", error);
      toast.error(error?.response?.data?.message || "Verification failed");
    }
  };

  useEffect(() => {
    if (isLoggedin && userData?.isAccountVerified) {
      navigate('/');
    }
  }, [isLoggedin, userData]);

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Navbar />
      <div className="flex flex-1 items-center justify-center px-4 m-40">
        <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-lg border border-gray-200 text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Email Verification</h2>
          <p className="text-gray-500 mb-6">Enter the 6-digit code sent to your email.</p>
          <form onSubmit={handleSubmit}>
            <div className="flex justify-center gap-3 mb-6" onPaste={handlePaste}>
              {otp.map((digit, idx) => (
                <input
                  key={idx}
                  id={`otp-input-${idx}`}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleChange(e, idx)}
                  onKeyDown={(e) => handleKeyDown(e, idx)}
                  autoFocus={idx === 0}
                  className="w-12 h-14 text-xl text-center border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                />
              ))}
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-semibold transition duration-200"
            >
              Verify
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EmailVerify;
