const express = require("express")
const router = express.Router()
const { db, genid } = require("../db/db-utils")

// 添加分类
router.post("/_token/add", async (req, res) => {
  let { name } = req.body
  const inspectSql = "SELECT * FROM category WHERE `name`=?"
  const insertSql = "INSERT INTO category (`id`, `name`) VALUES (?, ?)"
  let inspectResult = await db.async.all(inspectSql, [name])

  if (inspectResult.err != null || inspectResult.rows.length > 0) {
    res.send({
      code: 403,
      msg: "分类已存在"
    })

    return
  }

  let { err, rows } = await db.async.run(insertSql, [genid.NextId(), name])

  if (err == null) {
    res.send({
      code: 200,
      msg: "添加成功",
    })
  } else {
    res.send({
      code: 403,
      msg: "添加失败",
    })
  }
})

// 修改分类
router.put("/_token/update", async (req, res) => {
  let { id, name } = req.body
  const updateSql = "UPDATE category SET `name` = ? WHERE `id` = ?"
  let { err, rows } = await db.async.run(updateSql, [name, id])

  if (err == null) {
    res.send({
      code: 200,
      msg: "修改成功",
    })
  } else {
    res.send({
      code: 403,
      msg: "修改失败",
    })
  }
})

// 删除分类
router.delete("/_token/delete", async (req, res) => {
  let id = req.query.id
  const deleteSql = "DELETE FROM category WHERE `id` = ?"
  let { err, rows } = await db.async.run(deleteSql, [id])

  if (err == null) {
    res.send({
      code: 200,
      msg: "删除成功",
    })
  } else {
    res.send({
      code: 403,
      msg: "删除失败",
    })
  }
})

// 分类列表
router.get("/list", async (req, res) => {
  const searchSql = "SELECT * FROM category"
  let { err, rows } = await db.async.all(searchSql, [])

  if (err == null) {
    res.send({
      code: 200,
      msg: "查询成功",
      rows,
    })
  } else {
    res.send({
      code: 403,
      msg: "查询失败",
    })
  }
})

module.exports = router
