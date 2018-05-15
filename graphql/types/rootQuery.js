const rootQuery = `
	type Query {
    currencies: [String]!
    tickers: [Currency!]
    users: [User!]!
    posts: [Post!]!
    user(id: ID!): User
  }
`;

export default rootQuery;
