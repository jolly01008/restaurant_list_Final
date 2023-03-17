const mongoose = require("mongoose");

//載入restaurant的model，資料綱要
const Restaurant = require("../restaurant");
//載入restaurant的json資料
const restaurantData = require("../../restaurant.json").results;

if (process.env.NODE_ENV !== "process") {
  require("dotenv").config();
}

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", () => {
  console.log("connect error!");
});

db.once("open", () => {
  console.log("connect connected!");
  //把restaurantData的八筆資料物件放進create當參數
  Restaurant.create(restaurantData)
    .then(() => {
      console.log("restaurantSeeder done!");
      db.close();
    })
    .catch((err) => console.log(err));
});
