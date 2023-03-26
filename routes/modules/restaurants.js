const express = require('express')
const router = express.Router() //引用Express路由器

const Restaurant = require('../../models/Restaurant') //載入Restaurant model


// ============新增餐廳頁面============
router.get("/new" , (req, res) => {
  res.render("new")
})

//============show頁面路由設定============
router.get("/:restaurantId", (req, res) => {
  const id = req.params.restaurantId //req.params，可抓取路由的變數資訊
  Restaurant.findById(id)
    .lean()
    .then(restaurantData => res.render("show", { restaurantData }))
    .catch( err => console.log(err))
});

//新增餐廳
router.post("/" , (req,res) => {
  Restaurant.create(req.body)
    .then(() => res.redirect('/') )
    .catch(error => console.log (error))
})

// ============編輯頁面路由============
router.get("/:restaurantId/edit" , (req,res) => {
  const id = req.params.restaurantId //載入該餐廳資料再提供修改。運用req.params抓取變數取得資訊
  Restaurant.findById(id)
  .lean()
  .then( restaurantData => res.render("edit",{restaurantData}))
})

//編輯餐廳
router.put("/:restaurantId" , (req,res) =>{
  const id = req.params.restaurantId
  const editData = req.body

  Restaurant.findByIdAndUpdate(id , editData) //使用findByIdAndUpdate

  .then( () => res.redirect(`/restaurants/${id}`))
  .catch( error => { console.log(error) })
})

//刪除餐廳
router.delete("/:restaurantId", (req,res) => {
  const id = req.params.restaurantId
  Restaurant.findById(id)
    .then( restaurantData => restaurantData.remove() )
    .then( () => res.redirect("/") )
    .catch( error => { console.log(error) })
})

module.exports = router //匯出路由器