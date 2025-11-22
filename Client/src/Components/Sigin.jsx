import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import '../App.css'
import { toast } from 'react-toastify'

function Sigin() {
    let navigate=useNavigate()
    const [formData,setFormData]=useState({
        name:'',
        email:'',
        password:''
    })

    let [err,setErr]=useState()

    function handleChange(e){
        setFormData({
            ...formData,
            [e.target.name]:e.target.value
        })
    }

    const handleSubmit=async(e)=>{
        e.preventDefault()
        try {
            const response=await fetch('http://localhost:3000/api/register',{
                method:'POST',
                headers:{
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            })
             const data = await response.json();
            setErr(data)
            if(response.status==201){
                toast.success('User created successfully')
                navigate('/login')
            }
        } catch (error) {
            console.error('Error:', err);
        }
    }

  return (
    <div className="signin-page app-wrapper">
        <div className="container d-flex justify-content-center align-items-center">
            <form onSubmit={handleSubmit}  >
             <h1 className='title title text-center mb-4' >SignIn</h1>
            <div className="mb-3">
                <label className='form-label'>Username</label>
                <input className='form-control' type="text" placeholder='Enter your name' name='name' value={formData.name} onChange={handleChange} />
            </div>

             <div className="mb-3">
                <label className='form-label' >Email</label>
               <input className='form-control' type="email" name='email' value={formData.email} onChange={handleChange} placeholder='Enter your email'  />
            </div>
            
            <div className="mb-3">
                <label className='form-label' >Password</label>
               <input className='form-control'  type="password" name='password' value={formData.password} onChange={handleChange}  placeholder='Enter your password' />
            </div>
           
             {err?.message && <p className="text-danger">{err.message}</p>}
             <p className='mt-3 ' >
                Already have an account?<Link to='/login' className='text-info text-decoration-none' > Sign in Here</Link>
            </p>
            <button type="submit" className="btn btn-success w-100 mt-2">Signup</button>
            </form>
        </div>
    </div>
  )
}

export default Sigin