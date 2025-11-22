const mongoose=require('mongoose')

const Schema=mongoose.Schema

const BlogSchema=new Schema({
    title:{
        type:String,
        require:true
    },
    body:{
        type:String,
        require:true
    },
    image:{
        type:String,
        require:true
    },
    // userId:{
    //     type:String,
    //     require:true
    // }
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users'
    }

},{timestamps:true})

const Blogs=mongoose.model('Blogs',BlogSchema)

module.exports=Blogs