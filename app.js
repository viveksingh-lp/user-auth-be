require('rootpath')();

const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const jwt = require('./helpers/jwt');
const errorHandler = require('./helpers/error-handler');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

// jwt middleware
app.use(jwt());

// routes
app.use('/users', require('./routes/user'));

// global error handler
app.use(errorHandler);

const port = 3000;
app.listen(port, () => {
  console.log(`Server started at port ${port}`);
});
