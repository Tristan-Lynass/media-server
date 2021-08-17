const express = require('express')
const app = express()
const sqlite3 = require('sqlite3')
const fs = require('fs')
const fileUpload = require('express-fileupload')
const sql = require('./sql')
const imageThumbnail = require('image-thumbnail')
const cors = require('cors')
const { v4: uuid } = require('uuid');



const port = 3000
const db = new sqlite3.Database('data.db', err => err && console.log(err.message))
const UPLOAD_DIR = 'uploads'
const THUMBS_DIR = `${UPLOAD_DIR}/thumbs`

if (!fs.existsSync(UPLOAD_DIR)){
  fs.mkdirSync(UPLOAD_DIR)
}

if (!fs.existsSync(THUMBS_DIR)){
  fs.mkdirSync(THUMBS_DIR)
}


db.run(sql.initialise)

app.use(cors())
app.use(fileUpload({
  useTempFiles : true,
  tempFileDir : './tmp/'
}))

app.post('/uploads', async function(req, res) {
  let files = req.files?.media
  if (files == null) {
    return res.status(400).send()
  }

  if (!Array.isArray(files)) {
    files = [ files ]
  }

  files.forEach(file => {
    const extension = file.name.split('.').pop()
    const id = uuid()
    const filename = `${id}.${extension}`
    file.mv(`${UPLOAD_DIR}/${filename}`, async () => {
      // Note: fit != inside(not full 200x200), fill(stretches), contains(letterboxes)
      const options = { width: 200, height: 200, jpegOptions: { force: true, quality: 90 }, fit: 'cover' }
      const thumbnail = await imageThumbnail(`${UPLOAD_DIR}/${filename}`, options)
      fs.writeFile(`${THUMBS_DIR}/${id}.jpg`, thumbnail, () => {
        db.run(sql.insert, id, extension, file.md5, err => {
          console.log(err)
        })
      })
    })
  })

  res.send()
})

app.get('/uploads', (req, res) => {
  const page = req.query.page
  const size = req.query.size
  if (page == null || size == null) {
    return res.status(400).send()
  }

  const offset = page * size
  db.all(sql.getAllByPage, offset, size, (err, rows) => {
    if (err) {
      console.error(err.message)
      return res.status(500).send()
    }
    res.send( rows )
  })
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
