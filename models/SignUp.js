const mongoose = require('mongoose')

const SignUpSchema = new mongoose.Schema({

    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true,
    },
    password: {
        type: String,
        required: true
    },
    userName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique:true

    }
},

    {
        timestamps: true
    }
)

module.exports = mongoose.model('signUpModel', SignUpSchema, 'signUpUsers')