const userModel = require('../models/userModel');

const resolvers = {
    Query: {
        getUsers: () => userModel.getAll(),
        getUser: (_, { id }) => userModel.getById(id)
    },
    Mutation: {
        createUser: (_, { name, email }) => userModel.create(name, email),
        updateUser: (_, { id, name, email }) => userModel.update(id, name, email),
        deleteUser: (_, { id }) => userModel.remove(id)
    }
}

module.exports = resolvers;