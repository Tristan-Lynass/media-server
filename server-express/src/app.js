const express = require('express');
const path = require('path');
const fs = require('fs');
const fileUpload = require('express-fileupload');
// import imageThumbnail from 'image-thumbnail';
const cors = require('cors');
// import sizeOf from 'image-size';
const bodyParser = require('body-parser');

const session = require('express-session');
const KnexSessionStore = require('connect-session-knex')(session);
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
const { knex, transactional } = require('./transactional-middleware');
// TODO: https://www.npmjs.com/package/config-yml

const port = 5000;
const UPLOAD_DIR = 'static/uploads';
const THUMBS_DIR = `${UPLOAD_DIR}/thumbs`;
const app = express();

// db.schema.createTable('wow.user', (table) => {
//   table.string('name');
//   table.integer('age');
// });
// console.log(db);

if (!(fs.existsSync('static'))) {
  fs.mkdirSync('static');
}

if (!fs.existsSync(UPLOAD_DIR)) {
  fs.mkdirSync(UPLOAD_DIR);
}

if (!fs.existsSync(THUMBS_DIR)) {
  fs.mkdirSync(THUMBS_DIR);
}

app.use(session({
  secret: 'FIXME: configure through yaml, requireDefined',
  resave: true,
  saveUninitialized: true,
  store: new KnexSessionStore({ knex, tablename: 'session', createtable: true }),
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, 'static')));
app.use(cors());
app.use(bodyParser.json());
app.use(fileUpload({
  useTempFiles: true, tempFileDir: './tmp/',
}));

app.use(transactional);

app.use('/api', require('./api-controller'));

passport.use(new LocalStrategy({ usernameField: 'username', passwordField: 'password' }, async (username, password, done) => {
  const user = await knex.select().from('core.user').where({ username }).limit(1);

  if (!user) {
    return done(null, false, { message: 'User does not exist' });
  }

  if (!bcrypt.compareSync(password, user.password)) {
    return done(null, false, { message: 'Password is not valid.' });
  }

  return done(null, true);
}));

passport.serializeUser((user, done) => {
  done(null, user.id);
});
passport.deserializeUser(async (user, done) => {
  const deserializedUser = await knex.select().from('core.user').where(user).limit(1);
  return deserializedUser
    ? done(null, deserializedUser)
    : done(null, false, { message: 'User does not exist' });
});

app.listen(port, () => console.log(`Listening at http://localhost:${port}`));

/*
core.sessions
    "sessions_pkey" PRIMARY KEY, btree (sid)
    "sessions_expired_index" btree (expired)
 */
