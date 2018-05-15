const { currency, data } = _data;
  const { exchange } = data;

  const currencyIndex = result.findIndex((_currency) => {
    return _currency.currency === currency;
  });

  if (currencyIndex === -1) {
    result.push({
      currency,
      exchanges: [data]
    });
  } else {
    const exchangeIndex = result[currencyIndex].exchanges.findIndex((_exchange) => {
      return _exchange.exchange === exchange;
    });

    if (exchangeIndex === -1) {
      result[currencyIndex].exchanges.push(data);
    } else {
      const exchangeData = result[currencyIndex].exchanges[exchangeIndex];

      exchangeData.pct = data.pct;
      exchangeData.price = data.price;
      exchangeData.vol = data.vol;
    }
  }
