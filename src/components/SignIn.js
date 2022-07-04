import axios from 'axios';
import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from "react-router-dom";
import { ThreeDots } from "react-loader-spinner";
import checkForToken from './shared/functions/checkForToken';
import { API_URL } from './App';

import Container from './shared/styles/Container.js';
import Logo from './shared/styles/Logo.js';
import Form from './shared/styles/Form.js';
import Button from './shared/styles/Button.js';
import SignUpOrSignIn from './shared/styles/SignUpOrSignIn.js';

export default function SignIn() {

    const navigate = useNavigate();
    const location = useLocation();
    const route = location.pathname;

    useEffect(() => {
        checkForToken(navigate, route, "/home");
    }, []);

    const [user, setUser] = useState({
        email: "",
        password: ""
    });
    const [loading, setLoading] = useState(false);

    const createSignInForm = () => {
        return (
            <>
                <input
                    disabled={loading}
                    required
                    type="email"
                    maxLength="40"
                    placeholder="E-mail"
                    value={user.email}
                    onChange={e => setUser({ ...user, email: e.target.value })}
                />
                <input
                    disabled={loading}
                    required
                    type="password"
                    minLength="6"
                    maxLength="40"
                    placeholder="Senha"
                    value={user.password}
                    onChange={e => setUser({ ...user, password: e.target.value })}
                />
                <Button disabled={loading}>
                    {!loading ? "Entrar" : <ThreeDots color="#FFFFFF" />}
                </Button>
            </>
        );
    };

    const signInSuccess = (data) => {
        setUser({
            name: "",
            password: ""
        });
        localStorage.setItem("token", `Bearer ${data}`);
        setLoading(false);
        navigate("/home");
    };

    const signIn = (e) => {
        e.preventDefault();

        setLoading(true);

        const URL = `${API_URL}/sign-in`;
        const userInfo = { ...user };

        axios
            .post(URL, userInfo)
            .then(({ data }) => {
                signInSuccess(data);
            })
            .catch(() => {
                alert("Houve um erro em seu login, tente novamente por favor!");
                setLoading(false);
            });
    };

    const signInForm = createSignInForm();

    return (
        <Container justifyContent="center">
            <Logo>MyWallet</Logo>
            <Form onSubmit={signIn}>{signInForm}</Form>
            <Link to="/sign-up">
                <SignUpOrSignIn>Primeira vez? Cadastre-se!</SignUpOrSignIn>
            </Link>
        </Container>
    );
};