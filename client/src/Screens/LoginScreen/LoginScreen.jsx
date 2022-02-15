import axios from 'axios';
import { useState, useContext } from 'react';
import { Context } from '../../Context/Context';

import Wrapper from '../../Components/Wrapper/Wrapper';
import { Title, SubTitle } from '../../Components/Text/Text';
import { Form, FormGroup, ErrorMessage } from '../../Components/Form/Form';
import Anchor from '../../Components/Anchor/Anchor';
import { Input } from '../../Components/Input/Input';
import Button from '../../Components/Button/Button';
import { LoginFailure, LoginStart, LoginSuccess } from '../../Context/Actions';

import style from './Login.module.scss';

const LoginScreen = () => {
  const { dispatch } = useContext(Context);

  const [userData, setUserData] = useState({ email: '', password: '' });
  const [error, setError] = useState(false);

  const handleInputChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    dispatch(LoginStart());

    try {
      const { data } = await axios.post(
        'https://bubble.qenvie.com/api/v1/auth/login',
        { username: userData.email, password: userData.password }
      );

      dispatch(LoginSuccess(data));
      window.location.reload();
    } catch (err) {
      dispatch(LoginFailure());
      setError('Invalid password or username');
    }
  };

  return (
    <Wrapper id={style.wrapper}>
      <section>
        <div id={style.intro}>
          <Title>Bubble Finance</Title>
          <SubTitle>
            New here? <Anchor to='/register'>Register</Anchor>
          </SubTitle>
        </div>

        <Form onSubmit={handleSubmit}>
          {error && (
            <FormGroup>
              <ErrorMessage>{error}</ErrorMessage>
            </FormGroup>
          )}

          <FormGroup>
            <Input
              type='email'
              name='email'
              value={userData.email}
              onChange={handleInputChange}
              placeholder='Your email address'
            />
          </FormGroup>

          <FormGroup>
            <Input
              type='password'
              name='password'
              value={userData.password}
              onChange={handleInputChange}
              placeholder='Your password'
            />
          </FormGroup>

          <FormGroup>
            <Button type='submit'>Log in</Button>
          </FormGroup>
        </Form>
      </section>
    </Wrapper>
  );
};

export default LoginScreen;
