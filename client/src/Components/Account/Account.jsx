import styled from 'styled-components';

import Currency from '../Currency/Currency';

import { checkCurrencyType } from '../../Utils/CheckCurrencyType';

import style from './Account.module.scss';

export const Accounts = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  column-gap: 1rem;
  margin: auto;
  margin-top: 1rem;

  @media only screen and (min-width: 768px) {
    width: 80%;
  }
`;

export const Account = ({ type, balance }) => {
  const currencyType = checkCurrencyType(type);
  const accountBalance = Number(balance);

  if (currencyType) {
    return (
      <div id={style.wrapper}>
        <Currency type={type} />
        <span id={style.balance}>{accountBalance.toLocaleString('en')}</span>
        <span id={style.label}>{checkCurrencyType(type)}</span>
      </div>
    );
  } else {
    return <></>;
  }
};
