const express = require("express")
const router = express.Router()
const User = require("../../models/User")
const passport = require('passport') //引用passport
const bcrypt = require('bcryptjs') //載入bcryptjs套件

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
  const errors =[]
  if(!name || !email || !password || !confirmPassword){
    errors.push({message:'所有欄位都是必填'})
  }
  if(password !== confirmPassword){
    errors.push({message:'密碼與確認密碼不相符'})
  }
  if(errors.length){
    return res.render('register',{
      errors,
      name,
      email,
      password,
      confirmPassword
    })
  }
  User.findOne({ email }).then(user => {
    if(user) {
      errors.push({message:'這個Email已經註冊過了'})
      return res.render('register' , {
        errors,
        name, 
        email, 
        password, 
        confirmPassword
      })
    }
    return bcrypt
      .genSalt(10)
      .then(salt =>
        bcrypt.hash(password , salt))
      .then(hash => User.create({
        name,
        email,
        password: hash //雜湊值取代原本的使用者密碼
      }))
      .then(()=> res.redirect('/'))
      .catch(err => console.log(err))
  })
})

router.get('/logout',(req, res) => {
  req.logout()  // req.logout 是passport.js提供的函式，會自動把使用者登入狀態清掉，幫你清除session
  req.flash('success_msg','你已經成功登出')
  res.redirect('/users/login')
})

module.exports = router
