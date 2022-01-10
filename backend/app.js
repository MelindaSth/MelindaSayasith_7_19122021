const express = require('express');
const morgan = require('morgan'); // Enregristrement des requêtes pour node.js
const cors = require('cors'); // Gestion des autorisations 
const xss = require('xss-clean'); // Protection contre les attaques xss
require('dotenv').config();

const path = require('path'); // Création des chemins d'accès au directory
const helmet = require('helmet'); // Sécurise les entêtes HTTP

const app = express();

// Importation des routes
const postRoutes = require('./routes/post.routes');
const commentRoutes = require('./routes/comment.routes');
const userRoutes = require('./routes/user.routes');

app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use(cors());
app.use(xss());
app.use(helmet.frameguard({ action: "sameorigin" }));
app.use('/images/', express.static(path.join(__dirname, 'images'))); // Pour toute requête envoyée à /images/, on sert ce dossier statique image //

app.use('/api', postRoutes);
app.use('/api', commentRoutes)
app.use('/api', userRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`@ http://localhost:${PORT}`));
