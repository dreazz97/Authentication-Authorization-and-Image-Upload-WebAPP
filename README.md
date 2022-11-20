# Authentication-and-Image-Upload-Profile

### Dependencies and Technologies:
Bootstrap, Multer, Node.js, Express, MongoDB, Mongoose, Nodemailer for Email-verification, JWT, bcrypt, crypto.


### Before Using:
You have to set-up a stmp.js file to connect with the nodemailer transporter, steps bellow:

Create smtp.js file in config folder and add the followed lines of code:

```javascript
module.exports = {
    user: "putyouremail@test.com", //Has to be hotmail provider or you have to change it in the user.js transporter function to a different service
    pass: "password"
}
```

Create a .env file with the following data:
```env
MONGODB_URL = <MongoDB URL here>
JWT_SECRET = <JWT Secret Code to generate a JWT Token (random string)>
```
### What I learned:
Authentication with JWT and email verification;
REST API / Routing;
Image Uploading from Client to Server and store location in DB (MongoDB);
NoSQL Database
