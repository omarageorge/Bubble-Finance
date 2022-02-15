import axios from 'axios';

export const getExchangeRate = async (base_currency, target_currency) => {
  try {
    const { data } = await axios.get(
      `https://api.exchangerate-api.com/v4/latest/${base_currency}`
    );
    return data.rates[target_currency];
  } catch (err) {}
};
