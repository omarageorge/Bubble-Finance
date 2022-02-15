import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import { Context } from '../../Context/Context';
import Layout from '../../Components/Layout/Layout';
import Wrapper from '../../Components/Wrapper/Wrapper';
import { Heading } from '../../Components/Text/Text';
import { Form, FormGroup, ErrorMessage } from '../../Components/Form/Form';
import { Input } from '../../Components/Input/Input';
import Button from '../../Components/Button/Button';

import style from './Deposit.module.scss';
import axios from 'axios';

const DepositScreen = () => {
  const { user } = useContext(Context);
  const [error, setError] = useState(false);
  const [amount, setAmount] = useState('');
  let navigate = useNavigate();

  const { access_token } = user;

  const config = {
    headers: { Authorization: `Bearer ${access_token}` },
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (amount < 10) {
      setError(true);
    } else {
      setError(false);

      try {
        await axios.post(
          'https://bubble.qenvie.com/api/v1/users/deposit',
          {
            user: user.id,
            amount: amount,
          },
          config
        );
        navigate('/');
      } catch (err) {}
    }
  };

  return (
    <Layout>
      <Wrapper id={style.wrapper}>
        <main id={style.main}>
          <Heading center>Deposit money to your account</Heading>

          <Form onSubmit={handleSubmit}>
            {error && (
              <FormGroup>
                <ErrorMessage>Minimum deposit is $10.</ErrorMessage>
              </FormGroup>
            )}
            <FormGroup>
              <Input
                type='number'
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder='Deposit amount'
                autocomplete='off'
              />
            </FormGroup>

            <FormGroup>
              <Button type='submit'>Deposit</Button>
            </FormGroup>
          </Form>
        </main>
      </Wrapper>
    </Layout>
  );
};

export default DepositScreen;
