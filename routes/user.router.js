const {Router} = require('express')
const User = require('../models/user')
const multer  = require('multer')
const path = require('path')

const router = Router();
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.resolve('./public/images/'));
    },
    filename: function (req, file, cb) {
        const filename =`${Date.now()}-${file.originalname}` 
      cb(null, filename)
    }
  })
  
  const upload = multer({ storage: storage })

router.get('/signin', (req,res)=>{
    return res.render("signin")
})

router.get('/signup', (req,res)=>{
    return res.render("signup")
})

router.get('/nav', async (req,res)=>{
    try{
        const Navuser = await User.findById(req.user._id);
        res.render('nav', {Navuser})
    } catch(err){
        console.error(err);
        res.status(500).send('Server Error')
    }
})




router.post('/signup', upload.single('profileImageUrl'), async(req,res)=>{
    const {fullName, email, password}= req.body;
    try{
    await User.create({
        fullName: fullName,
        email: email,
        password: password,
        profileImageUrl: `/images/${req.file.filename}`
    });
    return res.redirect('/')
}catch(error){
    console.error("Error during signup: ", error);
    return res.render('signup', {error: "Failed to sign up, please try again."})
}
})

router.post('/signin', async(req,res)=>{
    const {email, password} = req.body;
    try{
    const token = await User.matchPasswordAndGenerateToken(email, password)

    // console.log('token ', token);
    // if(user) return res.redirect('/')
    return res.cookie('token',token).redirect('/')
}catch(error){
    return res.render('signin', {error: "Incorrect Email or Password"})
}
})




router.get('/logout', (req,res)=>{
    res.clearCookie('token').redirect('/')
})




module.exports = router;
