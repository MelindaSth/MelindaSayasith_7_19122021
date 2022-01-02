const express = require('express');
const createError = require('http-errors');
const morgan = require('morgan');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();

const postRoutes = require('./routes/post.routes');
const userRoutes = require('./routes/user.routes');
const auth = require('./middleware/auth');

app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan('dev'));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://192.168.1.15:8080');
  res.setHeader('Access-Control-Allow-Credentials', true)
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

app.use('/api', postRoutes);
app.use('/api', userRoutes);
app.use('/auth', auth, userRoutes);

app.use((req, res, next) => {
  next(createError.NotFound());
});

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.send({
    status: err.status || 500,
    message: err.message,
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`@ http://localhost:${PORT}`));
