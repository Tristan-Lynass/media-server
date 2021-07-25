const express = require('express')
const app = express()
const sqlite3 = require('sqlite3')
const fs = require('fs')
const fileUpload = require('express-fileupload')
const sql = require('./sql')

const port = 3000
const db = new sqlite3.Database('data.db', err => err && console.log(err.message));

db.run(sql.initialise)

app.use(fileUpload({
  useTempFiles : true,
  tempFileDir : './tmp/'
}));

app.post('/uploads', async function(req, res) {
  req.files.media.forEach(async file => {
    const filename = `${file.md5}.jpg`;
    fs.rename(file.tempFilePath, `uploads/${filename}`, () => {
      // TODO: Generate a thumbnail

      db.run(sql.insert, filename)
    })

  })

  // console.log(req.files.media); // the uploaded file object
  res.send();
});

app.get('/uploads', (req, res) => {
  const page = req.query.page;
  const pageSize = 50;
  const offset = page * pageSize;
  console.log(sql.getPage, pageSize, offset)
  db.all(sql.getPage, offset, pageSize, (err, rows) => {
    if (err) {
      return console.error(err.message);
    }
    res.send( rows );
  });
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})