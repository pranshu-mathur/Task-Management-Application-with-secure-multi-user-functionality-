 const jwt = require('jsonwebtoken');
 const User = require('../models/User');


const auth = async (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '');
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

        const user = await User.findById(decoded._id);

        if (!user) {
            throw new Error('Unable to login, invalid credentials');
        }

        req.user = user; 
        req.token = token;
        next();

    } catch (error) {
        res.status(401).send({ error: error.message });
    }
}


module.exports = auth;