const Restaurant = require("../restaurant")  //載入restaurant的model，資料綱要
const restaurantData = require("../../restaurant.json").results  //載入restaurant的json資料
const db = require('../../config/mongoose')   //引入mongoDB連線設定

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
