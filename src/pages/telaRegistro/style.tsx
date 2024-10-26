import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  justify-content: center;
  padding: 20px;
`;

export const Input = styled.TextInput`
  height: 50px;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-bottom: 15px;
  padding: 10px;
`;

export const Button = styled.TouchableOpacity`
  background-color: #007bff;
  padding: 15px;
  border-radius: 5px;
  align-items: center;
`;

export const ButtonText = styled.Text`
  color: white;
  font-size: 16px;
`;

export const ErrorText = styled.Text`
  color: red;
  margin-bottom: 10px;
`;
