import { param, validationResult } from 'express-validator';
import { ValidationError, detailValidationErrors } from './error.util.js';

function idRules() {
  return [
    param('id')
      .isLength({ min: 24, max: 24 })
      .matches(/^[a-fA-F0-9]+$/)
      .isMongoId()
      .withMessage('Invalid ID.')
  ];
}

function checkOnId(req, res, next) {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const details = detailValidationErrors(errors.array());

    return res
      .status(400)
      .setHeader('Content-Type', 'application/json')
      .json(new ValidationError(400, 'Error on find ID.', details));
  }

  next();
}

export { idRules, checkOnId };
