import React, { useState } from 'react';
import { Container, Form, Input, Button, ErrorMessage } from './style';

const App: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const validateEmail = (email: string) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    };

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

        if (email === 'usuario@example.com' && password === 'senha123') {
            alert('Login bem-sucedido!');
        } else {
            setError('E-mail ou senha incorretos.');
        }
    };

    return (
        <Container>
            <h1>Login</h1>
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
                {error && <ErrorMessage>{error}</ErrorMessage>}
                <Button type="submit">Entrar</Button>
            </Form>
            <a href="/recuperar-senha">Esqueceu sua senha?</a>
        </Container>
    );
};

export default App;
