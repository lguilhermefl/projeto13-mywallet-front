import axios from 'axios';
import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from "react-router-dom";
import { ThreeDots } from "react-loader-spinner";
import checkForToken from './shared/styles/checkForToken';
import { API_URL } from './App';

import Container from './shared/styles/Container.js';
import Logo from './shared/styles/Logo.js';
import Form from './shared/styles/Form.js';
import Button from './shared/styles/Button.js';
import SignUpOrSignIn from './shared/styles/SignUpOrSignIn.js';

export default function SignUp() {

    const navigate = useNavigate();
    const location = useLocation();
    const route = location.pathname;

    useEffect(() => {
        checkForToken(navigate, route, "/home");
    }, []);

    const [newUser, setNewUser] = useState({
        name: "",
        email: "",
        password: "",
        repeat_password: ""
    });
    const [loading, setLoading] = useState(false);

    const createSignUpForm = () => {
        return (
            <>
                <input
                    disabled={loading}
                    required
                    type="text"
                    placeholder="Nome"
                    maxLength="40"
                    value={newUser.name}
                    onChange={e => setNewUser({ ...newUser, name: e.target.value })}
                />
                <input
                    disabled={loading}
                    required
                    type="email"
                    maxLength="40"
                    placeholder="E-mail"
                    value={newUser.email}
                    onChange={e => setNewUser({ ...newUser, email: e.target.value })}
                />
                <input
                    disabled={loading}
                    required
                    type="password"
                    minLength="6"
                    maxLength="40"
                    placeholder="Senha"
                    value={newUser.password}
                    onChange={e => setNewUser({ ...newUser, password: e.target.value })}
                />
                <input
                    disabled={loading}
                    required
                    type="password"
                    minLength="6"
                    maxLength="40"
                    placeholder="Confirme a senha"
                    value={newUser.repeat_password}
                    onChange={e => setNewUser({ ...newUser, repeat_password: e.target.value })}
                />
                <Button disabled={loading}>
                    {!loading ? "Cadastrar" : <ThreeDots color="#FFFFFF" />}
                </Button>
            </>
        );
    };

    const signUpSuccess = () => {
        setNewUser({
            name: "",
            email: "",
            password: "",
            repeat_password: ""
        });
        setLoading(false);
        navigate("/");
    };

    const signUp = (e) => {
        e.preventDefault();

        setLoading(true);

        const URL = `${API_URL}/sign-up`;
        const user = { ...newUser };

        axios
            .post(URL, user)
            .then(() => {
                signUpSuccess();
            })
            .catch(() => {
                alert("Houve um erro em seu cadastro, tente novamente por favor!");
                setLoading(false);
            });
    }

    const signUpForm = createSignUpForm();


    return (
        <Container justifyContent="center">
            <Logo>MyWallet</Logo>
            <Form onSubmit={signUp}>{signUpForm}</Form>
            <Link to="/">
                <SignUpOrSignIn>Já tem uma conta? Entre agora!</SignUpOrSignIn>
            </Link>
        </Container>
    );
}