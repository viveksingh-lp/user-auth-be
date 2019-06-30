const config = require('config.json');
const mongoose = require('mongoose');
mongoose.connect(config.connectionString, { useCreateIndex: true, useNewUrlParser: true }).then(() => {
  console.log('Connected to MongoDB');
}).catch((err) => {
  console.log(err);
});

module.exports = {
  User: require('../models/User')
}