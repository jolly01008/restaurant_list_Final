const express = require("express")
const app = express()
const port = 3000
const exphbs = require("express-handlebars")  //require express-handlebars
const bodyParser = require('body-parser') //引用body-parser
const methodOverride = require("method-override") //載入body-parser

const routes = require('./routes') //引用總路由器
require('./config/mongoose') // 載入mongoose


app.engine("handlebars", exphbs({ defaultLayout: "main" })) //setting template engine，設定模板引擎
app.set("view engine", "handlebars")
app.use(bodyParser.urlencoded({extended: true})) //body-parser
app.use(express.static("public")) //setting static files
app.use(methodOverride("_method"))
app.use(routes) //將request導入總路由器

//伺服器監聽器
app.listen(port, () => {
  console.log(`Express is running on http://localhost:${port}`);
})