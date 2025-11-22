import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {toast, ToastContainer} from 'react-toastify'
import LoginContext from '../Context/LoginContext'
import '../App.css'

function Login() {
    let[userLogin,SetUserLogin]=useContext(LoginContext)
    let [err,setErr]=useState('')
    let navigate=useNavigate()
    let [formData,setFormData]=useState({
        email:'',
        password:''
    })

    function handleChange(e){
        setFormData({
            ...formData,
            [e.target.name]:e.target.value
        })
    }

   async function handleSubmit(e){
    e.preventDefault()
    try {
        const response=await fetch('http://localhost:3000/api/login',{
            method:'POST',
            headers:{
                'Content-type':'application/JSON'
            },
            credentials: 'include',
            body:JSON.stringify(formData)
        })
        const data = await response.json();
        if(response.status==200){
            SetUserLogin(true)
            toast.success('User Logged in Succesfully')
            navigate('/')
        }
            setErr(data)
    } catch (error) {
        console.log('Error occuredd',err)
    }
    }
  return (
    <div className="signin-page app-wrapper">
    <div className='container d-flex justify-content-center align-items-center'>
        <form onSubmit={handleSubmit}  >
            <h1 className='title text-center mb-4' >Login</h1>
            <div className=" mb-3  ">
                <label htmlFor="email" className="form-label">Email</label>
                <input className='form-control' type="email" name='email' value={formData.email} onChange={handleChange} />
            </div>

            <div className="input-form">
                <label className='form-label'  >Password</label>
                <input className='form-control'  type="password" name='password' value={formData.password} onChange={handleChange} />
            </div>

             {err?.message && <p className="text-danger">{err.message}</p>}
             <p className='mt-3' >
                Don't have an account? <Link to='/signup' className='text-info text-decoration-none' >Register Here</Link></p>
             <button type="submit" className="btn btn-success w-100 mt-2">Login</button>
        </form>
        {/* <ToastContainer/> */}
    </div>
    </div> 
  )
}

export default Login