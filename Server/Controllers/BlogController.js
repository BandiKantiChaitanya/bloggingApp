const Blogs = require("../Models/Blog")
const cloudinary=require('../Utils/cloudinaryConfig')


const createBlog= async (req,res)=>{
    try {
        const {title,body}=req.body
        // console.log(req.session)
        const userId=req.session.userId
        // console.log('req.file:', req.file);
        if (!req.file || !req.file.path) {
            return res.status(400).json({ message: 'Image upload failed.' });
        }
        const newBlog=new Blogs({
            title,
            body,
            image:req.file.path,
            imagePublicId: req.file.filename,
            userId
        })

        await newBlog.save()
        res.status(200).json({message:'Blog has be created successfully'})
        // .then(response=>{
        //     res.status(200).json({message:'Blog has be created successfully'})
        // })
        // .catch(err=>{
        //     console.error(err);
        //     res.status(400).json({message:'Error occured in creating Blog'})
        // })
    } catch (error) {
        res.status(500).json({message:'Server Error occured in creating Blog.Please Try Later.'})
    }
}

const allBlogs=(req,res)=>{
    Blogs.find().populate('userId','name')
    .then(response=>{
        // console.log(JSON.stringify(data, null, 2));
        res.status(200).json({data:response})
    })
    .catch(err=>{
        res.status(500).json({message:'Error occured in fetching data',err})
    })
}

const myBlogs=async (req,res)=>{
    try {
        // console.log('Session:', req.session.userId);
        const userId=req.session.userId
        const data=await Blogs.find({userId})
        res.status(200).json({data})
    } catch (error) {
        res.status(500).json({message:'Error occured in fetching data.Try again later.'})
    }
}

const editBlog=async (req,res)=>{
    try{
        const blogId=req.params.id
         const { title, body } = req.body;
         const updatedData = {
            title,
            body,
        }

        if (req.file && req.file.path) {
        updatedData.image = req.file.path;
        }
        
        Blogs.findByIdAndUpdate(blogId,updatedData,{new:true,runValidators:true})
        .then(response=>{
            // console.log("Update response:", response);
            res.status(200).json({updatedBlog: response,messaage:'Blog Updated Successgully'})
        })
        .catch(err=>{
            res.status(404).json({message:'Error occured in updating Blog.',err})
    })
    }catch(err){
        res.status(500).json({message:'Error occured in updating data.Try again later.'})
    }
    
}
const getBlog=async (req,res)=>{
    try{
        const blogId=req.params.id  
        const data= await Blogs.findById(blogId).populate('userId','name')
        res.status(200).json({data})
    }catch(err){
        res.status(500).json({message:'Error occured in fetching data.Try again later.',err})
    }
}
const deleteBlog=async (req,res)=>{
    try{
    const blogId=req.params.id

    // 1. Find the blog first to get the public_id
    const blog = await Blogs.findById(blogId);

    if (!blog) return res.status(404).json({ message: 'Blog not found' });

    // 2. Delete image from Cloudinary
    if (blog.imagePublicId) {
      await cloudinary.uploader.destroy(blog.imagePublicId); //  this deletes from Cloudinary
    }
   

    // 3. Delete blog from MongoDB
    await Blogs.findByIdAndDelete(blogId);
    res.status(201).json({message:'Blog has been deleted Successfully'})
    }catch(err){
        res.status(500).json({message:'Error occured in deleting blog.Try again later.',err})
    }
}
module.exports={
    createBlog,
    allBlogs,
    myBlogs,
    editBlog,
    getBlog,
    deleteBlog
}