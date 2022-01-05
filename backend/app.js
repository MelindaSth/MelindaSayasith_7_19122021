const express = require('express');
const bodyParser = require('body-parser');
const createError = require('http-errors');
const morgan = require('morgan');
const cors = require('cors');
require('dotenv').config();

const path = require('path');
const helmet = require('helmet');

const app = express();

const postRoutes = require('./routes/post.routes');
const commentRoutes = require('./routes/comment.routes');
const userRoutes = require('./routes/user.routes');

app.use(express.json());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Credentials', true)
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan('dev'));

app.use(cors());

app.use(helmet());
app.use('/images', express.static(path.join(__dirname, 'images'))); // Pour toute requête envoyée à /images/, on sert ce dossier statique image //

app.use('/api', postRoutes);
app.use('/api', commentRoutes)
app.use('/api', userRoutes);
app.use('/api/auth', userRoutes);

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
