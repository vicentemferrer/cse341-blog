import { listUsers, readUser, createUser, updateUser, deleteUser } from '#models/user.model.js';
import { listEntries } from '#models/entry.model.js';
import { AppError } from '#utils/error.util.js';

async function getUsers(req, res) {
  // #swagger.tags = ['Users']
  try {
    const result = await listUsers();

    if (result.length === 0) throw new AppError(404, 'Users not found');

    return res.status(200).setHeader('Content-Type', 'application/json').json(result);
  } catch (err) {
    throw new AppError(err.status || 500, err.message);
  }
}

async function addUser(req, res) {
  // #swagger.tags = ['Users']
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
  // #swagger.tags = ['Users']
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
  // #swagger.tags = ['Users']
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
  // #swagger.tags = ['Users']
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
