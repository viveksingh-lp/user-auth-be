const expressJwt = require('express-jwt');
const config = require('config.json');
const userService = require('../services/user-service');

function jwt() {
  const secret = config.secret;
  return expressJwt({ secret, isRevoked }).unless({
    path: [
      '/users/authenticate',
      '/users/register'
    ]
  });
}

async function isRevoked(req, payload, done) {
  const user = await userService.getById(payload.sub);

  // revoke if user is no longer exists
  if (!user) {
    return done(null, true);
  }
  done();
}

module.exports = jwt;