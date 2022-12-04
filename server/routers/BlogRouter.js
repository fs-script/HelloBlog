const express = require("express")
const { db, genid } = require("../db/db-utils")

const router = express.Router()

// 文章添加接口
router.post("/_token/add", async (req, res) => {
  let { title, categoryId, content } = req.body
  let id = genid.NextId()
  let createTime = new Date().getTime()
  const insertSql = "INSERT INTO blog (`id`, `title`, `category_id`, `content`, `create_time`) VALUES (?, ?, ?, ?, ?)"
  let params = [id, title, categoryId, content, createTime]
  let { err, rows } = await db.async.run(insertSql, params)

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

// 文章修改接口
router.put("/_token/update", async (req, res) => {
  let { id, title, categoryId, content } = req.body
  const updateSql = "UPDATE blog SET `title` = ?, `category_id` = ?, `content` = ? WHERE `id` = ?"
  let params = [title, categoryId, content, id]
  let { err, rows } = await db.async.run(updateSql, params)

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

// 文章删除接口
router.delete("/_token/delete", async (req, res) => {
  let id = req.query.id
  const deleteSql = "DELETE FROM blog WHERE `id` = ?"
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

// 文章分页列表获取接口
router.get("/search", async (req, res) => {
  let { keyword, categoryId, page, pageSize } = req.query
  keyword = (keyword == null) ? "" : keyword
  categoryId = (categoryId == null) ? 0 : categoryId
  page = (page == null) ? 1 : page;
  pageSize = (pageSize == null) ? 10 : pageSize

  let params = []
  let whereSql = []
  let whereSqlStr = ""

  if (categoryId != 0) {
      whereSql.push(" `category_id` = ? ")
      params.push(categoryId)
  }

  if (keyword != "") {
      whereSql.push(" (`title` LIKE ? OR `content` LIKE ?) ")
      params.push("%" + keyword + "%")
      params.push("%" + keyword + "%")
  }

  if (whereSql.length > 0) {
      whereSqlStr = " WHERE " + whereSql.join(" AND ")
  }

  let searchSql = " SELECT id, category_id, create_time, title, substr(content,0,50) AS content FROM blog " + whereSqlStr + " ORDER BY create_time DESC LIMIT ?, ? "
  let searchSqlParams = params.concat([(page - 1) * pageSize, pageSize])

  // 数据总数
  let searchCountSql = " SELECT count(*) AS `count` FROM blog " + whereSqlStr
  let searchCountParams = params

  // 分页数据
  let searchResult = await db.async.all(searchSql, searchSqlParams)
  let countResult = await db.async.all(searchCountSql, searchCountParams)

  if (searchResult.err == null && countResult.err == null) {
    res.send({
      code: 200,
      msg: "查询-成功",
      data: {
        keyword,
        categoryId,
        page,
        pageSize,
        rows: searchResult.rows,
        count: countResult.rows[0].count,
      }
    })
  } else {
    res.send({
      code: 403,
      msg: "查询-失败",
    })
  }
})

// 文章详情获取接口
router.get("/detail", async (req, res) => {
  let { id } = req.query
  let detailSql = "SELECT * FROM blog WHERE `id` = ?"
  let { err, rows } = await db.async.all(detailSql, [id])

  if (err == null) {
    res.send({
      code: 200,
      msg: "获取-成功",
      rows,
    })
  } else {
    res.send({
      code: 403,
      msg: "获取-失败",
    })
  }
})

module.exports = router
