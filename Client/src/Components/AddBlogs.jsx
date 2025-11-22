import React, { useContext, useDebugValue, useEffect, useState } from 'react'
import LoginContext from '../Context/LoginContext'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

function AddBlogs() {
  let [userLogin,]=useContext(LoginContext)
  let [err,setErr]=useState('')
  let [formData,setFormData]=useState({
    title:'',
    body:'',
    image:null
  })

  function handleChange(e){
   setFormData({
     ...formData,
    [e.target.name]:e.target.value
   })
  }

  function handleImageChange(e){
    setFormData({
     ...formData,
    image:e.target.files[0]
   })
  } 


  async function handleSubmit(e){
    e.preventDefault()
    
    try {
      const form = new FormData();
      form.append('title', formData.title);
      form.append('body', formData.body);
      form.append('image', formData.image);
      const response=await fetch('http://localhost:3000/api/createBlog',{
        method:'POST',
        credentials: 'include',
        body:form
      })
      const data=await response.json()
      setErr(data)
      
      
      setTimeout(()=>{
        setErr('')
      },5000)
       if (!data.error) {
        // Clear form and close modal
        setFormData({ title: '', body: '' ,image:null});
        const modalInstance = bootstrap.Modal.getInstance(document.getElementById('addBlogModal'));
        modalInstance.hide();
        toast.success('Blog Created successfully')
        navigate('/myblogs')
      }
     
    } catch (error) {
      console.log('Error Occured',error)
    }
  }

let navigate=useNavigate()

  useEffect(() => {
    if (!userLogin) {
      navigate('/login');
    }
  }, [userLogin, navigate])

  return (
    
    <div >
      {
        userLogin?(
          <>
        {/* Bootstrap Modal */}
        
        <div className="modal fade modal-box" id="addBlogModal" tabIndex="-1" >
          <div className="modal-dialog modal-dialog-centered"  >
            <div className="modal-content bg-dark text-white">
              <div className="modal-header border-0 ">
                <h5 className="modal-title text-center w-100" id="addBlogModalLabel">Add New Blog</h5>
                <button type="button" className="btn-close btn-close-white" data-bs-dismiss="modal" ></button>
              </div>
              <div className="modal-body ">
                <form onSubmit={handleSubmit} className=''>
                  <div className="mb-3">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input
                      type="text"
                      className="form-control bg-dark text-white border-light"
                      id="title"
                      name="title"
                      value={formData.title}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="body" className="form-label">Body</label>
                    <textarea
                      className="form-control bg-dark text-white border-light"
                      id="body"
                      name="body"
                      rows="5"
                      value={formData.body}
                      onChange={handleChange}
                      required
                    ></textarea>
                  </div>
                  
                  <div className="mb-3">
                    <label htmlFor="image" className='form-label bg-dark text-white border-light'>Image</label>
                    <input className='form-control bg-dark text-white border-light' type="file" name="image" id="image" accept='image/*'  onChange={handleImageChange} required/>
                  </div>

                  {err?.message && <p className="text-danger">{err.message}</p>}

                  <button type="submit" className="btn text-light btnSubmit w-100">
                    Submit
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </>
        ):null
      }
      
    </div>
  )
}

export default AddBlogs