import { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import Layout from '../../Components/Layout/Layout';
import Wrapper from '../../Components/Wrapper/Wrapper';
import { Heading } from '../../Components/Text/Text';
import { Form, FormGroup, ErrorMessage } from '../../Components/Form/Form';
import { Input, Select } from '../../Components/Input/Input';
import Button from '../../Components/Button/Button';
import { Context } from '../../Context/Context';

import style from './SendScreen.module.scss';
import axios from 'axios';
import { getExchangeRate } from '../../Utils/getExchangeRate';

const SendScreen = () => {
  const navigate = useNavigate();
  const { user } = useContext(Context);
  const [users, setUsers] = useState([]);

  const [receiver, setReceive] = useState('');
  const [account, setAccount] = useState('');
  const [currency, setCurrency] = useState('');
  const [amount, setAmount] = useState('');

  const { access_token } = user;

  const config = {
    headers: { Authorization: `Bearer ${access_token}` },
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      sender: user.id,
      receiver: receiver,
      source_currency: account,
      target_currency: currency,
      exchange_rate: await getExchangeRate(account, currency),
      amount: Number(amount),
    };

    try {
      await axios.post(
        'https://bubble.qenvie.com/api/v1/users/transfer',
        formData,
        config
      );
      navigate('/');
    } catch (err) {}
  };

  useEffect(async () => {
    try {
      const { data } = await axios.get(
        'https://bubble.qenvie.com/api/v1/users',
        config
      );
      setUsers([...data]);
    } catch (err) {}
  }, []);

  return (
    <Layout>
      <Wrapper id={style.wrapper}>
        <main id={style.main}>
          <Heading center>Send money</Heading>

          <Form onSubmit={handleSubmit}>
            {!user && (
              <FormGroup>
                <ErrorMessage>Sorry, You have insufficient funds.</ErrorMessage>
              </FormGroup>
            )}

            <FormGroup>
              <Select
                name='receiver'
                value={receiver}
                onChange={(e) => setReceive(e.target.value)}
              >
                <option value='' disabled>
                  --Choose recipient--
                </option>
                {users.map((usr) => (
                  <option key={usr.id} value={usr.id}>
                    {usr.id === user.id ? 'Me' : usr.name}
                  </option>
                ))}
              </Select>
            </FormGroup>

            <FormGroup>
              <Select
                name='account'
                value={account}
                onChange={(e) => setAccount(e.target.value)}
              >
                <option value='' disabled>
                  --Source account--
                </option>
                <option value='USD'>USD</option>
                <option value='EUR'>EUROS</option>
                <option value='NGN'>NGN</option>
              </Select>
            </FormGroup>

            <FormGroup>
              <Select
                name='target_currency'
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
              >
                <option value='' disabled>
                  --Target currency--
                </option>
                <option value='USD'>USD</option>
                <option value='EUR'>EUROS</option>
                <option value='NGN'>NGN</option>
              </Select>
            </FormGroup>

            <FormGroup>
              <Input
                type='number'
                name='amount'
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder='Send amount'
                autocomplete='off'
              />
            </FormGroup>

            <FormGroup>
              <Button type='submit'>Send</Button>
            </FormGroup>
          </Form>
        </main>
      </Wrapper>
    </Layout>
  );
};

export default SendScreen;
