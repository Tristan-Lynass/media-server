const express = require('express')
const app = express()
const sqlite3 = require('sqlite3')
const fs = require('fs')
const fileUpload = require('express-fileupload')
const sql = require('./sql')
const imageThumbnail = require('image-thumbnail')
const cors = require('cors')
const { v4: uuid } = require('uuid');
const sizeOf = require('image-size');



const port = 3000
const db = new sqlite3.Database('data.db', err => err && console.log(err.message))
const UPLOAD_DIR = 'static/uploads'
const THUMBS_DIR = `${UPLOAD_DIR}/thumbs`

if (!(fs.existsSync('static'))) {
  fs.mkdirSync('static')
}

if (!fs.existsSync(UPLOAD_DIR)) {
  fs.mkdirSync(UPLOAD_DIR)
}

if (!fs.existsSync(THUMBS_DIR)) {
  fs.mkdirSync(THUMBS_DIR)
}


db.run(sql.init_media)
db.run(sql.init_tag)

app.use(express.static(__dirname + '/static'));
app.use(cors())
app.use(fileUpload({
  useTempFiles : true,
  tempFileDir : './tmp/'
}))

app.post('/api/uploads', async function(req, res) {
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
    const path = `${UPLOAD_DIR}/${filename}`
    file.mv(path, async () => {
      // Note: fit != inside(not full 200x200), fill(stretches), contains(letterboxes)
      const options = { width: 200, height: 200, jpegOptions: { force: true, quality: 90 }, fit: 'cover' }
      const thumbnail = await imageThumbnail(path, options)
      fs.writeFile(`${THUMBS_DIR}/${id}.jpg`, thumbnail, () => {
        const size = file.size;
        const now = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');

        sizeOf(path, (err, dim) =>
            db.run(sql.insert, id, extension, now, dim.width, dim.height, size, file.md5, err => console.log(err))
        )
      })
    })
  })

  res.send()
})

app.get('/api/uploads', (req, res) => {
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
