
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContent } from '../context/AppContext';
import { toast } from 'react-toastify';

export const useAuthCheck = () => {
  const navigate = useNavigate();
  const { isLoggedin } = useContext(AppContent);

  const requireAuth = (action: string = 'perform this action') => {
    if (!isLoggedin) {
      toast.error(`Please login to ${action}`);
      navigate('/login');
      return false;
    }
    return true;
  };

  return { isLoggedin, requireAuth };
};
