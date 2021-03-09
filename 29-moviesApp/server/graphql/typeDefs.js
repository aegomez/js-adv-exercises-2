const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    email: String
    password: String
    userId: ID
    username: String
    watchlistId: ID
  }

  type SignInPayload {}

  type Query {
    signUp: Boolean
    signIn: 
    signOut: Boolean
  }
`;

module.exports = typeDefs;
