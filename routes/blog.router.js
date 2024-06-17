const {Router} = require('express')
const path = require('path')
const multer  = require('multer')

const Blog = require('../models/blog')
const comment = require('../models/comment')

// const upload = multer({ dest: 'uploads/' })
const router = Router();


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.resolve('./public/blogUploads/'));
    },
    filename: function (req, file, cb) {
        const filename =`${Date.now()}-${file.originalname}` 
      cb(null, filename)
    }
  })
  
  const upload = multer({ storage: storage })

  router.get('/addBlog', (req,res)=>{
    return res.render("blogPage",{
      user: req.user,
    })
})



router.get(`/:id`, async (req,res)=>{
  const blog = await Blog.findById(req.params.id).populate('createdBy');
  const comments = await comment.find({blogId: req.params.id}).populate('createdBy');
  // console.log(comments);
  try{
    // console.log('blog: ',blog);
  return res.render('blog', {
    user: req.user,
    blog,
    comments
  })
  
}
catch(error){
  console.log("Error while acquiring id: " + Error);
}
})


router.post('/',upload.single('coverImage'), async(req,res)=>{
    const {title, desc} = req.body;
    const blog = await Blog.create({
        title: title,
        desc: desc,
        createdBy: req.user._id,
        coverImageUrl: `/blogUploads/${req.file.filename}`    })
    return res.redirect(`/blog/${blog._id}`)

})


module.exports = router;