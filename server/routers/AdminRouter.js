const express = require("express")
const router = express.Router()
const { v4: uuidv4 } = require("uuid")
const { db } = require("../db/db-utils")

// 管理员登录接口
router.post("/login", async (req, res) => {
  let { account, password } = req.body
  let searchSql = "SELECT * FROM admin WHERE `account` = ? AND `password` = ?"
  let { err, rows } = await db.async.all(searchSql, [account, password])

  if (err == null && rows.length > 0) {
    let loginToken = uuidv4()
    let updateTokenSql = "UPDATE admin SET `token` = ? WHERE `id` = ?"
    await db.async.run(updateTokenSql, [loginToken, rows[0].id])

    let adminInfo = rows[0]
    adminInfo.token = loginToken
    adminInfo.password = ""

    res.send({
      code: 200,
      msg: "登录成功",
      data: adminInfo,
    })
  } else {
    res.send({
      code: 403,
      msg: "登录失败",
    })
  }
})

module.exports = router
