const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        require: true,
    },
    email:{
        type: String,
        unique: true,
        require: true,
    },
    password:{
        type: String,
        require: true,
    },
    password2:{
        type: String,
        require: true,
    },
    emailToken:{
        type: String,
    },
    isVerified:{
        type: Boolean,
    },
    Date:{
        type: Date,
        default: Date.now()
    },
})

module.exports = mongoose.model('User', userSchema)