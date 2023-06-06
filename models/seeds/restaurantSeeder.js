const Restaurant = require("../restaurant")  //載入restaurant的model，資料綱要
const restaurantData = require("./restaurant.json").results  //載入restaurant的json資料
const userData = require("./user.json") //載入user的json資料
const db = require('../../config/mongoose')   //引入mongoDB連線設定
const User = require("../../models/User")

const bcrypt = require("bcryptjs")

db.on("error", () => {
  console.log("connect error!");
});

db.once("open", () => {
  const promises = userData.map((user) => {
   return bcrypt
    .genSalt(10)
    .then(salt => bcrypt.hash(user.password , salt))
    .then(hash => 
      User.create({ name: user.name, email: user.email , password: hash })
    )
    .then(user => {
      const userId = user._id
      const name = user.name
      let restaurant = []
      if ( name === userData[0].name ){
        restaurant = restaurantData.slice(0,3)
      } else {
        restaurant = restaurantData.slice(3,6)
      }
       return Restaurant.create( 
          restaurant.map(r => Object.assign(r , {userId}))
      )
    })
    .catch(err => console.log(err))
  })

  Promise.all(promises)
  .then(() => {
    console.log("restaurantSeeder done!")
    process.exit()
  })
  .catch(err => console.log(err))
})
