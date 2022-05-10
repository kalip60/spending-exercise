import React from 'react';

import { FiltersWrapper, Orderings, CurrencyFilters, CurrencyButton } from '../styles/ComponentStyles';

export default function CurrencyFilter({setFilter, setCurrency}) {

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  }

  const handleCurrencyChange = (e) => {
    setCurrency(e.target.value);
  }

  return (
    <>
      <FiltersWrapper>
        <Orderings>
          <select onChange={handleFilterChange}>
            <option value='-date'>Sort by Date descending (default)</option>
            <option value='date'>Sort by Date ascending</option>
            <option value='-amount_in_huf'>Sort by Amount descending</option>
            <option value='amount_in_huf'>Sort by Amount ascending</option>
          </select>
        </Orderings>
        <CurrencyFilters>
          <li>
            <CurrencyButton
              value='ALL'
              onClick={handleCurrencyChange}
            >
              ALL
            </CurrencyButton>
          </li>
          <li>
            <CurrencyButton
              value='HUF'
              onClick={handleCurrencyChange}
            >
              HUF
            </CurrencyButton>
          </li>
          <li>
            <CurrencyButton
              value='USD'
              onClick={handleCurrencyChange}
            >
              USD
            </CurrencyButton>
          </li>
        </CurrencyFilters>
      </FiltersWrapper>
    </>
  );
}
