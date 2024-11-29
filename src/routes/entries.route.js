import { Router } from 'express';

import {
  getEntries,
  getEntry,
  addEntry,
  modifyEntry,
  eraseEntry
} from '#controllers/entries.controller.js';

import { createRules, checkOnCreate, updateRules, checkOnUpdate } from '#utils/entry.validation.js';
import { idRules, checkOnId } from '#utils/id.validation.js';
import { handleErrors } from '#utils/error.util.js';
import { isAuthenticated } from '#utils/passport.util.js';

const router = new Router();

/**
 * @swagger
 * tags:
 *    name: Entries
 *    description: Endpoint for entries in the system
 */

router.get('/', handleErrors(getEntries));
router.post('/', createRules(), checkOnCreate, isAuthenticated, handleErrors(addEntry));

router.get('/:id', idRules(), checkOnId, handleErrors(getEntry));
router.put('/:id', updateRules(), checkOnUpdate, isAuthenticated, handleErrors(modifyEntry));
router.delete('/:id', idRules(), checkOnId, isAuthenticated, handleErrors(eraseEntry));

export default router;
