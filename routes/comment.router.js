const {Router} = require('express')
const comment = require('../models/comment')

const router = Router();

router.post('/:blogId',async  (req,res)=>{
    await comment.create({
        content : req.body.content,
        blogId: req.params.blogId,
        createdBy: req.user._id
    })
    return res.redirect(`/blog/${req.params.blogId}`)
})


module.exports = router;