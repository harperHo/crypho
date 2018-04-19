const mutation = `
	type Mutation {
    addUser(name: String!): User
    renameUser(id: ID!, name: String!): User
    deleteUser(id: ID!): RemoveUserPayload
  }
`;

export default mutation;
