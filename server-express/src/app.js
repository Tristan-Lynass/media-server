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
const { v4: uuid } = require('uuid');
const { knex, transactional } = require('./middleware/transactional-middleware');
// TODO: https://www.npmjs.com/package/config-yml

const port = 5000;
const UPLOAD_DIR = 'static/uploads';
const THUMBS_DIR = `${UPLOAD_DIR}/thumbs`;
const app = express();

function beforeStartup() {
  // Bootstrap the admin user (TODO this should probably be in its own transaction)
  return knex.select().from('core.user').where({ username: 'admin' }).first()
    .then((user) => {
      if (!user) {
        console.log('Creating default admin user. Change password immediately.');
        return knex.insert({
          id: uuid(),
          username: 'admin',
          password: bcrypt.hashSync('admin', bcrypt.genSaltSync(10), null),
          is_admin: true,
        }).into('core.user');
      }
      return Promise.resolve();
    });
}

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
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'static')));
app.use(cors());
app.use(bodyParser.json());
app.use(fileUpload({
  useTempFiles: true, tempFileDir: './tmp/',
}));

app.use(transactional);

app.use('/api', require('./api-controller'));

passport.use(new LocalStrategy({ usernameField: 'username', passwordField: 'password' }, async (username, password, done) => {
  const user = await knex.select().from('core.user').where({ username }).first();

  if (!user) {
    return done(null, false, { message: 'User does not exist' });
  }
  if (!bcrypt.compareSync(password, user.password)) {
    return done(null, false, { message: 'Password is not valid.' });
  }

  return done(null, user);
}));

passport.serializeUser((user, done) => {
  done(null, user.id);
});
passport.deserializeUser(async (id, done) => {
  const deserializedUser = await knex.select().from('core.user').where({ id }).first();
  return deserializedUser
    ? done(null, deserializedUser)
    : done(null, false, { message: 'User does not exist' });
});

beforeStartup().then(() => app.listen(port, () => console.log(`Listening at http://localhost:${port}`)));

/*
core.sessions
    "sessions_pkey" PRIMARY KEY, btree (sid)
    "sessions_expired_index" btree (expired)

create table if not exists core.user (
    id uuid primary key,
    username text not null,
    password text not null,
    is_admin boolean not null
);
 */
