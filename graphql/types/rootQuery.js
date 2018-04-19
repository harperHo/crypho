const rootQuery = `
	type Query {
    users: [User!]!
    posts: [Post!]!
    user(id: ID!): User
  }
`;

export default rootQuery;
