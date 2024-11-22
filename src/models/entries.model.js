import Entry from '#db/entry.schema.js';

async function listEntries(options = {}) {
  try {
    const result = await Entry.find(options);
    return result;
  } catch (err) {
    console.log(err.message);
  }
}

async function createEntry(entry) {
  try {
    const result = await new Entry(entry).save();
    return result;
  } catch (err) {
    console.log(err.message);
  }
}

async function readEntry(id) {
  try {
    const result = await Entry.findById(id);
    return result;
  } catch (err) {
    console.log(err.message);
  }
}

async function updateEntry(id, entry) {
  try {
    const result = await Entry.findOneAndUpdate({ _id: id }, entry, { new: true });
    return result;
  } catch (err) {
    console.log(err.message);
  }
}

async function deleteEntry(id) {
  try {
    const result = await Entry.findOneAndDelete({ _id: id }).then(() => ({
      message: 'Entry successfully deleted'
    }));
    return result;
  } catch (err) {
    console.log(err.message);
  }
}

export { listEntries, createEntry, readEntry, updateEntry, deleteEntry };
