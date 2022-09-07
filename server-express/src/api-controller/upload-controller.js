const express = require('express');
const { v4: uuid } = require('uuid');
const fs = require('fs').promises;
const imageThumbnail = require('image-thumbnail');
const requireLoggedIn = require('../middleware/require-logged-in');
const { knex } = require('../db');

const router = express.Router();
// router.get('/', requireLoggedIn, validateQuery({}), (req, res) => {
//   const page = req.query.page;
//   const size = req.query.size;
//
//   const offset = page * size;
//
//   await req.tx.select().from('core.media').where({ user_id: req.user })
//       .then((user) => {
//         if (!user) {
//           console.log('Creating default admin user. Change password immediately.');
//           return knex.insert({
//             id: uuid(),
//             username: 'admin',
//             password: bcrypt.hashSync('admin', bcrypt.genSaltSync(10), null),
//             is_admin: true,
//           }).into('core.user');
//         }
//         return Promise.resolve();
//       });
//   // try {
//   //   const rows = db.prepare(query.getAllByPage).all(offset, size)
//   //   return res.send(rows.map(row => {
//   //     row.tags = db.prepare(query.getAllTagsByMedia).all(row.id).map(r => r.name)
//   //     return row
//   //   }))
//   // } catch (e) {
//   //   console.error(e)
//   //   return res.status(500).send()
//   // }
// });
//
// router.post('/', requireLoggedIn, async (req, res) => {
//   console.log(req);
//   res.send({ id: 'g87tg76guy' });
// });

const UPLOAD_DIR = 'static/uploads';
const THUMBS_DIR = `${UPLOAD_DIR}/thumbs`;

router.post('/', requireLoggedIn, async (req, res) => {
  let files = req.files?.media;
  if (files == null) {
    return res.status(400).send();
  }

  if (!Array.isArray(files)) {
    files = [files];
  }

  // eslint-disable-next-line no-restricted-syntax
  for (const file of files) {
    const extension = file.name.split('.').pop();
    const id = uuid();
    const filename = `${id}.${extension}`;
    const path = `${UPLOAD_DIR}/${filename}`;
    // eslint-disable-next-line no-await-in-loop
    await file.mv(path);
    // Note: fit != inside(not full 200x200), fill(stretches), contains(letterboxes)
    const options = {
      width: 200, height: 200, jpegOptions: { force: true, quality: 90 }, fit: 'cover',
    };
    // eslint-disable-next-line no-await-in-loop
    const thumbnail = await imageThumbnail(path, options);
    // eslint-disable-next-line no-await-in-loop
    await fs.writeFile(`${THUMBS_DIR}/${id}.jpg`, thumbnail);

    // eslint-disable-next-line no-await-in-loop
    try {
      knex('core.media').insert({
        id,
        user_id: req.user.id,
        extension,
        original_filename: file.name,
        size: file.size,
        md5: file.md5,
      });
    } catch (e) {
      console.log(e);
    }
  }
  return res.send();
});

module.exports = router;
