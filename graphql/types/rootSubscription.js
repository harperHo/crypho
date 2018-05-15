const rootSubscription = `
	type Subscription {
    userAdded: Message
    updateTicker: UpdatedTicker!
  }
`;

// const rootSubscription = `
//   type Subscription {
//     userAdded: Message
//     updateTicker(currencies: [String]!): [Currency!]!
//   }
// `;

export default rootSubscription;
