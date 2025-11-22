import React, { useEffect, useState } from 'react'
import Blog from './Blog'



function Home() {
  let [currentId,setCurrentId]=useState('')
  let [blogs,setBlogs]=useState([])
  useEffect(()=>{
      fetch('http://localhost:3000/api/allBlogs')
    .then(res=>res.json())
    .then(data=>{
       const sortedBlogs = data.data.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt) // newest first
      );
      setBlogs(sortedBlogs);
      // setBlogs(data.data) 
    })
    .catch(err=>console.log('error occured',err))
  },[])
if (!blogs || blogs.length === 0) return <p className="text-light bg-dark">Loading blogs...</p>;
const [firstBlog, ...otherBlogs] = blogs;
// console.log(blogs)

function handleRead(id){
  setCurrentId(id)
  const modal=new bootstrap.Modal(document.getElementById('blogModal'))
  modal.show()
}

  return (
    <div className='app-wrapper p-3 ml-3'>
       <div  className='card bg-dark text-light mb-5 border-0 p-3' >
            <div className="row g-2 d-flex flex-direction-row main-card">
              <div className="col-md-6 ">
                <img className='img-fluid rounded-start h-100 w-100 object-fit-cover' 
                src={firstBlog.image} alt={firstBlog.title}
                 style={{ maxHeight: '400px', objectFit: 'cover',borderRadius:'10px' }}
                 onClick={()=>{handleRead(firstBlog._id)}} />
              </div>
               <div className="col-md-4 "> 
                <div className="card-body">
                  <p className=" fw-lighter">  {new Date(firstBlog.createdAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                    })} &#9679; {firstBlog.userId?.name} </p> 
                  <h4 className='card-title ' >{firstBlog.title}</h4>
                  <p className='card-text'>{firstBlog.body.split(' ').splice(0,22).join(' ')}</p>
                  <button onClick={()=>{handleRead(firstBlog._id)}} className='readBtn' >Continue Reading...</button>
                </div>
              </div>
            </div>
          </div>
      
          <div className="row">
            {
            otherBlogs.map(blog=>(
            <div key={blog._id} className='col-12 col-sm-6 col-md-4 mb-4 sub-card' onClick={()=>handleRead(blog._id)} >
              <div className="card border-0 h-100 ">
                <img className='card-img-top' src={blog.image} alt={blog.title} 
                style={{  height: '200px', objectFit: 'cover', borderRadius: '10px'  }} />

                <div className="card-body">
                  <h4 className='card-title' >{blog.title}</h4>
                  <hr />
                  <p className="card-text fw-lighter">{new Date(blog.createdAt).toLocaleDateString('en-US',{
                  year:'numeric',
                  month:'long',
                  day:'numeric'
                  })} &#9679; {blog.userId.name}</p>
                </div>
              </div>
          </div>
           ))
          }
          </div>
          <Blog currentId={currentId} />
    </div>
  )
}

export default Home