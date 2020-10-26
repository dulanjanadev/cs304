const jwt = require('jsonwebtoken');

function auth(req, res, next) {

    // taking the token
    const token = req.header('x-auth-token');
    
    // if there is no token at all. Helps client to figure out why they cannot access this resource.
    if (!token) res.status(401).send('Access denied. No token provided.');

    // otherwise validate the token whether it is a valid token. for this use json web token(jwt)
    jwt.verify(token, )
};