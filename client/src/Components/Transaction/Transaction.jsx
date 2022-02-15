import { useContext, useState, useEffect } from 'react';
import moment from 'moment';
import { AiFillCheckCircle } from 'react-icons/ai';
import { FaTimesCircle } from 'react-icons/fa';
import { Context } from '../../Context/Context';
import style from './Transaction.module.scss';
import axios from 'axios';

const Transaction = ({ record }) => {
  const { user } = useContext(Context);
  const { access_token } = user;

  const config = {
    headers: { Authorization: `Bearer ${access_token}` },
  };

  const [sender, setSender] = useState('');
  const [receiver, setReceiver] = useState('');

  const transactionAmount = Number(record.amount);

  const theSender = async () => {
    try {
      const { data } = await axios.get(
        `https://bubble.qenvie.com/api/v1/users/${record.sender}`,
        config
      );
      setSender(data.name);
    } catch (err) {}
  };

  const theReceiver = async () => {
    try {
      const { data } = await axios.get(
        `https://bubble.qenvie.com/api/v1/users/${record.receiver}`,
        config
      );
      setReceiver(data.name);
    } catch (err) {}
  };

  useEffect(async () => {
    await theSender();
    await theReceiver();
  }, []);

  return (
    <tr id={style.wrapper}>
      <td>{record.sender === user.id ? 'Me' : sender}</td>
      <td>{record.receiver === user.id ? 'Me' : receiver}</td>
      <td>{transactionAmount.toLocaleString('en')}</td>
      <td>{record.target_currency}</td>
      <td>{record.exchange_rate}</td>
      <td>{moment(record.createdAt).format('Do MMM, YYYY')}</td>
      <td>
        {record.success ? (
          <AiFillCheckCircle color='green' />
        ) : (
          <FaTimesCircle color='red' />
        )}
      </td>
    </tr>
  );
};

export default Transaction;
