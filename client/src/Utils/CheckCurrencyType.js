import {
  CURRENCY_TYPE_NGN,
  CURRENCY_TYPE_USD,
  CURRENCY_TYPE_EUROS,
} from './Constants';

export const checkCurrencyType = (currency) => {
  if (currency === CURRENCY_TYPE_USD) {
    return 'US dollars';
  }

  if (currency === CURRENCY_TYPE_EUROS) {
    return 'Euros';
  }

  return currency === CURRENCY_TYPE_NGN ? 'Naira' : null;
};
