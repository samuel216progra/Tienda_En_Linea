import { response, request } from "express";
import bcryptjs from 'bcryptjs';
import User from './user.model.js';

export const getUsers = async (req = request, res = response) => {

}

export const createUser = async (req, res) => {
    const { name, userName, lastName, email, password, role } = req.body; // Extract role from request

    try {
        const user = new User({ name, userName, lastName, email, password, role }); // Include role when creating new user

        const salt = bcryptjs.genSaltSync();
        user.password = bcryptjs.hashSync(password, salt);

        await user.save();

        res.status(200).json({
            user
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            msg: "Error in the server"
        });
    }
}

export const updateUser = async (req, res = response) => {
    const { id } = req.params;
    const { _id, password: newPassword, oldPassword, role, ...rest } = req.body; // Extract role from request

    try {
        const user = await User.findById(id);

        if (!user) {
            return res.status(404).json({
                msg: "User not found"
            });
        }

        if (oldPassword && newPassword) {
            const validPassword = bcryptjs.compareSync(oldPassword, user.password)
            if (!validPassword) {
                return res.status(400).json({
                    msg: "The old password is incorrect"
                });
            }
        }

        if (newPassword) {
            const salt = bcryptjs.genSaltSync();
            rest.password = bcryptjs.hashSync(newPassword, salt);
        }

        if (role) {
            rest.role = role; 
        }

        await User.findByIdAndUpdate(id, rest);

        const updatedUser = await User.findOne({ _id: id });

        res.status(200).json({
            msg: 'Update User',
            user: updatedUser
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            msg: "Error in the server"
        });
    }
}