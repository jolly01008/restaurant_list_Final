# 我的餐廳清單

![image](https://github.com/jolly01008/restaurant_list_Final/blob/main/public/readmeImage/image01.png)
![image](https://github.com/jolly01008/restaurant_list_Final/blob/main/public/readmeImage/image02.png)
![image](https://github.com/jolly01008/restaurant_list_Final/blob/main/public/readmeImage/image03.png)

## 介紹

紀錄屬於自己的餐廳清單，使用者可以註冊、登入，進而瀏覽、查看、新增、編輯、刪除、查詢專屬於該用戶的餐廳資訊。

### 功能

1. 使用者可以點擊任一餐廳，查看更多餐廳資訊，如地址、電話與簡介
2. 使用者可以依店家名稱、料理類別來搜尋
3. 使用者可以新增一筆餐廳資料
4. 使用者可以瀏覽一筆餐廳的詳細資訊
5. 使用者可以編輯一筆餐廳的詳細資訊
6. 使用者可以刪除一筆餐廳資料
7. 使用者可以透過下拉式選單選擇餐廳排序方式
8. 使用者可以註冊帳號
9. 使用者可以登入系統建立自己的餐廳清單

## 開始使用

1. 請先確認有安裝 node.js 與 npm

2. 將專案 clone 到本地

3. 開啟終端機(Terminal)，進入存放此專案的資料夾

```
cd restaurant_list_Final
```

4. 安裝所需套件

```
npm i [套件名稱]
```

5. 設置.env 檔

```
請修改 `.env.example` 成 .env
```

6. 匯入種子檔案

```
npm run seed
```

若看到 restaurantSeeder done! 表示種子載入完成。

7. 啟動伺服器，執行 app.js 檔案

```
npm run dev
```

8. 當 terminal 出現以下字樣，表示伺服器已啟動

> Express is running on http://localhost:3000
>
> mongodb connected!

## 開發工具

- Node.js 14.16.0
- nodemon
- Express 4.16.4
- Express-Handlebars 3.0.0
- Bootstrap
- Font-awesome
- MongoDB
- mongoose 5.9.7
- body-parser 1.20.2
- dotenv 16.0.3
- method-override @3.0.0
- express-session @1.17.1
- passport @0.4.1
- passport-facebook @3.0.0
- passport-local @1.0.0
- dotenv @16.0.3
- bcryptjs @2.4.3
- connect-flash @0.1.1
