const express = require("express")
const path = require("path")
const multer = require("multer")
const cors = require("cors")
const { db } = require("./db/db-utils")
const app = express()
const port = 8080

// 处理跨域
// app.use(function (req, res, next) {
//   res.header("Access-Control-Origin", "*")
//   res.header("Access-Control-Allow-Headers", "authorization, Authorization, DNT, X-CustomHeader, Keep-Alive,User-Agent, X-Requested-With, If-Modified-Since, Cache-Control, Content-Type, token")
//   res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")

//   if (req.method == "OPTIONS") {
//     res.sendStatus(200)
//   } else {
//     next()
//   }
// })
app.use(cors())
// 处理 JSON
app.use(express.json())

// 验证 Token，判断是否处于登录状态
const ADMIN_TOKEN_PATH = "/_token"
app.all("*", async (req, res, next) => {
  if (req.path.indexOf(ADMIN_TOKEN_PATH) > -1) {
    let { token } = req.headers
    let adminTokenSql = "SELECT * FROM admin WHERE `token` = ?"
    let adminResult = await db.async.all(adminTokenSql, [token])

    if (adminResult.err != null || adminResult.rows.length == 0) {
      res.send({
        code: 403,
        msg: "请先登录",
      })

      return
    } else {
      next()
    }
  } else {
    next()
  }
})

// 注册路由
app.use("/admin", require("./routers/AdminRouter"))
app.use("/category", require("./routers/CategoryRouter"))
app.use("/blog", require("./routers/BlogRouter"))

// 处理文件上传
const update = multer({ dest: "./public/upload/temp" })
app.use(update.any())
app.use("/editor", require("./routers/UploadRouter"))

// 设置静态资源目录
app.use(express.static(path.join(__dirname, "public")))

app.listen(port, () => {
  console.log(`Running: http://localhost:${port}/`)
})
