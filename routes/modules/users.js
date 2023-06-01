const express = require("express")
const router = express.Router()
const User = require("../../models/User")

router.get('/login',(req,res) =>{
  res.render('login')
})

router.post('/login',(req,res) =>{
  console.log(' post login ')
})


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

module.exports = router
