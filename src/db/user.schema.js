import { model, Schema } from 'mongoose';

const UserSchema = new Schema({
  username: String,
  firstName: String,
  lastName: String,
  email: String,
  birthday: Date
});

export default model('Users', UserSchema);
