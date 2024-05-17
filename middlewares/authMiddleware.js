import jwt from 'jsonwebtoken';
export const verifyToken = (req, res, next) => {
    const token = req.headers.authorization;
    if (!token) return res.status(401).json({ msg: 'No token provided' });

    jwt.verify(token.split(' ')[1], 'Secret_key', (err, decoded) => {
        if (err) {
            console.error('Error verifying token', err);
            return res.status(403).json({ msg: 'Failed to authenticate token' });
        }
        req.user = decoded;
        next();
    });
};
