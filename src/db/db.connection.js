import { connect } from 'mongoose';

export function initDB(callback) {
  const { MONGODB_URI } = process.env;
  try {
    connect(MONGODB_URI);

    callback(null);
  } catch (err) {
    callback(err);
  }
}
