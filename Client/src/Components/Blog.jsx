import React, { useEffect, useState } from 'react'

function Blog({currentId}) {
    let [blog,setBlog]=useState([])

    useEffect(()=>{

        if(!currentId) return ;

        async function handleBlog(){
            try {
                 const response= await fetch(`http://localhost:3000/api/getBlog/${currentId}`,{
                    method:'GET',
                    credentials:'include'
                })
                const data= await response.json()
                setBlog(data.data)
            } catch (error) {
                console.error('Failed to fetch blog:', err);
                setBlog(null);
            }
            // console.log(blog)
    }
    handleBlog()
    },[currentId])
    
    function handleClose(){
        const modalInstance=bootstrap.Modal.getInstance(document.getElementById('blogModal'))
        modalInstance.hide()
    }
  return (
    <div>
         <div className="modal fade" id="blogModal" tabIndex="-1">
            <div className="modal-dialog modal-xl  modal-dialog-centered modal-dialog-scrollable">
                <div className="modal-content bg-dark text-light">
                        <button type="button" className="btn-close btn-close-white ms-auto p-3" data-bs-dismiss="modal" onClick={handleClose}  ></button>
                    <div className="modal-body">
                         <div  className='card bg-dark text-light border-0 p-3'>
                            <div className="row ">
                                <div className=" col-12 col-md-6">
                                    <img className='img-fluid rounded-start h-100 w-100 ' src={blog.image} alt={blog.title} style={{maxHeight: '800px', objectFit: 'cover',borderRadius:'10px' }} />
                                </div>
                            <div className="col-12 col-md-6 d-flex flex-column justify-content-center"> 
                                    <h3 className='card-title' >{blog.title}</h3>
                                    <p style={{ lineHeight: '1.8' }}>{blog.body}</p>
                                    <p className='text-end' ><i>~ {blog.userId?.name}</i></p>
                            </div>
                            </div>
                         </div>
                    </div>
                </div>
            </div>
         </div>
    </div>
  )
}

export default Blog