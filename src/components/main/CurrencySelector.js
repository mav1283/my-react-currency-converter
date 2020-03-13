import React, { useEffect, useState } from 'react';

function CurrencySelector({
  currencyRates,
  selectedCurrency,
  setCurrency,
  amount,
  handleChangeAmount
}) {
  const country_flag_url = 'https://www.countryflags.io/'; //PH/flat/64.png'
  const [countryFlag, setCountryFlag] = useState();

  useEffect(() => {
    let country_code;
    let country;
    if (selectedCurrency) {
      country_code = selectedCurrency.toString();
      country = country_code.slice(0, country_code.length - 1);
      setCountryFlag(`${country_flag_url}${country}/flat/32.png`);
    }
  }, [selectedCurrency]);

  return (
    <div className='currency-selector'>
      <input
        type='number'
        className='input-type'
        value={amount}
        onChange={handleChangeAmount}
      />
      <select
        className='input-type custom-select'
        value={selectedCurrency}
        onChange={setCurrency}
      >
        {currencyRates.map(option => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      <img src={countryFlag} alt={countryFlag} className='flag' />
    </div>
  );
}

export default CurrencySelector;
