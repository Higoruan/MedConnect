import React, { useState } from 'react';
import { Container, Title, InputContainer, Input, ButtonContainer, Button, ButtonText, ErrorText } from './style';
import { validateForm } from './validation';
import BottomMenu from '../../components/menu/app';

const RegistrationForm: React.FC = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState<string[]>([]);
  const [isRegistered, setIsRegistered] = useState(false);

  const handleSubmit = () => {
    const newErrors = validateForm(fullName, email, password, confirmPassword);
    setErrors(newErrors);

    if (newErrors.length === 0) {
      console.log('Registro bem-sucedido:', { fullName, email, password });
      setIsRegistered(true);
    }
  };

  if (isRegistered) {
    return <BottomMenu />; // Renderiza o menu após o registro
  }
  return (
    <Container>
      <InputContainer>
        <Title>Registre-se</Title>
        <Input
          placeholder="Nome Completo"
          value={fullName}
          onChangeText={setFullName}
        />
        <Input
          placeholder="E-mail"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />
        <Input
          placeholder="Senha"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        <Input
          placeholder="Confirmação de Senha"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry
        />
        {errors.map((error, index) => (
          <ErrorText key={index}>{error}</ErrorText>
        ))}
      </InputContainer>
      <ButtonContainer>
        <Button onPress={handleSubmit}>
          <ButtonText>Registrar</ButtonText>
        </Button>
      </ButtonContainer>
    </Container>
  );
};

export default RegistrationForm;
