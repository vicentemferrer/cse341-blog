import { body, param, validationResult } from 'express-validator';
import { ValidationError, detailValidationErrors } from './error.util.js';
import { checkExistingId } from '../models/entry.model.js';

function createRules() {
  return [
    body('title').trim().escape().notEmpty().isLength({ min: 5 }).withMessage('Invalid title.'),
    body('content').trim().escape().notEmpty().isLength({ min: 5 }).withMessage('Invalid content.'),
    body('comments')
      .optional()
      .isArray()
      .withMessage('Must be an array')
      .custom((array) => array.every((item) => typeof item === 'string'))
      .withMessage('All elements must be strings'),
    body('likes')
      .optional()
      .trim()
      .escape()
      .notEmpty()
      .isInt({ min: 0 })
      .withMessage('Invalid likes quantity.'),
    body('userID')
      .isLength({ min: 24, max: 24 })
      .matches(/^[a-fA-F0-9]+$/)
      .isMongoId()
      .withMessage('Invalid user ID.')
      .custom(async (id) => {
        const idExists = await checkExistingId(id);
        if (!idExists) {
          throw new Error('User does not exists.');
        }
      })
  ];
}

function checkOnCreate(req, res, next) {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const details = detailValidationErrors(errors.array());

    return res
      .status(422)
      .setHeader('Content-Type', 'application/json')
      .json(new ValidationError(422, 'Error on entry creation.', details));
  }

  next();
}

function updateRules() {
  return [
    param('id')
      .isLength({ min: 24, max: 24 })
      .matches(/^[a-fA-F0-9]+$/)
      .isMongoId()
      .withMessage('Invalid ID.'),
    body('title')
      .optional()
      .trim()
      .escape()
      .notEmpty()
      .isLength({ min: 5 })
      .withMessage('Invalid title.'),
    body('content')
      .optional()
      .trim()
      .escape()
      .notEmpty()
      .isLength({ min: 5 })
      .withMessage('Invalid content.'),
    body('comments')
      .optional()
      .isArray()
      .withMessage('Must be an array')
      .custom((array) => array.every((item) => typeof item === 'string'))
      .withMessage('All elements must be strings'),
    body('likes')
      .optional()
      .trim()
      .escape()
      .notEmpty()
      .isInt({ min: 0 })
      .withMessage('Invalid likes quantity.'),
    body('userID')
      .optional()
      .isLength({ min: 24, max: 24 })
      .matches(/^[a-fA-F0-9]+$/)
      .isMongoId()
      .withMessage('Invalid user ID.')
      .custom(async (id) => {
        const idExists = await checkExistingId(id);
        if (!idExists) {
          throw new Error('User does not exists.');
        }
      })
  ];
}

function checkOnUpdate(req, res, next) {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const details = detailValidationErrors(errors.array());

    return res
      .status(400)
      .setHeader('Content-Type', 'application/json')
      .json(new ValidationError(400, 'Error on entry creation.', details));
  }

  next();
}

export { createRules, checkOnCreate, updateRules, checkOnUpdate };
