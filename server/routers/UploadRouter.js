const express = require("express")
const router = express.Router()
const { db, genid } = require("../db/db-utils")
const fs = require("fs")

router.post("/_token/upload", async (req, res) => {
  if (!req.files){
    res.send({
      "errno": 1,
      "message": "上传失败"
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
    // 修改名字加移动文件
    fs.renameSync(
      process.cwd() + "/public/upload/temp/" + file.filename,
      process.cwd() + "/public/upload/" + fileName
    )

    retFiles.push("/upload/" + fileName)
  }

  res.send({
    "errno": 0,
    "data": {
      "url": retFiles[0],
    }
  })
})

module.exports = router
