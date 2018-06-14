import fetch  from 'node-fetch';

import pairs from '../../data/pairs';

const fetchData = function(exchange, url) {
  return fetch(url)
  .then(res => {
    return res.json();
  })
  .catch(err => {
    console.error(`Error: failed to fetch from ${exchange} (${url})`);
  })
};

export default {
  pairs: () => pairs,
  market: () => {
    const urls = {
      Bitfinex: `https://api.bitfinex.com/v2/tickers?symbols=t${pairs.join(',t')}`, // Bitfinex
      Binance: `https://api.binance.com/api/v1/ticker/24hr` // Binance
      // Binance: 'https://wefjiw.com'
    };
    const exchanges = Object.keys(urls);

    return Promise.all(exchanges.map(exchange => fetchData(exchange, urls[exchange])))
      .then(json => {
        const result = [];

        exchanges.forEach((exchange, index) => {
          const tickers = json[index];

          if (!tickers) return;

          if (exchange === 'Bitfinex') {
            tickers.map(ticker => {
              let symbol = ticker[0];
              symbol = symbol.substring(1); // E.g., 'tBTCUSD' --> 'BTCUSD'

              const index = result.findIndex(element => element.symbol === symbol);
              const exchangeData = {
                exchange: 'Bitfinex',
                price: ticker[7],
                vol: ticker[8],
                pct: ticker[6],
              };

              if (index === -1) {
                result.push({
                  symbol,
                  exchanges: [exchangeData],
                });
              } else {
                result[index].exchanges.push(exchangeData);
              }

            })
          } else if (exchange === 'Binance') {

            pairs.map(pair => {
              const ticker = tickers.find(element => element.symbol === pair);

              if (ticker) {
                const index = result.findIndex(element => element.symbol === pair);
                const exchangeData = {
                  exchange: 'Binance',
                  price: ticker.lastPrice,
                  vol: ticker.volume,
                  pct: ticker.priceChangePercent,
                };

                if (index === -1) {
                  result.push({
                    symbol: pair,
                    exchanges: [exchangeData],
                  });
                } else {
                  result[index].exchanges.push(exchangeData);
                }
              }
            });
          }
        });

        return result;
      });
  }
}
