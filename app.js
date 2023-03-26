const express = require("express")
const app = express()
const port = 3000
const Restaurant = require("./models/Restaurant") //載入restaurant model
const mongoose = require("mongoose") //載入mongoose
const exphbs = require("express-handlebars")  //require express-handlebars
const bodyParser = require('body-parser') //引用body-parser
const methodOverride = require("method-override") //載入body-parser

const routes = require('./routes') //引用總路由器

//引入dotenv
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config() }
//設定連線到mongoDB，與資料庫連線
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,useUnifiedTopology: true })


const db = mongoose.connection //設定db並且監聽
db.on("error", () => {
  console.log("mongodb Error!")
})
db.once("open", () => {
  console.log("mongodb connected!")
})

app.engine("handlebars", exphbs({ defaultLayout: "main" })) //setting template engine，設定模板引擎
app.set("view engine", "handlebars")
app.use(bodyParser.urlencoded({extended: true})) //body-parser
app.use(express.static("public")) //setting static files
app.use(methodOverride("_method"))

app.use(routes) //將request導入總路由器

//============伺服器監聽器============
app.listen(port, () => {
  console.log(`Express is running on http://localhost:${port}`);
})