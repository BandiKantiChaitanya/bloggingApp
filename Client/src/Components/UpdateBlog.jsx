import React, { useState } from 'react'
import { toast } from 'react-toastify';

function UpdateBlog({formData, setFormData, err,setErr,id,onUpdate}) {
    
   
     function handleChange(e){
        setFormData({
            ...formData,
            [e.target.name]:e.target.value
        })
    }

    function handleImageChange(e) {
      setFormData({
        ...formData,
        image: e.target.files[0], 
        });
    }

    async function handleSubmit(e){
        e.preventDefault()
        try {
          const form = new FormData();
          form.append('title', formData.title);
          form.append('body', formData.body);

           if (formData.image && typeof formData.image !== 'string') {
            form.append('image', formData.image);
          }
            const response=await fetch(`http://localhost:3000/api/editBlog/${id}`,{
                method:'PUT',
                credentials:'include',
                body:form
            })
            const data=await response.json()
            setErr(data)
            if (onUpdate) {
                onUpdate(data.updatedBlog);
                toast.success('Blog updated successfully')
            }
            if (!data.error) {
            
            // Clear form and close modal
            setFormData({ title: '', body: '' ,image:''});
            const modalInstance = bootstrap.Modal.getInstance(document.getElementById('updateBlogModal'));
            modalInstance.hide();
            }
        } catch (error) {
            console.log('Error Occured',error)
        }
    }
   
  return (
    <div>
         <div className="modal fade modal-box" id="updateBlogModal" tabIndex="-1">
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content bg-dark text-white">
              <div className="modal-header border-0">
                <h5 className="modal-title text-center w-100" id="updateBlogModal">Edit Blog</h5>
                <button type="button" className="btn-close btn-close-white" data-bs-dismiss="modal" ></button>
              </div>
              <div className="modal-body">
                <form onSubmit={handleSubmit}>
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

                  {formData.image && (
                    <>
                    <p>Uploaded Image</p>
                    <img
                    src={typeof formData.image === 'string' 
                      ? formData.image 
                      : URL.createObjectURL(formData.image)}
                      alt="Preview"
                      style={{ width: '100%', height: '100px', objectFit: 'cover', marginBottom: '10px' }}/>
                      </>
                  )}  
                  

                  <div className="mb-3">
                    <label htmlFor="image" className='form-label'>Image</label>
                    <input className='form-control bg-dark text-white border-light' type="file" name="image" id="image"   onChange={handleImageChange} />
                  </div>

                  {err?.message && <p className="text-danger">{err.message}</p>}

                  <button type="submit" className="btn btnSubmit w-100">
                    Update
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
    </div>
  )
}

export default UpdateBlog