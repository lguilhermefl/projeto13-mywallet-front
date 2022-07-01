import axios from 'axios';
import { Link, useNavigate } from "react-router-dom";

import Container from './shared/styles/Container.js';
import Logo from './shared/styles/Logo.js';
import Form from './shared/styles/Form.js';
import Button from './shared/styles/Button.js';
import SignUpOrSignIn from './shared/styles/SignUpOrSignIn.js';

export default function SignIn() {
    return (
        <Container justifyContent="center">
            <Logo>MyWallet</Logo>
            <Form>
                <input placeholder="E-mail" />
                <input placeholder="Senha" />
                <Button>Entrar</Button>
            </Form>
            <Link to="/signup">
                <SignUpOrSignIn>Primeira vez? Cadastre-se!</SignUpOrSignIn>
            </Link>
        </Container>
    );
};