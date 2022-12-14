# Authentication-and-Image-Upload-Web-APP

### Web APP functionality:
This Web APP allows the user to create an account and upload images to their profile.

### Dependencies and Technologies Used:
* Front-end: HTML5, Handlebars, CSS3, Javascript, Bootstrap.
* Back-end: Node js with Express and the following dependencies:
```json
  "dependencies": {
    "bcrypt": "^5.1.0",
    "cookie-parser": "^1.4.6",
    "crypto": "^1.0.1",
    "dotenv": "^16.0.3",
    "express": "^4.18.2",
    "express-session": "^1.17.3",
    "hbs": "^4.2.0",
    "jsonwebtoken": "^8.5.1",
    "mongodb": "^4.11.0",
    "mongoose": "^6.7.1",
    "multer": "^1.4.5-lts.1",
    "nodemailer": "^6.8.0",
    "path": "^0.12.7"
  }
```
* Database: MongoDB


### Before Using:
You have to set-up a stmp.js file to connect with the nodemailer transporter, steps below:

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

### To Start the Demo:
nodemon server.js -e js,json,hbs

### What I learned:
- Authentication and Authorization with JWT and Email Verification;
- REST API / Routing;
- Image uploading from client to back-end server and storage of the image location to the DB (MongoDB);
- Usage of NoSQL Database (MongoDB)
