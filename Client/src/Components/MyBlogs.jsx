import { useContext, useEffect, useState } from "react"
import LoginContext from "../Context/LoginContext"
import { Link, useNavigate } from "react-router-dom"
import UpdateBlog from "./UpdateBlog"
import { FiEdit2 } from "react-icons/fi";
import { MdDeleteOutline } from "react-icons/md";
import swal from 'sweetalert'

function MyBlogs() {

   let [blogs,setBlogs]=useState([])
   let [userLogin, ]=useContext(LoginContext)
   let navigate=useNavigate()

    useEffect(()=>{
        fetch('http://localhost:3000/api/myBlogs',{
          credentials: 'include'
        })
      .then(res=>res.json())
      .then(data=>{setBlogs(data.data)})
      .catch(err=>console.log('error occured',err))
    },[])

    useEffect(()=>{
      if(!userLogin){
        navigate('/login')
      }
    },[userLogin,navigate])


     let [formData,setFormData]=useState({
        title:'',
        body:'',
        image:''
    })
    let [err,setErr]=useState()
    const [currentId, setCurrentId] = useState(null);

    function handleEdit(id){
      fetch(`http://localhost:3000/api/getBlog/${id}`,{
        credentials: 'include'
      })
      .then(res=>res.json())
      .then((data)=>{
         const blog=data.data
        setFormData({
          title:blog.title,
          body:blog.body,
          image:blog.image
        })
        setCurrentId(id)
        setTimeout(()=>{
        const modal=new bootstrap.Modal(document.getElementById('updateBlogModal'))
        modal.show()
      },0)
      })
      .catch(error=>{setErr(error)})
    }

    function updateBlogInList(updatedBlog) {
    setBlogs(prevBlogs =>
    prevBlogs.map(blog => (blog._id === updatedBlog._id ? updatedBlog : blog))
    );
  }

    function handleDelete(id){
      fetch(`http://localhost:3000/api/delBlog/${id}`,{
        method:'DELETE',
        credentials:'include'
      })
      .then(res=>res.json())
      .then(data=>{
        
        // alert(data.message)
        swal('success',`${data.message}`,'success')
        setBlogs(prevBlogs=>prevBlogs.filter(blog=>blog._id!==id))
      })
      .catch(err=>console.log('error occured',err))

    }

  return (
    <div className="app-wrapper row p-2">
      
      {
        userLogin?(
          blogs.map(blog=>(
            
          <div key={blog._id} className='col-12 col-sm-6 col-md-4 mb-4 my-blogs '>
              <div className="card bg-dark text-light border-0 h-100 position-relative  overflow-hidden  my-card">
                <img className='card-img-top' src={blog.image} alt={blog.title} 
                style={{  height: '200px', objectFit: 'cover', borderRadius: '10px'  }} />

              <div className="card-overlay d-flex flex-row justify-content-center align-items-center">
                <button className="btn btn-sm btn-warning me-2" onClick={()=>{handleEdit(blog._id)}} ><FiEdit2/> Edit</button>
                <button className="btn btn-sm btn-danger" onClick={()=>{handleDelete(blog._id)}} ><MdDeleteOutline size={20}/> Delete</button>
              </div>

                <div className="card-body">
                  <h4 className='card-title' >{blog.title}</h4>
                  <hr />
                  <p className="card-text fw-lighter">{new Date(blog.createdAt).toLocaleDateString('en-US',{
                  year:'numeric',
                  month:'long',
                  day:'numeric'
                  })}</p>
                </div>
              </div>
              {userLogin && <UpdateBlog formData={formData} setFormData={setFormData} err={err} setErr={setErr} id={currentId} onUpdate={updateBlogInList} />}
          </div>
        ))
        ):(
          <>
          <h1>Please Login</h1>
          <button><Link to='/login'>Login</Link></button>
          </>
        )
      }
       
    </div>
  )
}

export default MyBlogs