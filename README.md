# Authentication-and-Image-Upload-Perfil

Dependencies and Technologies: Multer, Node.js, Express, MongoDB


Before Using:

You have to set-up a stmp.js file to connect with the nodemailer transporter, steps bellow:

Create smtp.js file in config folder and add the followed lines of code:

module.exports = {
    user: "putyouremail@test.com", //Has to be hotmail provider or you have to change it in the user.js transporter function to a different service
    pass: "password"
}

Create a .env file with the following data:
MONGODB_URL = <MongoDB URL here>
JWT_SECRET = <JWT Secret Code to generate a JWT Token>


This Project does the following:

Project that takes in authentication with JWT and email verification, lets the user upload images to their profile.
