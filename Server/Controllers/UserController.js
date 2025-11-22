const Users=require('../Models/signup')
const bcrypt=require('bcrypt')


const register=async (req,res)=>{
    try{
        const {email,password,name}=req.body
        const existingUser= await Users.findOne({email})
        if(existingUser){
           return res.status(400).json({message:'email already exist try login.'})
        }
         // Validate password strength
        const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&+=!]).{8,15}$/;
        if (!passwordPattern.test(password)) {
        return res.status(400).json({
            message:
          'Password must be 8–15 characters long, contain at least one uppercase letter, one lowercase letter, one number, and one special character (@#$%^&+=!).'
            });
        }
        const hashedPassword=await bcrypt.hash(password,10)
        const newUser=new Users({
            name,
            email,
            password:hashedPassword
        })
        newUser.save()
        .then(response=>{
            res.status(201).json({message:'User created Succesfully'})
        })
        .catch(err=>{
            res.status(400).json({message:'Error occured in creating User',payload:err})
        })
    }
    catch(err){
        res.status(400).json({message:'Error occured in creating User by server.Please try again later.'})
    }
}

const login=async (req,res)=>{
    try {
        const {email,password}=req.body
        const existingUser=await Users.findOne({email})
        if(!existingUser){
            return res.status(400).json({message:'Invalid email.Please register'})
        }
        const matchPassword=await bcrypt.compare(password,existingUser.password)
        if(matchPassword){
            req.session.userId=existingUser._id
           return res.status(200).json({message:"User Loggedin succesfully"})
        }else{
           return res.status(400).json({message:"Incorrect Password"})
        }
    } catch (error) {
        res.status(500).json({message:'User cannot be logged in.Please try again'})
    }
}

const logout=(req,res)=>{
    req.session.destroy((err)=>{
        if(err){
            return res.status(500).json({message:'Logout Failed'})
        }
        res.clearCookie('connect.sid')
        res.json({message:'Logged out Succesfully'})
    })
}


module.exports={
    register,
    login,
    logout
}