const express = require('express')
const app = express()
const sqlite3 = require('sqlite3')
const fs = require('fs')
const fileUpload = require('express-fileupload')
const sql = require('./sql')
const imageThumbnail = require('image-thumbnail');
const cors = require('cors')



const port = 3000
const db = new sqlite3.Database('data.db', err => err && console.log(err.message));

db.run(sql.initialise)

app.use(cors())
app.use(fileUpload({
  useTempFiles : true,
  tempFileDir : './tmp/'
}));

app.post('/uploads', async function(req, res) {
  let files = req.files.media
  if (files == null) {
    return res.status(400).send()
  }

  if (!Array.isArray(files)) {
    files = [ files ]
  }

  files.forEach(file => {
    // console.log(file);
    const extension = file.name.split('.').pop()
    const filename = `${file.md5}.${extension}`
    file.mv(`uploads/${filename}`, async () => {
      // Note: fit != inside(not full 200x200), fill(stretches), contains(letterboxes)
      const options = { width: 200, height: 200, jpegOptions: { force: true, quality: 90 }, fit: 'cover' }
      const thumbnail = await imageThumbnail(`uploads/${filename}`, options);
      fs.writeFile(`uploads/thumbs/${filename}`, thumbnail, () => {
        db.run(sql.insert, filename)
      })
    })
  })

  res.send();
});

app.get('/uploads', (req, res) => {
  const page = req.query.page;
  const size = req.query.size;
  if (page == null || size == null) {
    return res.status(400).send()
  }

  const offset = page * size;
  db.all(sql.getAllByPage, offset, size, (err, rows) => {
    if (err) {
      return console.error(err.message);
    }
    res.send( rows );
  });
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
