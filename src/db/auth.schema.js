import { model, Schema } from 'mongoose';

const AuthSchema = new Schema({
  oauthID: { type: String, required: true },
  displayName: String,
  username: String,
  accessToken: String,
  refreshToken: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default model('Auths', AuthSchema);
