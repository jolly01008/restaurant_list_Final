const express = require('express')
const router = express.Router() //引用Express路由器
const Restaurant = require('../../models/Restaurant') //載入Restaurant model 資料綱要

//index頁面路由設定
router.get("/", (req, res) => {
  const sortBy = req.query.sortBy || "_id";  //使用者若沒做選擇(req.qurey.sortBy沒東西)，那 sortBy = "_id"
  Restaurant.find({}) //用find()叫 restaurant model 去MongoDB資料庫找資料，並讀取
    .sort(sortBy) // 把sortBy做為參數，代入sort()去做排列
    .lean()
    .then( restaurantsData => res.render("index", { restaurantsData , sortBy }))
    .catch( err => console.log(err))
});


//搜尋餐廳
router.get("/search", (req, res) => {
  const Keyword = req.query.keywords.trim().toLowerCase() //req.query，可抓取瀏覽器輸入的內容，也就是網址中?後面的資訊
  const sortBy = req.query.sortBy || "_id";  //使用者若沒做選擇(req.qurey.sortBy沒東西)，那 sortBy = "_id"
  Restaurant.find({})
    .lean()
    .sort(sortBy) // 把sortBy做為參數，代入sort()去做排列
    .then( restaurantsData => {
     const searchRestaurant = restaurantsData.filter(
        data => data.name.toLowerCase().includes(Keyword) ||
        data.category.includes(Keyword) )
     res.render("index",{ restaurantsData:searchRestaurant , wordValue:req.query.keywords , sortBy })
    })
    .catch( err => console.log(err))
})


module.exports = router //匯出路由器
