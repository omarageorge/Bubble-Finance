import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import Layout from '../../Components/Layout/Layout';
import Wrapper from '../../Components/Wrapper/Wrapper';
import Transactions from '../../Components/Transactions/Transactions';
import { Accounts, Account } from '../../Components/Account/Account';
import { Context } from '../../Context/Context';

const HomeScreen = () => {
  const { user } = useContext(Context);
  const { access_token } = user;
  const [accounts, setAccounts] = useState([]);
  const [transactions, setTransactions] = useState([]);

  const config = {
    headers: { Authorization: `Bearer ${access_token}` },
  };

  useEffect(async () => {
    /* Load account data */
    try {
      const { data } = await axios.get(
        `https://bubble.qenvie.com/api/v1/users/${user.id}`,
        config
      );
      setAccounts(data);
    } catch (err) {}

    /* Load transactions */
    try {
      const { data } = await axios.get(
        `https://bubble.qenvie.com/api/v1/transactions/${user.id}`,
        config
      );
      setTransactions(data);
    } catch (err) {}
  }, []);

  return (
    <Layout>
      <Wrapper>
        <Accounts>
          <Account type='USD' balance={accounts.usd} />

          {accounts.euros > 0 && (
            <Account type='EUROS' balance={accounts.euros} />
          )}

          {accounts.ngn > 0 && <Account type='NGN' balance={accounts.ngn} />}
        </Accounts>

        <Transactions records={transactions} />
      </Wrapper>
    </Layout>
  );
};

export default HomeScreen;
