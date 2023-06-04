const express = require("express")
const router = express.Router()
const User = require("../../models/User")
const passport = require('passport') //引用passport

router.get('/login',(req,res) =>{
  res.render('login')
})

router.post('/login',
 passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/users/login'
 })
)


router.get('/register',(req,res) =>{
  res.render('register')
})


router.post('/register',(req,res) =>{
  const {name , email , password , confirmPassword} = req.body
  User.findOne({ email }).then(user => {
    if(user) {
      console.log("This email is already registered")
      return res.render('register' , {
        name, 
        email, 
        password, 
        confirmPassword,
        message: "此email已經註冊過了"
      })
    }else{
      return User.create({
        name, 
        email, 
        password, 
      })
      .then(() => res.redirect('/'))
      .catch(err => console.log(err))
    }
  })
  .catch(err => console.log(err))
})

router.get('/logout',(req, res) => {
  req.logout()  // req.logout 是passport.js提供的函式，會自動把使用者登入狀態清掉，幫你清除session
  req.flash('success_msg','你已經成功登出')
  res.redirect('/users/login')
})

module.exports = router
