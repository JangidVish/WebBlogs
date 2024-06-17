require('dotenv').config()
const path = require('path')
const cookieParser = require('cookie-parser');
const express = require('express')
const {connectToMongoDB} = require('../connection')


const userRoute = require('../routes/user.router');
const blogRoute = require('../routes/blog.router');
const commentRoute = require('../routes/comment.router');
const User = require('../models/user');


const { checkForAuthenticationCookie, fetchUser } = require('../middleware/auth.middleware');
const app = express()


connectToMongoDB("mongodb+srv://vishaljangid2004as:Vishal@vishal.tlkuemw.mongodb.net/?retryWrites=true&w=majority&appName=Vishal").then(()=>{
    console.log("MongoDb connected");
})

app.set('view engine', 'ejs')
app.set('views', path.resolve('./views'))

app.use(express.urlencoded({extended:false}));
app.use(cookieParser());
app.use(checkForAuthenticationCookie("token"))
app.use(express.static(path.resolve("./public")))


const Blog = require('../models/blog')

app.get('/',async (req,res)=>{
    const allBlogs = await Blog.find({});
    // console.log(allBlogs);
    if(req.user){
        const user= await User.findById(req.user._id)
    }
    res.render('home', {
        user: req.user,
        blogs: allBlogs
    })
})



app.use("/user", userRoute)
app.use("/blog", blogRoute)
app.use("/comment", commentRoute)






app.listen(process.env.PORT, ()=>{
    console.log(`Server is connected to: ${process.env.PORT}`);
})