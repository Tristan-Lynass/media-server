const express = require('express')
const app = express()
const Database = require('better-sqlite3')
const fs = require('fs')
const fileUpload = require('express-fileupload')
const query = require('./query')
const imageThumbnail = require('image-thumbnail')
const cors = require('cors')
const { v4: uuid } = require('uuid')
const sizeOf = require('image-size')
const bodyParser = require('body-parser')


const port = 3000
const db = new Database('data.db', { verbose: console.log })
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

const schema = fs.readFileSync('schema.sql', 'utf8')
db.exec(schema)

app.use(express.static(__dirname + '/static'))
app.use(cors())
app.use(bodyParser.json())
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
        const size = file.size
        const now = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '')

        sizeOf(path, (err, dim) =>
            db.prepare(query.insert).run(id, extension, file.name, now, dim.width, dim.height, size, file.md5)
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
  try {
    const rows = db.prepare(query.getAllByPage).all(offset, size)
    return res.send(rows.map(row => {
      row.tags = db.prepare(query.getAllTagsByMedia).all(row.id).map(r => r.name)
      return row
    }))
  } catch (e) {
    console.error(e)
    return res.status(500).send()
  }
})

app.post('/api/media/tag', (req, res) => {
  const tag = req.body.tag
  const mediaId = req.body.mediaId
  let tagId
  try {
    tagId = db.prepare(query.getTagId).get(tag)?.id
    if (tagId == null) {
      tagId = uuid()
      db.prepare(query.createTag).run(tagId, tag)
    }

    db.prepare(query.addMediaTag).run(mediaId, tagId)
    res.send()
  } catch (e) {
    console.error(`Error on adding tag: tag=${tag}, mediaId=${mediaId}, tagId=${tagId}`)
    console.error(e)
    res.status(500).send()
  }
})

app.delete('/api/media/tag', (req, res) => {
  const mediaId = req.query.mediaId
  const tag = req.query.tag
  const tagId = db.prepare(query.getTagId).get(tag)?.id
  if (tagId == null) {
    return res.status(400).send()
  }
  db.prepare(query.removeMediaTag).run(mediaId, tagId)
  const count = db.prepare(query.getTagUsageCount).get(tagId).c
  if (count === 0) {
    db.prepare(query.deleteTag).run(tagId)
  }
  res.send()
})

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`)
})
