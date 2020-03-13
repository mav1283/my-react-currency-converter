import React, { useEffect, useState } from 'react';
import CurrencySelector from './CurrencySelector';

const base_url = 'https://api.exchangeratesapi.io/latest';
//const country_flag_url = 'https://www.countryflags.io/PH/flat/64.png'

function InputArea() {
  const [currencyRates, setCurrencyRates] = useState([]);
  const [fromCurrency, setFromCurrency] = useState();
  const [toCurrency, setToCurrency] = useState();
  const [exchangeRate, setExchangeRate] = useState();
  const [amount, setAmount] = useState(1);
  const [isAmountInsideFromCurrency, setAmountInsideFromCurrency] = useState(
    true
  );

  let fromAmount, toAmount;
  if (isAmountInsideFromCurrency) {
    fromAmount = amount;
    toAmount = amount * exchangeRate || 0;
  } else {
    toAmount = amount;
    fromAmount = amount / exchangeRate || 0;
  }

  const handleFromAmount = e => {
    setAmount(e.target.value);
    setAmountInsideFromCurrency(true);
  };

  const handleToAmount = e => {
    setAmount(e.target.value);
    setAmountInsideFromCurrency(false);
  };

  /* Load initial fetch base data */
  useEffect(() => {
    const getInitialCurrencyData = async () => {
      let response = await fetch(base_url);
      let data = await response.json();
      /* Select the first currency */
      const first_currency = Object.keys(data.rates)[0];
      setCurrencyRates([data.base, ...Object.keys(data.rates)]);
      /* Set both from and to currencies */
      setFromCurrency(data.base);
      setToCurrency(first_currency);
      setExchangeRate(data.rates[first_currency]);
    };

    getInitialCurrencyData();
  }, []);

  /* Load changed base data on currency change*/
  useEffect(() => {
    const getChangedCurrencyData = async () => {
      let response = await fetch(
        `${base_url}?base=${fromCurrency}&symbols=${toCurrency}`
      );
      let data = await response.json();
      setExchangeRate(data.rates[toCurrency]);
    };
    if (fromCurrency && toCurrency) {
      getChangedCurrencyData();
    }

    //console.log(fromCurrency, toCurrency);
  }, [fromCurrency, toCurrency]);

  return (
    <div className='App-body'>
      <CurrencySelector
        currencyRates={currencyRates}
        selectedCurrency={fromCurrency}
        setCurrency={e => setFromCurrency(e.target.value)}
        amount={fromAmount}
        handleChangeAmount={handleFromAmount}
      />
      <CurrencySelector
        currencyRates={currencyRates}
        selectedCurrency={toCurrency}
        setCurrency={e => setToCurrency(e.target.value)}
        amount={toAmount}
        handleChangeAmount={handleToAmount}
      />
    </div>
  );
}

export default InputArea;
