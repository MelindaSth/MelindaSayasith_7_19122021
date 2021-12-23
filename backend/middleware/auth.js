const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, process.env.AUTH_KEY);
        const user = decodedToken.userId;
        // Si userId existe, verifier par rapport au userId dans le token
        if (req.body.user !== user) {
            throw 'User non valable !';
        } else {
            next();
        }
    } catch (error) {
        res.status(401).json({ error: error | 'Requête non authentifiée !' });
    }
};