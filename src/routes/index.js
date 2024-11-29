import { Router } from 'express';

import authRoute from '#routes/auth.route.js';
import docsRoute from '#routes/docs.route.js';
import usersRoute from '#routes/users.route.js';
import entriesRoute from '#routes/entries.route.js';

const router = new Router();

router.use('/', authRoute);
router.use('/api-docs', docsRoute);
router.use('/users', usersRoute);
router.use('/entries', entriesRoute);

router.use(async (err, req, res, next) => {
  return res.status(err.status).setHeader('Content-Type', 'application/json').json({
    status: err.status,
    message: err.message
  });
});

export default router;
