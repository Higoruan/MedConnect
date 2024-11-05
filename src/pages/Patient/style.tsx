import styled from 'styled-components/native';

export const Form = styled.View`
  padding: 20px;
  background-color: #f4f4f4;
  border-radius: 5px;
  margin: 10px;
`;

export const Title = styled.Text`
  font-size: 20px;
  margin-bottom: 20px;
  text-align: center;
`;

export const Field = styled.View`
  margin-bottom: 15px;
`;

export const Input = styled.TextInput`
  border-width: 1px;
  border-color: #ccc;
  padding: 10px;
  border-radius: 4px;
  background-color: #fff;
`;

export const ErrorText = styled.Text`
  color: red;
  font-size: 12px;
`;
