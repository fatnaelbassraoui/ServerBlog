const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    userName: {
        type: String,
        required:true
    },
    email: {
        type: String,
        required:true

    },
    password: {
        type: String,
        required:true,
        min:8

    },

},
    {
        timestamps: true
    })

module.exports = mongoose.model('userModel', UserSchema, 'users')