const express = require('express')
const app = express()
const PORT = process.env.PORT || 8000
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const cookieparser = require('cookie-parser')
const { urlencoded } = require('express')
const bodyParser = require('body-parser')
const homeRoute = require('./routes/home')
const userRoute = require('./routes/user')

//config files
dotenv.config()

app.use(bodyParser.json({ limit: '50mb' }));

//bodyparser
app.use(urlencoded({ extended : false}))

//cookie parser
app.use(cookieparser())

//template engine
app.set('view engine', 'hbs')

//db connection
mongoose.connect(process.env.MONGODB_URL, { useNewUrlParser : true, useUnifiedTopology : true })
.then((connect)=> {
    console.log('Connected to database successfully')
})

.catch(err=> {
    console.log(err)
})

//routes
app.use('/', homeRoute)
app.use('/user', userRoute)

//serve images

app.use('/images', express.static('images'));
app.use('/views', express.static('views'));

//listening port
app.listen(PORT, ()=> {
    console.log(`Listening on port ${PORT}`)
})