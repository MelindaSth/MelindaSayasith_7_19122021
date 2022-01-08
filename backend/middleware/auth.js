const jwt = require('jsonwebtoken'); // On a besoin du package jwt //


// work in progress

module.exports = (req, res, next) => { // On exporte un middleware //
    try {
        // console.log(req.headers)
        const token = req.headers.authorization.split(' ')[1]; // Récupération du token dans le header dans un tableau split et on retourne le 2ème élément //
        const decodedToken = jwt.verify(token, process.env.AUTH_KEY); // On décode le token, la clé doit correspondre à celle de la fontion login //
        const userId = decodedToken.userId; // On récupére l'userId //
        if (req.body.userId && req.body.userId !== userId) {
            throw 'Invalid user ID';
          } else {
            next();
          }
        } catch {
          res.status(401).json({
            error: new Error('Invalid request!')
          });
        }
};

