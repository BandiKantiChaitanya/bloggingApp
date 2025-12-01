// import express
const express=require('express')
const base64=require('base-64')
const mongoose=require('mongoose')
const router = require('./Routes/UserRoutes')
const session=require('express-session')
const cors=require('cors')
const blogRouter = require('./Routes/BlogRoutes')
const MongoStore = require('connect-mongo'); 
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
    origin:'https://blogging-app-lovat.vercel.app',
    credentials:true
}))

// middleware
app.use(express.json())


app.set('trust proxy', 1); // OR use proxy: true in session

app.use(session({
  secret: process.env.SECRET_KEY,
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({ mongoUrl: process.env.Mongo_URL }), // optional but recommended
  cookie: {
    secure: process.env.NODE_ENV === "production", // true in prod
    httpOnly: true,
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    maxAge: 24 * 60 * 60 * 1000
  },
  proxy: true
}));



app.use('/api',router)

app.use('/api',blogRouter)





// connect to port
app.listen(3000,(req,res)=>{
    console.log('Server listening on port 3000')
})
