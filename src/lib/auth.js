import jwt from 'jsonwebtoken';
import User from './models/User';
import dbConnect from './dbConnect';

export const verifyAdmin = async (req) => {
    try {
        const authHeader = req.headers.get('authorization');
        
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return { authenticated: false, status: 401, message: 'Not authorized, no token' };
        }

        const token = authHeader.split(' ')[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Mock Admin Support (from legacy backend)
        if (decoded.id === 'mock_admin_id') {
            return { authenticated: true, user: { _id: 'mock_admin_id', role: 'admin' } };
        }

        await dbConnect();
        const user = await User.findById(decoded.id).select('-password');

        if (!user || user.role !== 'admin') {
            return { authenticated: false, status: 403, message: 'Not authorized as admin' };
        }

        return { authenticated: true, user };
    } catch (error) {
        console.error('Auth Verification Error:', error.message);
        return { authenticated: false, status: 401, message: 'Not authorized, token failed' };
    }
};
