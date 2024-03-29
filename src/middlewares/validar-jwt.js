import jwt from 'jsonwebtoken';
import User from '../client/user.model.js';

export const validarJWT = async (req, res, next) => {
    const token = req.header("x-token");

    if (!token) {
        return res.status(401).json({
            msg: "There is no token in the request"
        });
    }

    try {
        const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);

        const user = await User.findById(uid);

        if (!user) {
            return res.status(401).json({
                msg: 'User does not exist in the database'
            });
        }

        if (!user.state) {
            return res.status(401).json({
                msg: 'Invalid token - user with status: false'
            });
        }

       
        if (user.role !== 'ROLE_ADMIN') {
            return res.status(403).json({
                msg: 'Access forbidden. Only admin users allowed.'
            });
        }

        
        req.user = user;

        next();
    } catch (e) {
        console.log(e);
        res.status(401).json({
            msg: "Invalid token"
        });
    }
}

export default validarJWT;
