const jwt = require('jsonwebtoken');

const verifyJWT = async (req, res, next) => {

    const token = req.body.token || req.query.token || req.headers['authorization']

    if (!token) {
        return res.status(403).send({ success: false, message: 'No token provided' })
    }

    try {

        const bearerToken = (token.split(' '))[1];

        const decodedToken = jwt.verify(bearerToken, process.env.ACCESS_TOKEN_SECRET);

        req.user = decodedToken.user;


    } catch (error) {
        return res.status(400).json({
            success: false,
            msg: 'Invalid token'
        })
    }
    return next();
}

module.exports = verifyJWT;