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

const router = new Router();

/**
 * @swagger
 * tags:
 *    name: Users
 *    description: Endpoint for users in the system
 */

router.get('/', handleErrors(getUsers));
router.post('/', createRules(), checkOnCreate, handleErrors(addUser));

router.get('/:id', idRules(), checkOnId, handleErrors(getUser));
router.put('/:id', updateRules(), checkOnUpdate, handleErrors(modifyUser));
router.delete('/:id', idRules(), checkOnId, handleErrors(eraseUser));

export default router;
