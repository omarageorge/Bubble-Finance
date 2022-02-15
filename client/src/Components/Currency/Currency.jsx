import styled from 'styled-components';

import {
  CURRENCY_TYPE_NGN,
  CURRENCY_TYPE_USD,
  CURRENCY_TYPE_EUROS,
} from '../../Utils/Constants';

const CircularImage = styled.img`
  width: 40px;
  height: 40px;
  display: block;
  object-fit: cover;
  border: 0px solid #cac1c1;
  border-radius: 50%;
  background-color: #cac1c1;

  @media only screen and (max-width: 568px) {
    width: 30px;
    height: 30px;
  }
`;

const Currency = ({ type }) => {
  if (type === CURRENCY_TYPE_USD) {
    return <CircularImage src='/usd.png' />;
  } else if (type === CURRENCY_TYPE_EUROS) {
    return <CircularImage src='/euro.png' />;
  } else if (type == CURRENCY_TYPE_NGN) {
    return <CircularImage src='/ngn.png' />;
  }
};

export default Currency;
