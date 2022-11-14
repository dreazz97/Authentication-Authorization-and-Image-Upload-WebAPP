const express = require('express')
const router = express.Router()
const { loginrequired } = require('../config/JWT')
const User = require('../models/userModel')
const jwt = require('jsonwebtoken')

router.get('/', (req, res)=>{
    try {
        const token = req.cookies["access-token"]
        if (token){
            //verifies the token
        const validateToken = jwt.verify(token, process.env.JWT_SECRET)
        if(validateToken) {
            res.redirect('/dashboard')
        }
        else {
            res.render('index')
          }  
        }
        else {
        res.render('index')
        }
    } catch (err) {
        console.log(err)
    }
})

router.get('/dashboard', loginrequired, (req, res)=>{
    const userId = req.userId
    User.findOne({ _id : userId })
    .then((user)=>{
        res.render('dashboard', { user : user.name })
    })
    .catch(err=>{
        console.log(err)
    }) 
})

module.exports = router