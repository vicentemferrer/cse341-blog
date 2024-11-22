import { Router } from 'express';

import usersRoute from '#routes/users.route.js';
import entriesRoute from '#routes/entries.route.js';

const router = new Router();

router.get('/', (req, res) => res.send('Hello World'));

router.use('/users', usersRoute);
router.use('/entries', entriesRoute);

export default router;
