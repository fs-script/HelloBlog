const express = require("express")
const { db, genid } = require("../db/db-utils")

const router = express.Router()

// 文章分类添加接口
router.post("/_token/add", async (req, res) => {
  let { name } = req.body
  const inspectSql = "SELECT * FROM category WHERE `name`= ?"
  const insertSql = "INSERT INTO category (`id`, `name`) VALUES (?, ?)"
  let inspectResult = await db.async.all(inspectSql, [name])

  if (inspectResult.err != null || inspectResult.rows.length > 0) {
    res.send({
      code: 403,
      msg: "分类-重复"
    })

    return
  }

  let { err, rows } = await db.async.run(insertSql, [genid.NextId(), name])

  if (err == null) {
    res.send({
      code: 200,
      msg: "添加-成功",
    })
  } else {
    res.send({
      code: 403,
      msg: "添加-失败",
    })
  }
})

// 文章分类修改接口
router.put("/_token/update", async (req, res) => {
  let { id, name } = req.body
  const updateSql = "UPDATE category SET `name` = ? WHERE `id` = ?"
  let { err, rows } = await db.async.run(updateSql, [name, id])

  if (err == null) {
    res.send({
      code: 200,
      msg: "修改-成功",
    })
  } else {
    res.send({
      code: 403,
      msg: "修改-失败",
    })
  }
})

// 文章分类删除接口
router.delete("/_token/delete", async (req, res) => {
  let id = req.query.id
  const deleteSql = "DELETE FROM category WHERE `id` = ?"
  let { err, rows } = await db.async.run(deleteSql, [id])

  if (err == null) {
    res.send({
      code: 200,
      msg: "删除-成功",
    })
  } else {
    res.send({
      code: 403,
      msg: "删除-失败",
    })
  }
})

// 文章分类列表获取接口
router.get("/list", async (req, res) => {
  const searchSql = "SELECT * FROM category ORDER BY id ASC"
  let { err, rows } = await db.async.all(searchSql, [])

  if (err == null) {
    res.send({
      code: 200,
      msg: "查询-成功",
      rows,
    })
  } else {
    res.send({
      code: 403,
      msg: "查询-失败",
    })
  }
})

module.exports = router
