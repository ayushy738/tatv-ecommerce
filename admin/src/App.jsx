import { useEffect, useState } from 'react'
import Add from './pages/Add'
import List from './pages/List'
import Orders from './pages/Orders'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import './App.css'
import Navbar from './components/Navbar'
import Login from './components/Login'
import Sidebar from './components/Sidebar'
import { Routes, Route } from 'react-router-dom'
export const backendUrl = import.meta.env.VITE_BACKEND_URL
export const currency = "₹"

function App() {
  const [token, setToken] = useState(localStorage.getItem('token') || '');
  useEffect(() => {
    localStorage.setItem('token', token);
  }, [token]);
  return (
    <div className='min-h-screen bg-gray-100'>
      <ToastContainer />
      {token === ""
        ? <Login setToken={setToken} /> :
        <>
          <>
            <Navbar setToken={setToken} />
            <div className="flex">
              <Sidebar />
              <div className="flex-1 px-4 py-6 text-gray-600 text-base">
                <Routes>
                  <Route path="/add" element={<Add token={token} />} />
                  <Route path="/" element={<Add token={token} />} />
                  <Route path="/list" element={<List token={token} />} />
                  <Route path="/orders" element={<Orders token={token} />} />
                  <Route path="*" element={<div>404 - Not Found</div>} />
                </Routes>
              </div>
            </div>
          </>
        </>
      }
    </div>
  )
}

export default App
