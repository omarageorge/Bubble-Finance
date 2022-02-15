import styled from 'styled-components';

export const Input = styled.input`
  display: block;
  width: 100%;
  padding: 1rem 1.5rem;
  color: #202125;
  font-family: Arial, Helvetica, sans-serif;
  font-weight: 400;
  font-style: normal;
  font-size: 15px;
  line-height: 22px;
  border: 1px solid #5d7079;
  border-radius: 8px;
  font-size: 1rem;
  outline: none;
  transition: color 0.15s ease-out;

  &:focus {
    border: 1px solid #009de0;
  }
`;

export const Select = styled.select`
  display: block;
  width: 100%;
  padding: 1rem 1.5rem;
  color: #202125;
  font-family: Arial, Helvetica, sans-serif;
  font-weight: 400;
  font-style: normal;
  font-size: 15px;
  line-height: 22px;
  border: 1px solid #5d7079;
  border-radius: 8px;
  font-size: 1rem;
  outline: none;
  background-color: #fff;
  transition: color 0.15s ease-out;

  &:focus {
    border: 1px solid #009de0;
  }
`;
