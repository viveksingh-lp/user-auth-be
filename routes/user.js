const express = require('express');
const router = express.Router();
const userService = require('../services/user-service');

router.get('/', getAll);
router.get('/current', getCurrent);
router.get('/:id', getById);
router.post('/authenticate', authenticate);
router.post('/register', register);
router.put('/:id', update);
router.delete('/:id', _delete);

function getAll(req, res, next) {
  userService.getAll()
    .then(users => res.json(users))
    .catch(err => next(err))
}

function getCurrent(req, res, next) {
  userService.findById(req.user.sub)
    .then(user => user ? res.json(user) : res.sendStatus(404))
    .catch(err => next(err))
}

function getById(req, res, next) {
  userService.getById(req.params.id)
    .then(user => user ? res.json(user) : res.sendStatus(404))
    .catch(err => next(err))
}

function update(req, res, next) {
  userService.update(req.params.id, body)
    .then(() => res.json({}))
    .catch(err => next(err));
}

function _delete(req, res, next) {
  userService.delete(req.params.id)
    .then(() => res.json({}))
    .catch(err => next(err));
}

function register(req, res, next) {
  userService.create(req.body)
    .then(() => res.json({}))
    .catch(err => next(err));
}

function authenticate(req, res, next) {
  userService.authenticate(req.body)
    .then(user => user ? res.json(user) : res.status(400).json({ message: 'Username or password is incorrect' }))
    .catch(err => next(err));
}

module.exports = router;