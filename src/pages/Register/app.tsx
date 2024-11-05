import React, { useState } from 'react';
import { Container, Form, Input, Button, ErrorMessage } from './style';
import { validateEmail } from './validation'; 

const Register: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLogin, setIsLogin] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setError('');

    if (!email || !validateEmail(email)) {
      setError('Por favor, insira um e-mail válido.');
      return;
    }

    if (!password) {
      setError('Por favor, insira sua senha.');
      return;
    }

    if (password !== confirmPassword) {
      setError('As senhas não coincidem.');
      return;
    }
    alert('Registro bem-sucedido!');
    setEmail('');
    setPassword('');
    setConfirmPassword('');
  };

  return (
    <Container>
      <h1>Registrar</h1>
      <Form onSubmit={handleSubmit}>
        <Input
          type="email"
          placeholder="E-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <Input
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <Input
          type="password"
          placeholder="Confirme a Senha"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        {error && <ErrorMessage>{error}</ErrorMessage>}
        <Button type="submit">Registrar</Button>
        <a href="#" onClick={(e) => { e.preventDefault(); setIsLogin(true); }}>
          Registre-se
        </a>
      </Form>
    </Container>
  );
};

export default Register;
