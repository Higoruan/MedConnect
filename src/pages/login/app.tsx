import React, { useState } from 'react';
import { Container, Form, Input, Button, ErrorMessage } from './style';
import { validateEmail } from './validation';
import Register from '../Register/app';
import BottomMenu from '../../components/menu/app';

const App: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isRegister, setIsRegister] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

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
            setIsLoggedIn(true);
        } else {
            setError('E-mail ou senha incorretos.');
        }
    };

    return (
        <Container>
            {isLoggedIn ? (
                <BottomMenu />
            ) : isRegister ? (
                <Register />
            ) : (
                <>
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
                        {/* Link para alternar para o componente Register */}
                        <a href="#" onClick={(e) => { e.preventDefault(); setIsRegister(true); }}>
                            Registre-se
                        </a>
                    </Form>
                </>
            )}
        </Container>
    );
};

export default App;
