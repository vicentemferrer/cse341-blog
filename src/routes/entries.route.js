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

const router = new Router();

router.get('/', getEntries);
router.post('/', createRules(), checkOnCreate, addEntry);

router.get('/:id', idRules(), checkOnId, handleErrors(getEntry));
router.put('/:id', updateRules(), checkOnUpdate, modifyEntry);
router.delete('/:id', idRules(), checkOnId, eraseEntry);

export default router;
