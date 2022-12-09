const mongoose = require('mongoose')

const PostSchema = new mongoose.Schema({
    author: {
        type: 'string',
        require: true
    },
    title: {
        type: String,
        required: true,
    },
    img:{
        type:String,
        required: false,
        default:'https://via.placeholder.com/650'

    },
    body:{
        type:String,
        required:true,
    },
    featured:{
        type:Boolean,
        required: false,
        default:false
    },
    category:{
        type:String,
        required:false
    }
},
{
    timestamps:true
})

module.exports = mongoose.model('postModel', PostSchema, 'Posts')