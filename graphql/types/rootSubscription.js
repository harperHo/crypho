const rootSubscription = `
	type Subscription {
    userAdded: Message
    newPrice: [Currency!]!
  }
`;

export default rootSubscription;
