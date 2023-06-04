const express = require("express")
const session = require("express-session")
const app = express()
const port = 3000
const exphbs = require("express-handlebars")  //require express-handlebars
const bodyParser = require('body-parser') //引用body-parser
const methodOverride = require("method-override") //載入body-parser
const flash = require('connect-flash') //引入connect-flash

const routes = require('./routes') //引用總路由器
const usePassport = require('./config/passport') //匯入Passport設定檔
require('./config/mongoose') // 載入mongoose


app.engine("handlebars", exphbs({ defaultLayout: "main" })) //setting template engine，設定模板引擎
app.set("view engine", "handlebars")

app.use(session({
  secret: 'ThisIsMySecret',
  resave: false,
  saveUninitalized: true
}))

app.use(bodyParser.urlencoded({extended: true})) //body-parser
app.use(express.static("public")) //setting static files
app.use(methodOverride("_method"))

usePassport(app) //調用usePassport函式
app.use(flash()) //掛載connect-flash
app.use((req, res, next) => {
  res.locals.isAuthenticated = req.isAuthenticated()
  res.locals.user = req.user
  res.locals.success_msg = req.flash("success_msg")
  res.locals.warning_msg = req.flash("warning_msg")
  next()
})
app.use(routes) //將request導入總路由器

//伺服器監聽器
app.listen(port, () => {
  console.log(`Express is running on http://localhost:${port}`);
})