// multer for cloudinary uploads

// import multer
const multer=require('multer')
const {CloudinaryStorage}=require('multer-storage-cloudinary')
const cloudinary=require('./cloudinaryConfig')

const storage=new CloudinaryStorage({
    cloudinary:cloudinary,
    params:{
        folder:'blog_uploads',
        allowed_formats:['jpg', 'png', 'jpeg', 'webp']
    },
})


const upload=multer({
    storage
    : storage,  // <-- fix here
  limits: {
    fileSize: 10 * 1024 * 1024 // 5MB max file size, adjust as needed
  }
})

module.exports=upload