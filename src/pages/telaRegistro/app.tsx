import React, { useState } from 'react';
import { Container, Input, Button, ButtonText, ErrorText } from './style';

const RegistrationForm: React.FC = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState<string[]>([]);

  const validateEmail = (email: string) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  };

  const handleSubmit = () => {
    const newErrors: string[] = [];
    
    if (!fullName) newErrors.push('Nome completo é obrigatório.');
    if (!email) {
      newErrors.push('E-mail é obrigatório.');
    } else if (!validateEmail(email)) {
      newErrors.push('Formato de e-mail inválido.');
    }
    if (!password) newErrors.push('Senha é obrigatória.');
    if (password.length < 6) newErrors.push('A senha deve ter pelo menos 6 caracteres.');
    if (password !== confirmPassword) newErrors.push('As senhas não coincidem.');

    setErrors(newErrors);
    
    if (newErrors.length === 0) {
          console.log('Registro bem-sucedido:', { fullName, email, password });
    }
  };

  return (
    <Container>
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
      <Button onPress={handleSubmit}>
        <ButtonText>Registrar</ButtonText>
      </Button>
    </Container>
  );
};

export default RegistrationForm;
