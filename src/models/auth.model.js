import Auth from '#db/auth.schema.js';

async function findOrCreate(accessToken, refreshToken, profile, done) {
  try {
    const user = await Auth.findOne({ oauthID: profile.id });

    if (!user) {
      const { id, displayName, username } = profile;
      const newUser = await new Auth({
        oauthID: id,
        displayName,
        username,
        accessToken,
        refreshToken
      }).save();

      done(null, { id: newUser.oauthID, displayName: newUser.displayName });
    } else {
      user.accessToken = accessToken;
      user.refreshToken = refreshToken;

      await user.save().then((user) => {
        done(null, { id: user.oauthID, displayName: user.displayName });
      });
    }
  } catch (err) {
    done(err);
  }
}

async function findUser(user, done) {
  try {
    const result = await Auth.findOne({ oauthID: user.id });

    done(null, result);
  } catch (err) {
    done(err);
  }
}

export { findOrCreate, findUser };
