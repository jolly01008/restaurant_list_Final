const mongoose = require('mongoose') //載入mongoose


//引入dotenv，僅在非正式環境時, 使用 dotenv
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config() }

//設定連線到mongoDB，與資料庫連線
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,useUnifiedTopology: true , useCreateIndex: true})

const db = mongoose.connection //設定db並且監聽

db.on("error", () => {
  console.log("mongodb Error!")
})
db.once("open", () => {
  console.log("mongodb connected!")
})

module.exports = db