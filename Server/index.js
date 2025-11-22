// import express
const express=require('express')
const base64=require('base-64')
const mongoose=require('mongoose')
const router = require('./Routes/UserRoutes')
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


app.use('/api',router)

app.use('/api',blogRouter)





// connect to port
app.listen(3000,(req,res)=>{
    console.log('Server listening on port 3000')
})