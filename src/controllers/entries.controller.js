import {
  listEntries,
  createEntry,
  readEntry,
  updateEntry,
  deleteEntry
} from '../models/entry.model.js';
import { readUser } from '../models/user.model.js';
import { AppError } from '../utils/error.util.js';

async function getEntries(req, res) {
  /**
   * @swagger
   *  /entries:
   *      get:
   *        summary: Retrieve a list of entries
   *        description: Retrieve a list of entries from the database.
   *        responses:
   *          200:
   *            description: A list of entries.
   *            content:
   *              application/json:
   *                schema:
   *                  type: array
   *                  items:
   *                    type: object
   *                    properties:
   *                      _id:
   *                        type: string
   *                      title:
   *                        type: string
   *                      content:
   *                        type: string
   *                      comments:
   *                        type: integer
   *                      likes:
   *                        type: integer
   *                      userID:
   *                        type: string
   *                      created_at:
   *                        type: string
   *                        format: date
   *          404:
   *            description: List of entries not found
   *            content:
   *              application/json:
   *                schema:
   *                  type: object
   *                  properties:
   *                    status:
   *                      type: integer
   *                      example: 404
   *                    message:
   *                      type: string
   *                      example: Entries not found
   *          500:
   *            description: Internal server error
   *            content:
   *              application/json:
   *                schema:
   *                  type: object
   *                  properties:
   *                    status:
   *                      type: integer
   *                      example: 500
   *                    message:
   *                      type: string
   */
  try {
    const result = await listEntries();

    if (result.length === 0) throw new AppError(404, 'Entries not found');

    return res
      .status(200)
      .setHeader('Content-Type', 'application/json')
      .json(
        result.map((doc) => {
          const { comments } = doc;
          doc['_doc']['comments'] = comments.length;

          return doc;
        })
      );
  } catch (err) {
    throw new AppError(err.status || 500, err.message);
  }
}

async function addEntry(req, res) {
  /**
   * @swagger
   *  /entries:
   *      post:
   *        summary: Create a new entry
   *        description: Create a new entry in the database.
   *        parameters:
   *          - in: body
   *            name: body
   *            required: true
   *            schema:
   *              type: object
   *              properties:
   *                title:
   *                  type: string
   *                content:
   *                  type: string
   *                comments:
   *                  type: array
   *                  items:
   *                    type: string
   *                likes:
   *                  type: integer
   *                userID:
   *                  type: string
   *                created_at:
   *                  type: string
   *                  format: date
   *              required:
   *                - title
   *                - content
   *                - userID
   *        responses:
   *          201:
   *            description: Entry created.
   *            content:
   *              application/json:
   *                schema:
   *                  type: object
   *                  properties:
   *                    entryID:
   *                      type: string
   *          422:
   *            description: Error on validation
   *            content:
   *              application/json:
   *                schema:
   *                  type: object
   *                  properties:
   *                    status:
   *                      type: integer
   *                      example: 422
   *                    message:
   *                      type: string
   *                      example: Error on entry creation.
   *                    details:
   *                      type: object
   *                      properties:
   *                        [prop]:
   *                          type: string
   *                          example: [Error description]
   *          500:
   *            description: Internal server error
   *            content:
   *              application/json:
   *                schema:
   *                  type: object
   *                  properties:
   *                    status:
   *                      type: integer
   *                      example: 500
   *                    message:
   *                      type: string
   */

  const { body } = req;

  try {
    const result = await createEntry(body);

    if (!result) throw new Error(result.error || 'Not created entry');

    return res
      .status(201)
      .setHeader('Content-Type', 'application/json')
      .json({ entryID: result['_id'] });
  } catch (err) {
    throw new AppError(err.status || 500, err.message);
  }
}

async function getEntry(req, res) {
  /**
   * @swagger
   *  /entries/{id}:
   *      get:
   *        summary: Retrieve an existing entry
   *        description: Retrieve an entry from the database.
   *        parameters:
   *          - in: path
   *            name: id
   *            required: true
   *            schema:
   *              type: string
   *        responses:
   *          200:
   *            description: An existing entry.
   *            content:
   *              application/json:
   *                schema:
   *                  type: object
   *                  properties:
   *                    _id:
   *                      type: string
   *                    title:
   *                      type: string
   *                    content:
   *                      type: string
   *                    comments:
   *                      type: array
   *                      items:
   *                        type: string
   *                    likes:
   *                      type: integer
   *                    created_at:
   *                      type: string
   *                      format: date
   *                    user:
   *                      type: object
   *                      properties:
   *                        _id:
   *                          type: string
   *                        username:
   *                          type: string
   *                        firstName:
   *                          type: string
   *                        lastName:
   *                          type: string
   *                        email:
   *                          type: string
   *                        birthday:
   *                          type: string
   *                          format: date
   *          400:
   *            description: Error on validation
   *            content:
   *              application/json:
   *                schema:
   *                  type: object
   *                  properties:
   *                    status:
   *                      type: integer
   *                      example: 400
   *                    message:
   *                      type: string
   *                      example: Error on find ID.
   *                    details:
   *                      type: object
   *                      properties:
   *                        id:
   *                          type: string
   *                          example: Invalid ID.
   *          404:
   *            description: Entry not found
   *            content:
   *              application/json:
   *                schema:
   *                  type: object
   *                  properties:
   *                    status:
   *                      type: integer
   *                      example: 404
   *                    message:
   *                      type: string
   *                      example: Entry not found
   *          500:
   *            description: Internal server error
   *            content:
   *              application/json:
   *                schema:
   *                  type: object
   *                  properties:
   *                    status:
   *                      type: integer
   *                      example: 500
   *                    message:
   *                      type: string
   */

  const { id } = req.params;

  try {
    const result = await readEntry(id);

    if (!result) throw new AppError(404, 'Entry not found');

    const user = await readUser(result.userID);

    delete result['_doc'].userID;

    return res
      .status(200)
      .setHeader('Content-Type', 'application/json')
      .json({ ...result['_doc'], user: user['_doc'] });
  } catch (err) {
    throw new AppError(err.status || 500, err.message);
  }
}

async function modifyEntry(req, res) {
  /**
   * @swagger
   *  /entries/{id}:
   *      put:
   *        summary: Update an existing entry
   *        description: Update an existing entry in the database.
   *        parameters:
   *          - in: path
   *            name: id
   *            required: true
   *            schema:
   *              type: string
   *          - in: body
   *            name: body
   *            required: true
   *            schema:
   *              type: object
   *              properties:
   *                title:
   *                  type: string
   *                content:
   *                  type: string
   *                comments:
   *                  type: array
   *                  items:
   *                    type: string
   *                likes:
   *                  type: integer
   *                userID:
   *                  type: string
   *        responses:
   *          204:
   *            description: Entry updated successfully. No content in response.
   *          400:
   *            description: Error on validation
   *            content:
   *              application/json:
   *                schema:
   *                  type: object
   *                  properties:
   *                    status:
   *                      type: integer
   *                      example: 400
   *                    message:
   *                      type: string
   *                      example: Error on entry creation.
   *                    details:
   *                      type: object
   *                      properties:
   *                        [prop]:
   *                          type: string
   *                          example: [Error description]
   *          500:
   *            description: Internal server error
   *            content:
   *              application/json:
   *                schema:
   *                  type: object
   *                  properties:
   *                    status:
   *                      type: integer
   *                      example: 500
   *                    message:
   *                      type: string
   */
  const {
    body,
    params: { id }
  } = req;

  try {
    const result = await updateEntry(id, body);

    if (result.modifiedCount <= 0) throw new Error(result.errors || 'Not modified entry');

    return res.status(204).setHeader('Content-Type', 'application/json').json(result);
  } catch (err) {
    throw new AppError(err.status || 500, err.message);
  }
}

async function eraseEntry(req, res) {
  /**
   * @swagger
   *  /entries/{id}:
   *      delete:
   *        summary: Delete an existing entry
   *        description: Delete an entry from the database.
   *        parameters:
   *          - in: path
   *            name: id
   *            required: true
   *            schema:
   *              type: string
   *        responses:
   *          204:
   *            description: Entry deleted successfully. No content in response.
   *          400:
   *            description: Error on validation
   *            content:
   *              application/json:
   *                schema:
   *                  type: object
   *                  properties:
   *                    status:
   *                      type: integer
   *                      example: 400
   *                    message:
   *                      type: string
   *                      example: Error on find ID.
   *                    details:
   *                      type: object
   *                      properties:
   *                        id:
   *                          type: string
   *                          example: Invalid ID.
   *          500:
   *            description: Internal server error
   *            content:
   *              application/json:
   *                schema:
   *                  type: object
   *                  properties:
   *                    status:
   *                      type: integer
   *                      example: 500
   *                    message:
   *                      type: string
   */
  const { id } = req.params;

  try {
    const result = await deleteEntry(id);

    if (result.modifiedCount <= 0) throw new Error(result.error || 'Not deleted entry');

    return res.status(204).setHeader('Content-Type', 'application/json').json(result);
  } catch (err) {
    throw new AppError(err.status || 500, err.message);
  }
}

export { getEntries, addEntry, getEntry, modifyEntry, eraseEntry };
