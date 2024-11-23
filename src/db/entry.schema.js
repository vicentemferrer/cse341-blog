import { model, Schema } from 'mongoose';

const EntrySchema = new Schema({
  title: String,
  content: String,
  comments: [{ type: String }],
  likes: { type: Number, default: 0 },
  userID: String,
  created_at: {
    type: Date,
    default: Date.now
  }
});

export default model('Entries', EntrySchema);
