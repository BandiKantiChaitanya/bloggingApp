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

function App() {
 
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
      </Routes>
      <ToastContainer className='mt-5' autoClose={2000} />
      <Footer/>
    </>
  )
}

export default App