const mongoose=require('mongoose')

const schema=mongoose.Schema

const shortUrlSchema=new schema({
    originalUrl:{
        type:String,
        required:true
    },
    shortCode:{
        type:String,
        required:true
    }
})

const shortUrls=mongoose.model('url',shortUrlSchema)

module.exports=shortUrls