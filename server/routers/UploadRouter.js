const express = require("express")
const fs = require("fs")
const { genid } = require("../db/db-utils")

const router = express.Router()

// 文件上传接口
router.post("/upload", async (req, res) => {
  if (!req.files){
    res.send({
      "error": 1,
      "message": "上传-失败"
    })

    return
  }

  let files = req.files
  let retFiles = []

  for (let file of files) {
    // 获取文件的后缀
    let fileExt = file.originalname.substring(file.originalname.lastIndexOf(".") + 1)
    // 随机文件名字
    let fileName = genid.NextId() + "." + fileExt
    // 修改名字以及移动文件
    fs.renameSync(
      process.cwd() + "/public/upload/temp/" + file.filename,
      process.cwd() + "/public/upload/" + fileName
    )

    retFiles.push("/upload/" + fileName)
  }

  res.send({
    "error": 0,
    "data": {
      "url": retFiles[0],
    }
  })
})

module.exports = router
