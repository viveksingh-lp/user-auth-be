const config = require('config.json');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../helpers/db');

const User = db.User;

async function getAll() {
  return await User.find().select('-hash');
}

async function getById(id) {
  return await User.findById(id).select('-hash');
}

async function create(userParam) {
  // validate user
  if (await User.findOne({ username: userParam.username })) {
    throw `Username ${userParam.username} is already taken.`;
  }

  const user = new User(userParam);

  // hash password
  if (userParam.password) {
    user.hash = bcrypt.hashSync(userParam.password, 10);
  }

  // save user
  await user.save();
}

async function update(id, userParam) {
  const user = User.findById(id);

  if (!user) {
    throw 'User not found';
  }
  if (user.username !== userParam.username && await User.findOne({ username: userParam.username })) {
    throw `Username ${userParam.username} is already taken.`;
  }

  // hash password if it was entered
  if (userParam.password) {
    userParam.hash = bcrypt.hashSync(userParam.password, 10);
  }

  // copy userParam properties to user
  Object.assign(user, userParam);

  await user.save();
}

async function _delete(id) {
  await User.findByIdAndRemove(id);
}

async function authenticate({ username, password }) {
  const user = await User.findOne({ username });
  if (user && bcrypt.compareSync(password, user.hash)) {
    const { hash, ...userWithoutHash } = user.toObject();
    const token = jwt.sign({ sub: user.id }, config.secret);
    return {
      ...userWithoutHash,
      token
    };
  }
}

module.exports = {
  getAll,
  getById,
  create,
  update,
  delete: _delete,
  authenticate
}