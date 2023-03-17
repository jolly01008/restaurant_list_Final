const express = require("express");
const app = express();
const port = 3000;

//載入mongoose
const mongoose = require("mongoose");
//引入dotenv
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
//設定連線到mongoDB，與資料庫連線
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

//require express-handlebars
const exphbs = require("express-handlebars");
const restaurantData = require("./restaurant.json").results;

//設定db並且監聽
const db = mongoose.connection;
db.on("error", () => {
  console.log("mongodb Error!");
});
db.once("open", () => {
  console.log("mongodb connected!");
});

//setting template engine，設定模板引擎
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

//setting static files
app.use(express.static("public"));

//============index頁面路由設定============
app.get("/", (req, res) => {
  res.render("index", { restaurants: restaurantData });
});

//============show頁面路由設定============
app.get("/restaurants/:restaurant_id", (req, res) => {
  //req.params，可抓取路由的變數資訊
  //篩選出，每一項在restaurantList.results的id，相符合的元素
  const showRestaurant = restaurantData.find((data) => {
    return data.id.toString() === req.params.restaurant_id.toString();
  });
  res.render("show", { restaurant: showRestaurant });
});

//============search頁面路由設定============
app.get("/search", (req, res) => {
  //req.query，可抓取瀏覽器輸入的內容，也就是網址中?後面的資訊
  const searchword = req.query.keyword.trim().toLowerCase();
  const searchRestaurant = restaurantData.filter((data) => {
    return (
      data.name.toLowerCase().includes(searchword) ||
      data.category.includes(searchword)
    );
  });
  res.render("index", {
    restaurants: searchRestaurant,
    keywords: req.query.keyword,
  });
});

//============伺服器監聽器============
app.listen(port, () => {
  console.log(`Express is running on http://localhost:${port}`);
});
