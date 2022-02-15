import styled from 'styled-components';

const Button = styled.button`
  width: 100%;
  padding: 1rem;
  font-size: 15px;
  font-weight: 700;
  font-style: normal;
  line-height: 15px;
  color: #fff;
  border: 0px solid #009de0;
  border-radius: 8px;
  background-color: #009de0;
  cursor: pointer;
  transition: background-color 0.15s ease-out, color 0.15s ease-out;

  &:hover {
    background-color: #05a2db;
  }
`;

export default Button;
