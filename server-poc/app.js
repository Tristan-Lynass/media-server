const express = require('express')
const app = express()
const port = 3000
const sqlite3 = require('sqlite3')
const db = new sqlite3.Database('data.db');
const fs = require('fs')

const fileUpload = require('express-fileupload')

app.use(fileUpload({
  useTempFiles : true,
  tempFileDir : './tmp/'
}));

app.post('/upload', function(req, res) {
  req.files.media.forEach(file => {
    fs.rename(file.tempFilePath, `uploads/${md5}.jpg`)
    // TODO: Generate a thumbnail
    // TODO: Add to database
  })

  console.log(req.files.media); // the uploaded file object
});

app.get('/', (req, res) => {
  console.log(req)
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})