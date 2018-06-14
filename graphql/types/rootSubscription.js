const rootSubscription = `
	type Subscription {
    updateTicker: Ticker!
  }
`;

// const rootSubscription = `
//   type Subscription {
//     updateTicker(currencies: [String]!): [Currency!]!
//   }
// `;

export default rootSubscription;
