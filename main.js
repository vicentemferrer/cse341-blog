import express from 'express';
import bodyParser from 'body-parser';

import router from '#routes/index.js';
import { connect } from 'mongoose';

const { PORT, MONGODB_URI } = process.env;

const app = express();

connect(MONGODB_URI);

// Set vars
app.set('port', PORT || 4321);

// Set middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Set routes
app.use('/', router);

const port = app.get('port');
app.listen(port, () => {
  console.log(`App listening on http://localhost:${port}`);
});
