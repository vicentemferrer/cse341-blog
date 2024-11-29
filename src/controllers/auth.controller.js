function confirmLogin(req, res) {
  const { user } = req.session;

  return res.send(user !== undefined ? `Logged in as ${user.displayName}` : 'Logged out');
}

async function authUser(req, res) {
  req.session.user = req.user;

  return res.redirect('/');
}

function onLogin(req, res) {
  return;
}

function onLogout(req, res, next) {
  req.logout((err) => (err ? next(err) : res.redirect('/')));
}

export { confirmLogin, authUser, onLogin, onLogout };
