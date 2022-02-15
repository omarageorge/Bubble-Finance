import { Heading } from '../Text/Text';
import Transaction from '../Transaction/Transaction';

import style from './Transactions.module.scss';

const Transactions = ({ records }) => {
  return (
    <section id={style.wrapper}>
      <Heading>Transactions</Heading>

      <table>
        <thead>
          <tr>
            <th>From</th>
            <th>To</th>
            <th>Amount</th>
            <th>Currency</th>
            <th>Rate</th>
            <th>Date</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {records.map((transaction) => (
            <Transaction key={transaction.id} record={transaction} />
          ))}
        </tbody>
      </table>
    </section>
  );
};

export default Transactions;
