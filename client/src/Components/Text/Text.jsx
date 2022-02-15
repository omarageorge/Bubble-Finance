import styled from 'styled-components';

export const Title = styled.h1`
  font-family: Arial, Helvetica, sans-serif;
  font-size: 26px;
  font-weight: 800;
  font-style: normal;
  line-height: 31px;
  color: #37517e;
  margin-bottom: 1rem;

  @media only screen and (max-width: 568px) {
    font-size: 20px;
    margin-bottom: 0rem;
  }
`;

export const SubTitle = styled.h2`
  font-family: Arial, Helvetica, sans-serif;
  font-size: 16px;
  font-weight: 400;
  font-style: normal;
  line-height: 24px;
  color: #5d7079;
`;

export const Heading = styled(Title)`
  font-size: 28px;
  text-align: ${(props) => (props.center ? 'center' : 'left')};
  line-height: 2.2rem;
  margin-top: 0.5rem;
  margin-bottom: 1rem;
`;
