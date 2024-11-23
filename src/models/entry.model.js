import Entry from '../db/entry.schema.js';
import User from '../db/user.schema.js';

async function listEntries(options = {}) {
  try {
    const result = await Entry.find(options);
    return result;
  } catch (err) {
    console.error(`Fail on listEntries with options: ${options}`);
    throw new Error(err.message || 'Some failed getting entries.');
  }
}

async function createEntry(entry) {
  try {
    const result = await new Entry(entry).save();
    return result;
  } catch (err) {
    console.error(`Fail on createEntry with entry: ${entry}`);
    throw new Error(err.message || 'Some failed creating entry.');
  }
}

async function readEntry(id) {
  try {
    const result = await Entry.findById(id);
    return result;
  } catch (err) {
    console.error(`Fail on readEntry with id: ${id}`);
    throw new Error(err.message || 'Some failed getting entry.');
  }
}

async function updateEntry(id, entry) {
  try {
    const result = await Entry.findByIdAndUpdate(id, entry, { new: true });
    return result;
  } catch (err) {
    console.error(`Fail on updateEntry with id: ${id}`);
    throw new Error(err.message || 'Some failed updating entry.');
  }
}

async function deleteEntry(id) {
  try {
    const result = await Entry.findByIdAndDelete(id).then(() => ({
      message: 'Entry successfully deleted'
    }));
    return result;
  } catch (err) {
    console.error(`Fail on deleteEntry with id: ${id}`);
    throw new Error(err.message || 'Some failed deleting entry.');
  }
}

async function checkExistingId(id) {
  const user = await User.findById(id);
  return user !== null;
}

export { listEntries, createEntry, readEntry, updateEntry, deleteEntry, checkExistingId };
