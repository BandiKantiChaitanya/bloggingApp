// import express
const express=require('express')
const base64=require('base-64')
const mongoose=require('mongoose')
const userRouter = require('./Routes/UserRoutes')
const session=require('express-session')
const cors=require('cors')
const blogRouter = require('./Routes/BlogRoutes')
const shortUrls = require('./Models/ShortUrl')
require('dotenv').config()


// initialze express
const app=express()

// connect mongoose
mongoose.connect(process.env.Mongo_URL)
.then(()=>{
    console.log('Connected to MongoDB Sever')
})
.catch(err=>{
    console.log('Error occured',err)
})

app.use(cors({
    origin:true,
    credentials:true
}))

// middleware
app.use(express.json())




app.use(session({
  secret: 'your-secret-key', // Use a strong, unique secret in real apps
  resave: false,             // Don't save session if nothing changed
  saveUninitialized: false,  // Only save sessions that have meaningful data
  cookie: {
    secure: false,           // Set to true if using HTTPS
    httpOnly: true,          // Prevents client-side JS from accessing cookies
    maxAge: 1000 * 60 * 60 * 24 // 1 day (in ms)
  }
}))



app.use('/api',userRouter)

app.use('/api',blogRouter)

app.get('/health',(req,res)=>{
  res.json({status:'ok',timestamp:new Date().toISOString()  })
})

app.get('/api/me', (req, res) => {
  if (req.session.userId) {
    res.json({ user: req.session.userId });
  } else {
    res.status(401).json({ message: 'Not logged in' });
  }
});


app.get('/allurls',(req,res)=>{
  try {
    const data=shortUrls.find()
    res.status(200).json({message:'all links',data})
  } catch (error) {
    res.status(500).json({message:'Server Error'})
  }
})


app.post('/createurl',async (req,res)=>{
  try {
    const {orignalUrl,shortCode}=req.body
    const newUrl=new shortUrls({
      originalUrl,
      shortCode
    })
    await newUrl.save()
    res.status(200).json({message:'url created'})
  } catch (error) {
    res.status(500).json({message:'server failed',})
  }
})



// connect to port
app.listen(3000,(req,res)=>{
    console.log('Server listening on port 3000')
})