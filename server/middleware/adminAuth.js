import jwt from 'jsonwebtoken';

const adminAuth = async (req, res, next) => {
    try {
        // Get token from Authorization header
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ message: 'No token, authorization denied', success: false });
        }
        const token = authHeader.split(' ')[1];

        const token_decode = jwt.verify(token, process.env.JWT_SECRET);
        console.log('Decoded email:', token_decode.email);
        console.log('ADMIN_EMAIL:', process.env.ADMIN_EMAIL);
        if (!token_decode || token_decode.email !== process.env.ADMIN_EMAIL) {
            return res.status(403).json({ message: 'Access denied, admin only', success: false });
        }
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Invalid token', success: false });
    }
}

export default adminAuth;