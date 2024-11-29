import { Router } from 'express';

import {
  getUsers,
  getUser,
  addUser,
  modifyUser,
  eraseUser
} from '#controllers/users.controller.js';

import { createRules, checkOnCreate, updateRules, checkOnUpdate } from '#utils/user.validation.js';
import { idRules, checkOnId } from '#utils/id.validation.js';
import { handleErrors } from '#utils/error.util.js';
import { isAuthenticated } from '#utils/passport.util.js';

const router = new Router();

/**
 * @swagger
 * tags:
 *    name: Users
 *    description: Endpoint for users in the system
 */

router.get('/', handleErrors(getUsers));
router.post('/', createRules(), checkOnCreate, isAuthenticated, handleErrors(addUser));

router.get('/:id', idRules(), checkOnId, handleErrors(getUser));
router.put('/:id', updateRules(), checkOnUpdate, isAuthenticated, handleErrors(modifyUser));
router.delete('/:id', idRules(), checkOnId, isAuthenticated, handleErrors(eraseUser));

export default router;
