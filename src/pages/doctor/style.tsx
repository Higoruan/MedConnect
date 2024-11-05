import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  padding: 20px;
  background-color: #f4f4f4;
  align-items: center;
  justify-content: flex-start; 
`;

export const Form = styled.View`
  display: flex;
  flex-direction: column;
  width: 100%; 
  height: 100%; 
  background: white;
  padding: 20px; 
  border-radius: 0; 
  box-shadow: none; 
`;

export const Input = styled.TextInput`
  margin-bottom: 15px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

export const Button = styled.TouchableOpacity`
  padding: 10px;
  background-color: #007bff;
  border-radius: 4px;
  align-items: center;

  &:active {
    background-color: #0056b3;
  }
`;

export const ButtonText = styled.Text`
  color: white;
`;

export const ErrorMessage = styled.Text`
  color: red;
  margin-bottom: 15px;
  font-size: 0.9em;
`;
