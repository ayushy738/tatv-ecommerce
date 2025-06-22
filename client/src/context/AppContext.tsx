import axios from "axios";
import { set } from "date-fns";
import {
  createContext,
  useEffect,
  useState,
  ReactNode,
  FC,
} from "react";
import { toast } from "react-toastify";
import { useNavigate } from 'react-router-dom';


// Define User data type
interface UserData {
  name: string;
  email: string;
  isAccountVerified: boolean;
  // Add other properties from your user model as needed
}

// Define context type
interface AppContextType {
  backendUrl: string;
  isLoggedin: boolean;
  setIsLoggedin: (value: boolean) => void;
  userData: UserData | null;
  setUserData: (user: UserData | null) => void;
  getUserData: () => Promise<void>;
  isAccountVerified: boolean;
  token: string;
  setToken: (token: string) => void;
}

// Initial default value
export const AppContent = createContext<AppContextType>({} as AppContextType);

// Props type for provider
interface AppProviderProps {
  children: ReactNode;
}

export const AppContextProvider: FC<AppProviderProps> = ({ children }) => {
  axios.defaults.withCredentials = true;

  const backendUrl = import.meta.env.VITE_BACKEND_URL as string;
  const navigate = useNavigate();

  const [isLoggedin, setIsLoggedin] = useState<boolean>(false);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [token, setToken] = useState<string | null>(null);

  const getAuthState = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/auth/is-auth`);
      if (data.success) {
        setIsLoggedin(true);
        await getUserData();
        console.log(isLoggedin)
      }
    } catch (error: any) {
      if (error?.response?.status !== 401) {
        toast.error(error?.response?.data?.message || "Failed to fetch auth state")
      }
      setIsLoggedin(false);
      console.log(isLoggedin)
    }
  };
const getUserData = async () => {
  try {
    const token = localStorage.getItem("token"); // or sessionStorage, wherever you store it

    if (!token) {
      toast.error("No token found. Please log in again.");
      return;
    }

    const { data } = await axios.get(`${backendUrl}/api/user/data`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (data.success) {
      setUserData(data.user);
    } else {
      toast.error(data.message);
    }
  } catch (error: any) {
    if (error?.response?.status === 401) {
      toast.error("Session expired. Please log in again.");
    } else {
      toast.error(error?.response?.data?.message || "Failed to fetch user data");
    }
  }
};


  useEffect(() => {
    getAuthState();
  }, []);

  const contextValue: AppContextType = {
    backendUrl,
    isLoggedin,
    setIsLoggedin,
    userData,
    setUserData,
    getUserData,
    isAccountVerified: userData?.isAccountVerified || false,
    token,
    setToken,
  };
  useEffect(() => {
    if (token) {
      localStorage.setItem('token', token);
    }
  }, [token]);


  return (
    <AppContent.Provider value={contextValue}>
      {children}
    </AppContent.Provider>
  );
};
