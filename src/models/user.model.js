import User from '#db/user.schema.js';

async function listUsers(options = {}) {
  try {
    const result = await User.find(options);
    return result;
  } catch (err) {
    console.error(`Fail on listUsers with options: ${options}`);
    throw new Error(err.message || 'Some failed getting users.');
  }
}

async function createUser(user) {
  try {
    const result = await new User(user).save();
    return result;
  } catch (err) {
    console.error(`Fail on createUser with user: ${user}`);
    throw new Error(err.message || 'Some failed creating user.');
  }
}

async function readUser(id) {
  try {
    const result = await User.findById(id);
    return result;
  } catch (err) {
    console.error(`Fail on readUser with id: ${id}`);
    throw new Error(err.message || 'Some failed getting user.');
  }
}

async function updateUser(id, user) {
  try {
    const result = await User.findByIdAndUpdate(id, user, { new: true });
    return result;
  } catch (err) {
    console.error(`Fail on updateUser with id: ${id}`);
    throw new Error(err.message || 'Some failed updating user.');
  }
}

async function deleteUser(id) {
  try {
    const result = await User.findByIdAndDelete(id).then(() => ({
      message: 'User successfully deleted'
    }));
    return result;
  } catch (err) {
    console.error(`Fail on deleteUser with id: ${id}`);
    throw new Error(err.message || 'Some failed deleting user.');
  }
}

async function checkExistingId(id) {
  const user = await User.findById(id);
  return user !== null;
}

export { listUsers, createUser, readUser, updateUser, deleteUser, checkExistingId };
