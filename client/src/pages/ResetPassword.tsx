import React, { useContext, useState, ChangeEvent, KeyboardEvent, ClipboardEvent, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContent } from '../context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const ResetPassword: React.FC = () => {
  const navigate = useNavigate();
  const { backendUrl } = useContext(AppContent);
  axios.defaults.withCredentials = true;

  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState<string[]>(['', '', '', '', '', '']);
  const [newOtp, setNewOtp] = useState<string>('');
  const [newPassword, setNewPassword] = useState('');
  const [isEmailSent, setIsEmailSent] = useState(false);
  const [isOtpSubmited, setIsOtpSubmited] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>, idx: number) => {
    const value = e.target.value.replace(/[^0-9]/g, '');
    if (value.length > 1) return;
    const newOtpArray = [...otp];
    newOtpArray[idx] = value;
    setOtp(newOtpArray);
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
    const newOtpArray = pasteData.split('');
    setOtp(newOtpArray);
    document.getElementById(`otp-input-5`)?.focus();
  };

  const onSubmitEmail = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(`${backendUrl}/api/auth/send-reset-otp`, { email });
      if (data.message === 'Reset OTP sent successfully') {
        setIsEmailSent(true);
        toast.success("OTP sent to your email");
      } else {
        toast.error(data.message || "Failed to send OTP");
      }
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Failed to send OTP");
    }
  };

  const onSubmitOtp = (e: FormEvent) => {
    e.preventDefault();
    const otpValue = otp.join('');
    setNewOtp(otpValue);
    setIsOtpSubmited(true);
  };

  const onSubmitNewPassword = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(`${backendUrl}/api/auth/reset-password`, {
        email,
        otp: newOtp,
        newPassword
      });
      if (data.message === 'Password reset successfully') {
        toast.success("Password reset successfully");
        navigate('/login');
      } else {
        toast.error(data.message || "Failed to reset password");
      }
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Failed to reset password");
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />

      <main className="flex-1 flex items-center justify-center px-4 m-40">
        <div className="w-full max-w-md">
          {!isEmailSent && (
            <form onSubmit={onSubmitEmail} className="bg-white p-8 rounded-xl shadow-md space-y-5">
              <h2 className="text-center text-2xl font-semibold text-gray-800">Reset Password</h2>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter registered email"
                required
                className="w-full p-3 border border-gray-300 rounded-md text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="submit"
                className="w-full p-3 bg-blue-600 text-white rounded-md font-semibold hover:bg-blue-700 transition"
              >
                Send Verification OTP
              </button>
              <button
                type="button"
                onClick={() => navigate('/login')}
                className="w-full p-3 border border-blue-600 text-blue-600 rounded-md font-semibold hover:bg-blue-50 transition"
              >
                Back to Login
              </button>
            </form>
          )}

          {isEmailSent && !isOtpSubmited && (
            <form onSubmit={onSubmitOtp} className="bg-white mt-8 p-8 rounded-xl shadow-md flex flex-col items-center space-y-6">
              <h2 className="text-center text-2xl font-semibold text-gray-800">Enter OTP</h2>
              <div className="flex justify-center gap-2" onPaste={handlePaste}>
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
                    className="w-12 h-14 text-2xl text-center border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    autoFocus={idx === 0}
                  />
                ))}
              </div>
              <button
                type="submit"
                className="w-full p-3 bg-blue-600 text-white rounded-md font-semibold hover:bg-blue-700 transition"
              >
                Verify OTP
              </button>
            </form>
          )}

          {isEmailSent && isOtpSubmited && (
            <form onSubmit={onSubmitNewPassword} className="bg-white mt-8 p-8 rounded-xl shadow-md space-y-5">
              <h2 className="text-center text-2xl font-semibold text-gray-800">Set New Password</h2>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Enter new password"
                required
                className="w-full p-3 border border-gray-300 rounded-md text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="submit"
                className="w-full p-3 bg-blue-600 text-white rounded-md font-semibold hover:bg-blue-700 transition"
              >
                Reset Password
              </button>
            </form>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ResetPassword;
