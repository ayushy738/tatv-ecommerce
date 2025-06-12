import jwt from 'jsonwebtoken';

const adminAuth = async (req, res, next) => {
    try {
        const {token} = req.headers;
        if (!token) {
            return res.status(401).json({message: 'No token, authorization denied', success: false});
        }
        const token_decode = jwt.verify(token, process.env.JWT_SECRET);
        if (!token_decode || !token_decode !== process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD) {
            return res.status(403).json({message: 'Access denied, admin only', success: false});
        }
        next();
    } catch (error) {
        console.error(error);
        return res.status(401).json({message: 'Token is not valid', success: false});
    }
}
export default adminAuth;