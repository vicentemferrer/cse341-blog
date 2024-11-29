import { Router } from 'express';
import passport from 'passport';

import { authUser, confirmLogin, onLogin, onLogout } from '#controllers/auth.controller.js';

const router = new Router();

router.get('/', confirmLogin);
router.get('/login', passport.authenticate('github'), onLogin);
router.get('/logout', onLogout);
router.get(
  '/github/callback',
  passport.authenticate('github', { failureRedirect: '/api-docs', session: false }),
  authUser
);

export default router;
