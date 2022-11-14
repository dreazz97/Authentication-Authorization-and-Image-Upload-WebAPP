const jwt = require('jsonwebtoken')
const User = require('../models/userModel')

const loginrequired = (req, res, next)=>{
    //grab the token of the user
    const token = req.cookies["access-token"]
    //Checks if the token exists
    if(token){
        //verifies the token
        const validateToken = jwt.verify(token, process.env.JWT_SECRET)
        if(validateToken) {
            req.userId = validateToken.id
            console.log(req.userId)

            next()
        }
        else {
            console.log('token expired')
            res.redirect('/user/login')
        }
    }
    else{
        console.log('token not found')
        res.redirect('/user/login')
    }
}

const verifyEmail = async (req, res, next)=>{
    try {
        const user = await User.findOne({ email : req.body.email })
        if (user.isVerified){
            next()
        }
        else {
            console.log("Please check your email to verify your account")
            res.redirect('/user/login')
        }
    } catch (err) {
        const { email, password } = req.body
        const findUser = await User.findOne( { email : email })
        if (findUser){
            const match = await bcrypt.compare(password, findUser.password)
            if(match){
                console.log(err)
                res.redirect('/user/login')
            }
            else {
                console.log('Invalid Password')
                res.redirect('/user/login')
            }
        }
        else 
        {
            console.log('User not registered')
            res.redirect('/user/login')
        }
    }
}

module.exports =  {loginrequired, verifyEmail}