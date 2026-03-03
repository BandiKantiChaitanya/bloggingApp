import React from 'react'
import './App.css'
import { Route, Routes, useNavigate } from 'react-router-dom'
import Sigin from './Components/Sigin'
import Login from './Components/Login'
import Home from './Components/Home'
import AddBlogs from './Components/AddBlogs'
import MyBlogs from './Components/MyBlogs'
import Header from './Components/Header'
import './App.css'
import About from './Components/About'
import Footer from './Components/Footer'
import ScrollToTop from './Components/ScrollToTop'
import { ToastContainer } from 'react-toastify'
import { useState } from 'react'
import { useEffect } from 'react'
import NotFound from './Components/NotFound'

function App() {
 
  const [backendStatus, setBackendStatus] = useState({
    online: true,
    timestamp: null,
  })
  const API_BASE = import.meta.env.VITE_API_URL
  
  useEffect(() => {
    let wasOffline = !backendStatus.online;

    const checkHealth = async () => {
      try {
        const res = await fetch(`${API_BASE}/health`);
        if (!res.ok) throw new Error("Backend error");

        const data = await res.json();

        // If previously offline and now online → reload
        if (!backendStatus.online) {
          window.location.reload();
        }

        setBackendStatus({ online: true, timestamp: data.timestamp });
        wasOffline = false;
      } catch {
        setBackendStatus({ online: false, timestamp: null });
        wasOffline = true;
      }
    };

    checkHealth();
    const interval = setInterval(checkHealth, 5000);

    return () => clearInterval(interval);
  }, [API_BASE, backendStatus.online]);

  
  return (

    <>
      <Header/>
      <ScrollToTop/>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/signup' element={<Sigin/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/addblog' element={<AddBlogs/>} />
        <Route path='/myblogs' element={<MyBlogs/>} />
        <Route path='/about' element={<About/>} />
        <Route path='*' element={<NotFound/>}/>
      </Routes>
      <ToastContainer className='mt-5' autoClose={2000} />
      <Footer/>
    </>
  )
}

export default App