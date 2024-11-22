import User from '#db/user.schema.js';

async function listUsers(options = {}) {
  try {
    const result = await User.find(options);
    return result;
  } catch (err) {
    console.log(err.message);
  }
}

async function createUser(user) {
  try {
    const result = await new User(user).save();
    return result;
  } catch (err) {
    console.log(err.message);
  }
}

async function readUser(id) {
  try {
    const result = await User.findById(id);
    return result;
  } catch (err) {
    console.log(err.message);
  }
}

async function updateUser(id, user) {
  try {
    const result = await User.findOneAndUpdate({ _id: id }, user, { new: true });
    return result;
  } catch (err) {
    console.log(err.message);
  }
}

async function deleteUser(id) {
  try {
    const result = await User.findOneAndDelete({ _id: id }).then(() => ({
      message: 'User successfully deleted'
    }));
    return result;
  } catch (err) {
    console.log(err.message);
  }
}

export { listUsers, createUser, readUser, updateUser, deleteUser };
