const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1]; // Gestion récuppération token dansle Hearders
        const decodedToken = jwt.verify(token, process.env.AUTH_KEY); // JWT vérifie le token
        const userId = decodedToken.userId;
        if (req.body.userId && req.body.userId !== userId) { // Comparaison de la dmd & de l'id
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

