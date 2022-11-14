const mongoose = require('mongoose')

const imageSchema = new mongoose.Schema({
    imagename:{
        type: String,
        require: true,
    },
    Date:{
        type: Date,
        default: Date.now()
    },
    assignedTo:{
         type: mongoose.Schema.Types.ObjectId,
         ref: 'User'
    }
})

module.exports = mongoose.model('ImageURL', imageSchema)