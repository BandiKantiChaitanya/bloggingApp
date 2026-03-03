// import express
const express=require('express')
const base64=require('base-64')
const mongoose=require('mongoose')
const userRouter = require('./Routes/UserRoutes')
const session=require('express-session')
const cors=require('cors')
const blogRouter = require('./Routes/BlogRoutes')
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

const CLIENT_URL = process.env.CLIENT_URL || 'http://localhost:5173'

app.use(cors({
    origin:CLIENT_URL,
    credentials:true
}))

// middleware
app.use(express.json())


app.set('trust proxy', 1);

app.use(session({
  secret: process.env.SECRET_KEY, // Use a strong, unique secret in real apps
  resave: false,             // Don't save session if nothing changed
  saveUninitialized: false,  // Only save sessions that have meaningful data
  cookie: {
    secure: true,           // Set to true if using HTTPS
    secure: process.env.NODE_ENV === 'production',
    sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
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




// connect to port
app.listen(3000,(req,res)=>{
    console.log('Server listening on port 3000')
})