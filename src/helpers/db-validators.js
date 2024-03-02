import User from '../client/user.model.js';
import Publication from '../publication/publication.model.js'

export const existenteEmail = async (email = '') => {
    const existeEmail = await User.findOne({ email });

    if (existeEmail) {
        throw new Error(`The email ${email} has already been registered`);
    }
}

export const existeUserById = async (id = '') => {
    const existeUser = await User.findById(id);

    if (!existeUser) {
        throw new Error(`The ID : ${id} Does not exist`);
    }
}

export const existePublicationById = async (id = '') => {
    const existePublication = await Publication.findById(id);

    if(!existePublication) {
        throw new Error(`The id : ${id} Does not exist`)
    }
}