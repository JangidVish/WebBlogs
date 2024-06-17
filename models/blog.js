const {Schema, model} = require('mongoose')
const mongoose = require('mongoose')


const blogSchema = new Schema({
    title:{
        type:String,
        required:true
    },
    desc:{
        type:String,
        required:true
    },
    coverImageUrl:{
        type:String
    },

    createdBy:{
        type: Schema.Types.ObjectId,
        ref:"user"
    }
})

const Blog = model('blog', blogSchema);

module.exports= Blog;