const express = require('express')
const mongoose = require('mongoose')
const GooglePlusTokenStrategy = require('passport-google-plus-token')
const nodemailer = require('nodemailer')
const sendgrid = require('nodemailer-sendgrid-transport')
const jwt = require('jsonwebtoken');
const cors = require('cors')
const User = require('./model/user')
const bodyParser = require('body-parser')
const passport2 = require('passport')
const app = express()

app.use(cors())
app.use('/uploads', express.static('uploads'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));



// const transporter = nodemailer.createTransport(sendgrid({
//   auth: { api_key: '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' }
// }))


// //google Oauth strategy
// passport2.use('googleToken', new GooglePlusTokenStrategy({
//   clientID: '706279272007-snj2s6mm5eve43usmnhb9ue88q2b0daq.apps.googleusercontent.com',
//   clientSecret: 'wB1AwcoYm36Wg1RCjvDw6QsB'
// },  async (accessToken, refreshToken, profile, res, req, next, done) => {
//   console.log('accessToken', accessToken);
//   console.log('refreshToken', refreshToken);
//   console.log('profile', profile);


//   //check wether this data exist
//   const googleEmailExists = await User.findOne({ email : profile.emails[0].value })
//   if (googleEmailExists) {
//     console.log("User already exists in our DB");
//     const token = jwt.sign({ id: googleEmailExists.id }, 'taskcord')
//     console.log({ auth_token: token })
//     return
//   }
//   console.log("User doesnt exist in our DB, we are creating new one");

//   //if new acc
//   const user = new User({
//     email: profile.emails[0].value,
//     username: profile.displayName,
//     avatar: profile.photos[0].value,
//     userScore: 30
//   })
//   try {
//     const data = await user.save()
//     console.log(data);
//   } catch (error) {
//     console.log(error);
//   }

// }))

mongoose.connect('mongodb+srv://Shaliko:Shaliko1234@cluster0-twjlk.mongodb.net/myDB?retryWrites=true&w=majority',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  },
  () => {

    console.log("connect to db")
  })

const authRoute = require('./routs/auth')
const postRoute = require('./routs/post')
const passport = require('passport')

app.use('/posts', postRoute)
app.use('/user/auth', authRoute)

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
  console.log("I am running");
})
