const rootSubscription = `
	type Subscription {
    userAdded: Message
    newPrice(currencies: [String]!): [Currency!]!
  }
`;

export default rootSubscription;
