var jwt = require('jsonwebtoken');
var config = require('./config.js');

module.exports = function(req, res, next) {
    /*
     * Check if authorization header is set
     */
    if( req.hasOwnProperty('headers') && req.headers.hasOwnProperty('authorization') ) {
        try {
            /*
             * Try to decode & verify the JWT token
             * The token contains user's id ( it can contain more informations )
             * and this is saved in req.user object
             */
            let token = req.headers['authorization']; // Express headers are auto converted to lowercase
            if (token.startsWith('Bearer ')) {
              // Remove Bearer from string
              token = token.slice(7, token.length);
            }
            req.user = jwt.verify(token, config.JWT_SECRET);
        } catch(err) {
            /*
             * If the authorization header is corrupted, it throws exception
             * So return 401 status code with JSON error message
             */
            return res.status(401).json({
                error: {
                    msg: 'Failed to authenticate token!',
                    name: err.name,
                    message: err.message
                }
            });
        }
    } else {
        /*
         * If there is no autorization header, return 401 status code with JSON
         * error message
         */
        return res.status(401).json({
            error: {
                msg: 'No token!'
            }
        });
    }
    next();
    return;
};