import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRef } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { AppContent } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";


const Profile: React.FC = () => {
  const navigate = useNavigate();
  const triggerRef = useRef(null);
  const {
    backendUrl,
    isLoggedin,
    setIsLoggedin,
    userData,
    setUserData,
    setToken,
  } = useContext(AppContent) as {
    backendUrl: string;
    isLoggedin: boolean;
    setIsLoggedin: (status: boolean) => void;
    userData: any; // Adjust type as needed
    setUserData: (data: any) => void;
    token: string;
    setToken: (token: string) => void; // Adjust type as needed
  };

  const isLoggedIn = !!userData;

  const handleLogout = async () => {
    try {
      axios.defaults.withCredentials = true;
      const { data } = await axios.post(`${backendUrl}/api/auth/logout`);
      if (data.message === "Logout successful") {
        setIsLoggedin(false);
        setUserData(null);
        localStorage.removeItem("token");
        setToken('') // Clear token from local storage
        toast.success("Logout successful");
        navigate("/login");
      }
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Logout failed");
    }
  };

  interface SendVerificationResponse {
    message: string;
  }

  interface UserData {
    name: string;
    email: string;
    isAccountVerified: boolean;
    // Add other user fields as needed
  }

  const handleSendVerification = async (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    e.preventDefault();
    (triggerRef.current as HTMLElement)?.blur();
    try {
      axios.defaults.withCredentials = true;
      const { data } = await axios.post<SendVerificationResponse>(
        `${backendUrl}/api/auth/send-verify-otp`,
        {
          email: (userData as UserData)?.email,
        }
      );
      if (data.message === "OTP sent successfully") {
        toast.success("OTP sent to your email.");
        navigate("/verify-account", {
          state: { email: userData?.email },
        });


      } else {
        toast.error(data.message || "Verification failed");
      }
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Could not send verification");
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild ref={triggerRef}>
        <Button variant="outline" size="icon">
          <User className="h-5 w-5" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        {isLoggedIn ? (
          <>
            <DropdownMenuLabel>Hello, {userData?.name}</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {!userData.isAccountVerified && (
              <DropdownMenuItem onClick={handleSendVerification}>
                🔐 Verify Account
              </DropdownMenuItem>
            )}
            <DropdownMenuItem asChild>
              <Link to="/orders">🛍 My Orders</Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link to="/wishlist">❤️ Wishlist</Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout}>🚪 Logout</DropdownMenuItem>
          </>
        ) : (
          <>
            <DropdownMenuLabel>Welcome to Tatv</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link to="/login">🔑 Login / Register</Link>
            </DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default Profile;
