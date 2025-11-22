const express=require('express')
const { createBlog, allBlogs, myBlogs, editBlog, deleteBlog, getBlog } = require('../Controllers/BlogController')
const requireAuth = require('../Middlewares/requireAuth')
const blogRouter=express.Router()
const upload=require('../Utils/upload')

blogRouter.post('/createBlog',requireAuth,upload.single('image'),createBlog)

blogRouter.get('/allBlogs',allBlogs)

blogRouter.get('/myBlogs',requireAuth,myBlogs)

blogRouter.put('/editBlog/:id',upload.single('image'),editBlog)

blogRouter.get('/getBlog/:id',getBlog)

blogRouter.delete('/delBlog/:id',deleteBlog)


module.exports=blogRouter