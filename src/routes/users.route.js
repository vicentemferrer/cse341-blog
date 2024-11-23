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

// import { handleErrors } from '#utils/error.util.js';

const router = new Router();

router.get('/', getUsers);
router.post('/', createRules(), checkOnCreate, addUser);

router.get('/:id', idRules(), checkOnId, getUser);
router.put('/:id', updateRules(), checkOnUpdate, modifyUser);
router.delete('/:id', idRules(), checkOnId, eraseUser);

export default router;
