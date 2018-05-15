import fetch  from 'node-fetch';

import currencies from '../../data/currencies';

export default {
  currencies: () => {
    return currencies;
  },
  tickers: () => {
    const urls = {
      Bitfinex: `https://api.bitfinex.com/v2/tickers?symbols=t${currencies.map(currency => `${currency}USD`).join(',t')}`, // Bitfinex
      Binance: `https://api.binance.com/api/v1/ticker/24hr` // Binance
    };
    const exchangesList = Object.keys(urls);

    // console.log(urls);

    return Promise.all(exchangesList.map(exchange => fetch(urls[exchange])))
      .then(responses => Promise.all(responses.map(res => res.json())))
      .then(json => {
        return currencies.map(currency => {
          const exchanges = [];

          exchangesList.forEach((exchange, index) => {
            const exchangeData = json[index];

            if (exchange === 'Bitfinex') {
              const indexOfTicker = exchangeData.findIndex(element => element[0] === `t${currency.toUpperCase()}USD`)
              const ticker = exchangeData[indexOfTicker];

              exchanges.push({
                exchange: 'Bitfinex',
                price: ticker[7],
                vol: ticker[8],
                pct: ticker[6],
              });

            } else if (exchange === 'Binance') {
              const ticker = exchangeData.find(element => element.symbol === `${currency}USDT`);
              console.log(exchangeData);

              if (ticker) {
                exchanges.push({
                  exchange: 'Binance',
                  price: ticker.lastPrice,
                  vol: ticker.volume,
                  pct: ticker.priceChangePercent,
                });
              }
            }
          });

          return {
            currency,
            exchanges,
          };
        });
      });
  }
};
