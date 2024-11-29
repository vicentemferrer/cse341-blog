import { Strategy as GitHubStrategy } from 'passport-github2';
import { findOrCreate } from '#models/auth.model.js';

const { GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET, GITHUB_CALLBACK_URL } = process.env;

const strategy = new GitHubStrategy(
  {
    clientID: GITHUB_CLIENT_ID,
    clientSecret: GITHUB_CLIENT_SECRET,
    callbackURL: GITHUB_CALLBACK_URL
  },
  findOrCreate
);

function isAuthenticated(req, res, next) {
  if (req.session.user === undefined) {
    return res.status(401).setHeader('Content-Type', 'application/json').json('Forbidden Access');
  }

  next();
}

export { strategy, isAuthenticated };
