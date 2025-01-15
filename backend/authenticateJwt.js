

const jwt = require('jsonwebtoken');

const authenticateJWT = (req, res, next) => {

    const token = req.header('Authorization')?.split(' ')[1]; // 'Bearer {token}'

    if (token) {
        jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
            
            if (err) {
                return res.sendStatus(403); 
            }

            console.log(user,"user")
            req.user = user; 
            next();
        });
    } else {
        res.sendStatus(401); 
    }
};

module.exports = authenticateJWT;
