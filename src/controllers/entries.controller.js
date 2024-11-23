import {
  listEntries,
  createEntry,
  readEntry,
  updateEntry,
  deleteEntry
} from '#models/entry.model.js';
import { readUser } from '#models/user.model.js';
import { AppError } from '#utils/error.util.js';

async function getEntries(req, res) {
  // #swagger.tags = ['Entries']
  try {
    const result = await listEntries();

    if (result.length === 0) throw new AppError(404, 'Entries not found');

    return res.status(200).setHeader('Content-Type', 'application/json').json(result);
  } catch (err) {
    throw new AppError(err.status || 500, err.message);
  }
}

async function addEntry(req, res) {
  // #swagger.tags = ['Entries']
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
  // #swagger.tags = ['Entries']
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
  // #swagger.tags = ['Entries']
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
  // #swagger.tags = ['Entries']
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
