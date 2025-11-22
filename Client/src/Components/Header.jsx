import React, { useContext, useRef } from 'react'
import '../App.css'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import LoginContext from '../Context/LoginContext'
import AddBlogs from './AddBlogs'
import { toast } from 'react-toastify'

function Header() {
  let [userLogin,SetUserLogin]=useContext(LoginContext)
  let navigate=useNavigate()

  function handleLogin(){
    navigate('/login')
  }

  function handleLogout(){
    swal({
      title: "",
      text: "Are you sure you want to logout?",
      icon: "warning",
      buttons: ["Cancel", "Logout"],
      dangerMode: true,
    }).then((willLogout) => {
      if (willLogout) {
        fetch('http://localhost:3000/api/logout',{
          credentials:"include"
        })
        .then((res)=>{
          if(res.ok){
            SetUserLogin(false)
            swal("Logged out!", {
            icon: "success",
            timer: 1500,
            buttons: false
          })
          navigate('/')
          }else{
            swal("Error logging out!", {
              icon: "error",
            })
          }
        })
      .catch(err=>{console.log('Error occured',err)})
      }
    });
    
  }

  function handleCreateBlog(){
    if(userLogin){
      setTimeout(() => {
      const modal = new bootstrap.Modal(document.getElementById('addBlogModal'));
      modal.show();
    }, 0)
    }else{
      navigate('/login')
    }
  }
  return (
    <>
    <header>
        <nav className='navbar navbar-expand-lg navbar-dark bg-dark fixed-top ' >
          <a className="navbar-brand" onClick={()=>{navigate('/')}}><p>Ozagi</p></a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className='navbar-nav ms-auto' >
              <li className='nav-item'>
                <NavLink to='/' className='nav-link'  > Home</NavLink>
              </li>
              <li className='nav-item'>
                <button className='nav-link btn btn-link text-white' onClick={handleCreateBlog}>
                    Create Blog
                </button>
              </li>
              
              {
                  userLogin?(
                    <>
                      
                    <li className='nav-item' >
                      <NavLink to='/myblogs' className='nav-link'   >My Blogs</NavLink>
                    </li>
                    <li className="nav-item">
                      <NavLink  to='/about' className='nav-link' >About us</NavLink>
                    </li>
                    <li className="nav-item">
                      <button className='nav-link btn' onClick={handleLogout} >Logout</button>
                    </li>
                    </>
                  ):(
                    <>
                    <li className="nav-item">
                      <NavLink  to='/about' className='nav-link' >About us</NavLink>
                    </li>
                    <li className="nav-item">
                      <button className='nav-link btn' onClick={handleLogin}>Login</button>
                    </li>
                    </>
                  )
                }

            </ul>
          </div>
        </nav>
    </header>
    {userLogin && <AddBlogs />}
    </>
  )
}

export default Header