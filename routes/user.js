const express = require('express')
const router = express.Router()
const User = require('../models/userModel')
const ImageURL = require('../models/imageModel')
const bcrypt = require('bcrypt')
const crypto = require('crypto')
const jwt = require('jsonwebtoken')
const nodemailer = require('nodemailer')
const SMTP_CONFIG = require('../config/smtp')
const path = require('path')
const { verifyEmail } = require('../config/JWT')
const { loginrequired } = require('../config/JWT')

const multer = require('multer')
const storage = multer.diskStorage({
    destination: (req, file, cb) =>{
        cb(null, './images')
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname))
    }
})

const upload = multer({
    storage: storage,
    limits:{fileSize: 1000000}, //limits to 1mb
    fileFilter: function(req, file, cb){
        checkFileType(file, cb);
    }
}).single("image");


//Check file type
function checkFileType(file, cb) {
    //check extension
    var ext = path.extname(file.originalname);
    //Check mime
    //const mimetype = filetypes.test(file.mimetype);

    if (ext == '.png' || ext == '.jpg' || ext == '.gif' || ext == '.jpeg') {
        return cb(null, true);
    }
    else {
        cb('Error: Images Only!');
    }
}

router.get('/register', (req, res)=>{
    try {
        const token = req.cookies["access-token"]
        if (token){
            //verifies the token
        const validateToken = jwt.verify(token, process.env.JWT_SECRET)
        if(validateToken) {
            res.redirect('/dashboard')
        }
        else {
            res.render('register')
            console.log(process.env.EMAIL_PASSWORD);
          }  
        }
        else {
        res.render('register')
        }
    } catch (err) {
        console.log(err)
    }
})

//mail sender details
var transporter = nodemailer.createTransport({
    service: 'hotmail',
    auth:{
        user: SMTP_CONFIG.user,
        pass: SMTP_CONFIG.pass
    },
    tls:{
        rejectUnauthorized : false
    }
})

router.post('/register', (req, res)=>{
    try {
        //create new user
        const errors = []
        const { name, email, password, password2} = req.body
        if (!name || !email || !password || !password2) {
            errors.push({ msg : "All fields are required" })
            console.log('All fields are required')
            res.redirect('/user/register?' + 'All fields are required')
            return
        }
        //email validation
        var validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

        if(!email.match(validRegex)){
            errors.push({ message: 'Invalid Email' })
            console.log('Invalid email')
            res.redirect('/user/register?' + 'Invalid email')
            return
        }
        //password length
        if (password.length < 6) {
            errors.push({ msg: "Password len must be min 6" })
            console.log('Password len must be min 6')
            res.redirect('/user/register?' + 'Password length must be at least 6 characters')
            return
        }
        //match password
        if(password !== password2) {
            errors.push({ msg: "Password doesn't match" })
            console.log("Password doesn't match")
            res.redirect('/user/register?' + 'Password doesnt match')
            return
        }
        if (errors.length > 0){
            res.render('register', {
                 errors,
                 name,
                 email,
                 password,
                 password2
            }) 
         }
         else {
            //checks if user already exists
            User.findOne({ email : email })
            .then((user)=> {
                if (user) {
                errors.push({ msg: "User already exists" })
                console.log("User already exists")
                res.redirect('/user/register?' + 'User already exists')
                }
                else {
                    //create new user
                    const user = new User({
                        name,
                        email,
                        password,
                        emailToken : crypto.randomBytes(64).toString('hex'),
                        isVerified: false
                    })
                    //-----
                //hashing the password
                bcrypt.genSalt(10, (err, salt)=>{
                    bcrypt.hash(user.password, salt, (err, hash)=>{
                        user.password = hash
                        user.save()
                         .then((user)=>{
                            console.log('User created')

                       //send verification email to user
                        var mailOptions = {
                            from: ' "Verify your email" <iuripeniche@hotmail.com>',
                            to: user.email,
                            subject: 'iuripeniche - verify your email',
                            html: `<h2> ${user.name}! Thanks for registering on our site </h2>
                                   <h4> Please verify your email to continue</h4>
                                   <a href="http://${req.headers.host}/user/verify-email?token=${user.emailToken}">Verify Your Email</a>`
                        }

                        //sending mail
                        transporter.sendMail(mailOptions, function(error, info){
                            if(error){
                                console.log(error)
                            }
                            else{
                                console.log('Verification email was sent to your email')
                            }
                        })

                            res.render('emailsent')
                         })
                         .catch(err=>{
                            if(err) {
                                console.log(err)
                            }
                            res.redirect('/user/register')
                         })
                    })
                 })
                }
            })
        }
    }
    catch (err) {
        console.log(err)
    }
})

router.get('/verify-email', async(req, res)=>{
    try {
        const token = req.query.token
        const user = await User.findOne({ emailToken : token })
        if (user){
            user.emailToken = null
            user.isVerified = true
            await user.save()
            console.log('The account was verified')
            res.render('verified')
        }
        else {
            res.redirect('/user/register')
            console.log('email is not verified')
        }
    } catch (err) {
        console.log(err)
    }
})



router.get('/login', async(req, res)=>{
    try {
        const token = req.cookies["access-token"]
        if (token){
            //verifies the token
        const validateToken = jwt.verify(token, process.env.JWT_SECRET)
        if(validateToken) {
            res.redirect('/dashboard')
        }
        else {
            res.render('login')
          }  
        }
        else {
        res.render('login')
        }
    } catch (err) {
        console.log(err)
    }
})

router.post('/upload', loginrequired, (req, res)=>{
    const userId = req.userId
    upload(req, res, (err) => {
      if(err){
        res.redirect('/dashboard?' + err)
        console.log(err)
      } else {
        if (req.file == undefined) {
            res.redirect('/dashboard?' + "Please select an image")
        } else {
        const image = req.file.filename;
        const newimage = new ImageURL({
            imagename: 'images/' + image,
            assignedTo: userId
        })
        newimage.save();
        res.redirect('/dashboard?' + "File uploaded")
        }
      }
    })
})

router.get('/upload', loginrequired, (req, res)=>{
    const userId = req.userId
    ImageURL.find({ assignedTo : userId }).then((result)=> {
        res.send(result);
    }).catch((err) =>{
        console.log(err);
    })
})

//sign the token

const createToken = (id)=>{
    return jwt.sign({ id }, process.env.JWT_SECRET)
}

router.post('/login', verifyEmail, async (req, res)=> {
    try {
        const { email, password } = req.body
        const findUser = await User.findOne( { email : email })

        if (findUser){
            const match = await bcrypt.compare(password, findUser.password)
            if(match){
                //generate token
                const token = createToken(findUser.id)
                //Store the jwt in a cookie
                res.cookie("access-token", token)
                console.log(token)
                res.redirect('/dashboard')
            }
            else {
                console.log('Invalid Password')
                res.redirect('/user/login?' + 'Invalid email or password')
            }
        }else {
            //console.log('User not registered');
        }
    }
    catch (err) {
        console.log(err)
    }
})

router.get('/logout', (req, res)=>{
    res.cookie("access-token", " ", { maxAge : 1})
    res.redirect('/user/login')
})

module.exports = router