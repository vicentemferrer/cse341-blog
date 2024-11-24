import { body, param, validationResult } from 'express-validator';
import { ValidationError, detailValidationErrors } from '#utils/error.util.js';

function createRules() {
  return [
    body('username')
      .trim()
      .escape()
      .notEmpty()
      .isLength({ min: 4 })
      .withMessage('Invalid username.'),
    body('firstName')
      .trim()
      .escape()
      .notEmpty()
      .isLength({ min: 1 })
      .withMessage('Invalid first name.'),
    body('lastName')
      .trim()
      .escape()
      .notEmpty()
      .isLength({ min: 2 })
      .withMessage('Invalid last name.'),
    body('email')
      .trim()
      .escape()
      .notEmpty()
      .isEmail()
      .normalizeEmail()
      .withMessage('Invalid email.'),
    body('birthday').trim().escape().notEmpty().isDate().withMessage('Invalid birthday.')
  ];
}

function checkOnCreate(req, res, next) {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const details = detailValidationErrors(errors.array());

    return res
      .status(422)
      .setHeader('Content-Type', 'application/json')
      .json(new ValidationError(422, 'Error on user creation.', details));
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

    body('username')
      .optional()
      .trim()
      .escape()
      .notEmpty()
      .isLength({ min: 4 })
      .withMessage('Invalid username.'),

    body('firstName')
      .optional()
      .trim()
      .escape()
      .notEmpty()
      .isLength({ min: 1 })
      .withMessage('Invalid first name.'),

    body('lastName')
      .optional()
      .trim()
      .escape()
      .notEmpty()
      .isLength({ min: 2 })
      .withMessage('Invalid last name.'),

    body('email')
      .optional()
      .trim()
      .escape()
      .notEmpty()
      .isEmail()
      .normalizeEmail()
      .withMessage('Invalid email.'),

    body('birthday').optional().trim().escape().notEmpty().isDate().withMessage('Invalid birthday.')
  ];
}

function checkOnUpdate(req, res, next) {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const details = detailValidationErrors(errors.array());

    return res
      .status(400)
      .setHeader('Content-Type', 'application/json')
      .json(new ValidationError(400, 'Error on user modification.', details));
  }

  next();
}

export { createRules, checkOnCreate, updateRules, checkOnUpdate };
