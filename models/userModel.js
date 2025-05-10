// models/publicationModel.js
const { db } = require("../config/database.config.js");

// Definición de la colección "users" en Firebase
const users = db.collection("users");


const getAll = async () => {
    const snapshot = await users.get();
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}

const getById = async (id) => {
    const doc = await users.doc(id).get();
    if (!doc.exists) return null;
    return { id: doc.id, ...doc.data() };
}

const create = async (name, email) => {
    // Expresión regular básica para validar formato de correo
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
        throw new Error("Correo electrónico inválido.");
    }

    const newUser = {
        name: name,
        email
    };

    const docRef = await users.add(newUser);
    return { id: docRef.id, ...newUser };;
};


const update = async (id, name, email) => {

    //const user = users.find(u => u.id == id)
    const userRef = users.doc(id);
    if (!userRef) throw new Error("Usuario no encontrado");

    const updates = {};

    if (email !== undefined) {
        // Expresión regular básica para validar formato de correo
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(email)) {
            throw new Error("Correo electrónico inválido.");
        }
        updates.email = email;
    }
    if (name !== undefined) updates.name = name;

    await userRef.update(updates);
    return { id, ...updates };
}

const remove = async (id) => {
    const docRef = users.doc(id);
    const docSnap = await docRef.get();

    if (docSnap.exists) {
        await docRef.delete();
        return { id: docSnap.id, ...docSnap.data() };
    } else {
        return null;
    }

    // const index = users.findIndex(u => u.id == id)
    // if (index === -1) return null;
    // return users.splice(index, 1)[0];
}

module.exports = { getAll, getById, create, update, remove };