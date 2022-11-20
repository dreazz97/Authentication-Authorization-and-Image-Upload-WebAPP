# Authentication-and-Image-Upload-Web-APP

### Dependencies and Technologies Used:
HTML5, CSS3, Javascript, Bootstrap, Node.js with express, Multer, MongoDB, Mongoose, Nodemailer for Email-verification, JWT, bcrypt, crypto.


### Before Using:
You have to set-up a stmp.js file to connect with the nodemailer transporter, steps bellow:

Create smtp.js file in the config folder and add the followed lines of code:

```javascript
module.exports = {
    user: "putyouremail@test.com", //Has to be hotmail provider or you have to change it in the user.js transporter function to a different service
    pass: "password"
}
```
Then insert the required config in the user.js file:
```javascript
const SMTP_CONFIG = require('../config/smtp')
```

Create a .env file with the following data:
```env
MONGODB_URL = <MongoDB URL here>
JWT_SECRET = <JWT Secret Code to generate a JWT Token (random string)>
```
### What I learned:
- Authentication with JWT and email verification;
- REST API / Routing;
- Image uploading from client to back-end server and storage of the image location to the DB (MongoDB);
- NoSQL Database
