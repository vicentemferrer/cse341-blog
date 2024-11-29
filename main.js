import express from 'express';
import bodyParser from 'body-parser';
import session from 'express-session';
import passport from 'passport';
import MongoStore from 'connect-mongo';

import { initDB } from '#db/db.connection.js';
import { strategy } from '#utils/passport.util.js';
import { findUser } from '#models/auth.model.js';
import router from '#routes/index.js';

const { PORT, SESSION_SECRET, MONGODB_URI } = process.env;

const app = express();

// Set vars
app.set('port', PORT || 4321);

// Set middlewares
// Session middleware
app.use(
  session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({ mongoUrl: MONGODB_URI })
  })
);

// Passport
app.use(passport.initialize());
app.use(passport.session());

// CORS
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Z-KeyI'
  );
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  next();
});

// Body Parser
app.use(bodyParser.json());

// Passport settings
passport.use(strategy);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser(findUser);

// Set routes
app.use('/', router);

initDB((err) => {
  if (err) {
    console.log(`Error on initDB: ${err.message}`);
    return;
  }

  const port = app.get('port');
  app.listen(port, () => {
    console.log(`App listening on http://localhost:${port}`);
  });
});
