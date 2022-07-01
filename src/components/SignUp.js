import axios from 'axios';
import { Link, useNavigate } from "react-router-dom";

import Container from './shared/styles/Container.js';
import Logo from './shared/styles/Logo.js';
import Form from './shared/styles/Form.js';
import Button from './shared/styles/Button.js';
import SignUpOrSignIn from './shared/styles/SignUpOrSignIn.js';

export default function SignUp() {
    return (
        <Container>
            <Logo>MyWallet</Logo>
            <Form>
                <input placeholder="Nome" />
                <input placeholder="E-mail" />
                <input placeholder="Senha" />
                <input placeholder="Confirme a senha" />
                <Button>Cadastrar</Button>
            </Form>
            <Link to="/">
                <SignUpOrSignIn>Já tem uma conta? Entre agora!</SignUpOrSignIn>
            </Link>
        </Container>
    );
}