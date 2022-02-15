import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Wrapper from '../../Components/Wrapper/Wrapper';
import { Title, SubTitle } from '../../Components/Text/Text';
import { Form, FormGroup, ErrorMessage } from '../../Components/Form/Form';
import Anchor from '../../Components/Anchor/Anchor';
import { Input } from '../../Components/Input/Input';
import Button from '../../Components/Button/Button';

import style from './Register.module.scss';
import axios from 'axios';

const RegisterScreen = () => {
  let navigate = useNavigate();
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const [error, setError] = useState(null);

  const handleInputChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post('https://bubble.qenvie.com/api/v1/users', userData);
      navigate('/');
    } catch (err) {
      setError('Sorry, could not register');
    }
  };

  return (
    <Wrapper id={style.wrapper}>
      <section>
        <div id={style.intro}>
          <Title>Create your account</Title>
          <SubTitle>
            Already have an account? <Anchor to='/'>Login</Anchor>
          </SubTitle>
        </div>

        <Form onSubmit={handleSubmit}>
          {error && (
            <FormGroup>
              <ErrorMessage>Invalid password</ErrorMessage>
            </FormGroup>
          )}

          <FormGroup>
            <Input
              type='text'
              name='name'
              value={userData.name}
              onChange={handleInputChange}
              placeholder='Enter your name'
            />
          </FormGroup>

          <FormGroup>
            <Input
              type='email'
              name='email'
              value={userData.email}
              onChange={handleInputChange}
              placeholder='Your email Address'
            />
          </FormGroup>

          <FormGroup>
            <Input
              type='password'
              name='password'
              value={userData.password}
              onChange={handleInputChange}
              placeholder='Choose a password'
            />
          </FormGroup>

          <FormGroup>
            <Button type='submit'>Register</Button>
          </FormGroup>
        </Form>
      </section>
    </Wrapper>
  );
};

export default RegisterScreen;
