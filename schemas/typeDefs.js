const { gql } = require("apollo-server");

const typeDefs = gql`
    """Representa un usuario dentro del sistema"""
    type User {
        """Identificador único del usuario"""
        id: ID!
        name: String!
        email: String!
    }
    
    """Queries para hacer consultas"""
    type Query {
        """Devuelve todo los usuarios del sistema"""
        getUsers: [User]
        getUser(id: ID!): User
    }

    type Mutation {
        createUser(name: String!, email: String!): User
        updateUser(id: ID!, name: String!, email: String!): User
        deleteUser(id: ID!): User
    }
`;

module.exports = typeDefs;