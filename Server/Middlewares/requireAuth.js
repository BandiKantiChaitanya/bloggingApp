const requireAuth=(req,res,next)=>{
    if(!req.session.userId){
     return res.json({message:'login first'})
    }
    next()
}

module.exports=requireAuth