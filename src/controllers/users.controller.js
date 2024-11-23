import { listUsers, readUser, createUser, updateUser, deleteUser } from '../models/user.model.js';
import { listEntries } from '../models/entry.model.js';
import { AppError } from '../utils/error.util.js';

async function getUsers(req, res) {
  /**
   * @swagger
   *  /users:
   *      get:
   *        summary: Retrieve a list of users
   *        description: Retrieve a list of users from the database.
   *        responses:
   *          200:
   *            description: A list of users.
   *            content:
   *              application/json:
   *                schema:
   *                  type: array
   *                  items:
   *                    type: object
   *                    properties:
   *                      _id:
   *                        type: string
   *                      username:
   *                        type: string
   *                      firstName:
   *                        type: string
   *                      lastName:
   *                        type: string
   *                      email:
   *                        type: string
   *                      birthday:
   *                        type: string
   *                        format: date
   *          404:
   *            description: List of users not found
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
   *                      example: Users not found
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
    const result = await listUsers();

    if (result.length === 0) throw new AppError(404, 'Users not found');

    return res.status(200).setHeader('Content-Type', 'application/json').json(result);
  } catch (err) {
    throw new AppError(err.status || 500, err.message);
  }
}

async function addUser(req, res) {
  /**
   * @swagger
   *  /users:
   *      post:
   *        summary: Create a new user
   *        description: Create a new user in the database.
   *        parameters:
   *          - in: body
   *            name: body
   *            required: true
   *            schema:
   *              type: object
   *              properties:
   *                username:
   *                  type: string
   *                firstName:
   *                  type: string
   *                lastName:
   *                  type: string
   *                email:
   *                  type: string
   *                birthday:
   *                  type: string
   *                  format: date
   *        responses:
   *          201:
   *            description: User created.
   *            content:
   *              application/json:
   *                schema:
   *                  type: object
   *                  properties:
   *                    userID:
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
   *                      example: Error on user creation.
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
    const result = await createUser(body);

    if (!result) throw new Error(result.error || 'Not created contact');

    return res
      .status(201)
      .setHeader('Content-Type', 'application/json')
      .json({ userID: result['_id'] });
  } catch (err) {
    throw new AppError(err.status || 500, err.message);
  }
}

async function getUser(req, res) {
  /**
   * @swagger
   *  /users/{id}:
   *      get:
   *        summary: Retrieve an existing user
   *        description: Retrieve a user from the database.
   *        parameters:
   *          - in: path
   *            name: id
   *            required: true
   *            schema:
   *              type: string
   *        responses:
   *          200:
   *            description: An existing user.
   *            content:
   *              application/json:
   *                schema:
   *                  type: object
   *                  properties:
   *                    _id:
   *                      type: string
   *                    username:
   *                      type: string
   *                    firstName:
   *                      type: string
   *                    lastName:
   *                      type: string
   *                    email:
   *                      type: string
   *                    birthday:
   *                      type: string
   *                      format: date
   *                    entries:
   *                      type: array
   *                      items:
   *                        type: string
   *                        description: Written Entry ID
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
   *            description: User not found
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
   *                      example: User not found
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
    const result = await readUser(id);

    if (!result) throw new AppError(404, 'User not found');

    const entries = await listEntries({ userID: id });

    return res
      .status(200)
      .setHeader('Content-Type', 'application/json')
      .json({ ...result['_doc'], entries: entries.map((doc) => doc['_id']) });
  } catch (err) {
    throw new AppError(err.status || 500, err.message);
  }
}

async function modifyUser(req, res) {
  /**
   * @swagger
   *  /users/{id}:
   *      put:
   *        summary: Update an existing user
   *        description: Update an existing user in the database.
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
   *                username:
   *                  type: string
   *                firstName:
   *                  type: string
   *                lastName:
   *                  type: string
   *                email:
   *                  type: string
   *                birthday:
   *                  type: string
   *                  format: date
   *        responses:
   *          204:
   *            description: User updated successfully. No content in response.
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
   *                      example: Error on user modification.
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
    const result = await updateUser(id, body);

    if (result.modifiedCount <= 0) throw new Error(result.errors || 'Not modified contact');

    return res.status(204).setHeader('Content-Type', 'application/json').json(result);
  } catch (err) {
    throw new AppError(err.status || 500, err.message);
  }
}

async function eraseUser(req, res) {
  /**
   * @swagger
   *  /users/{id}:
   *      delete:
   *        summary: Delete an existing user
   *        description: Delete a user from the database.
   *        parameters:
   *          - in: path
   *            name: id
   *            required: true
   *            schema:
   *              type: string
   *        responses:
   *          204:
   *            description: User deleted successfully. No content in response.
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
    const result = await deleteUser(id);

    if (result.modifiedCount <= 0) throw new Error(result.error || 'Not deleted contact');

    return res.status(204).setHeader('Content-Type', 'application/json').json(result);
  } catch (err) {
    throw new AppError(err.status || 500, err.message);
  }
}

export { getUsers, addUser, getUser, modifyUser, eraseUser };
