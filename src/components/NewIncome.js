import axios from 'axios';
import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from "react-router-dom";
import { ThreeDots } from "react-loader-spinner";
import checkForToken from './shared/functions/checkForToken';
import { API_URL } from './App';

import Button from './shared/styles/Button';
import Container from "./shared/styles/Container";
import Form from "./shared/styles/Form";
import Header from "./shared/styles/Header";

export default function NewIncome() {

    const navigate = useNavigate();
    const location = useLocation();
    const route = location.pathname;

    useEffect(() => {
        checkForToken(navigate, route, route);
    }, []);

    const [newIncome, setNewIncome] = useState({
        value: "",
        description: ""
    });
    const [loading, setLoading] = useState(false);

    const updateNumber = (e) => {
        let value = e.target.value;
        if (e.target.validity.valid) {
            let newValue = value.split(".");
            if (newValue[1]?.length > 2) {
                newValue[1] = newValue[1].slice(0, 2);
                newValue = newValue.join(".");
                setNewIncome({ ...newIncome, newValue });
            } else {
                setNewIncome({ ...newIncome, value });
            }
        } else if (value === '') {
            setNewIncome({ ...newIncome, value });
        };
    };

    const addEntry = e => {
        e.preventDefault();

        setLoading(true);

        const URL = `${API_URL}/records`;
        const token = localStorage.getItem("token");
        const config = {
            headers: {
                "Authorization": token
            }
        };
        const body = {
            value: Number(newIncome.value),
            description: newIncome.description,
            date: Date.now(),
            type: "income"
        };

        axios
            .post(URL, body, config)
            .then(() => {
                setNewIncome({
                    value: "",
                    description: ""
                });
                setLoading(false);
                navigate("/home");
            })
            .catch(() => {
                alert("Preencha os campos corretamente por favor!");
                setLoading(false);
            });
    };

    const createEntryForm = () => {
        return (
            <>
                <input
                    disabled={loading}
                    required
                    type='number'
                    min={0.01}
                    max={999999.99}
                    step="0.01"
                    value={newIncome.value}
                    onChange={updateNumber}
                    pattern="/^(?!0\d+)\d*(\.\d{2})?$/"
                    placeholder="Valor"
                />
                <input
                    disabled={loading}
                    required
                    type="text"
                    maxLength="20"
                    placeholder="Descrição"
                    value={newIncome.description}
                    onChange={e => setNewIncome({ ...newIncome, description: e.target.value })}
                />
                <Button disabled={loading}>
                    {!loading ? "Salvar entrada" : <ThreeDots color="#FFFFFF" />}
                </Button>
            </>
        );
    };

    const entryForm = createEntryForm();

    return (
        <Container>
            <Header>Nova entrada</Header>
            <Form marginTop="40px" onSubmit={addEntry}>{entryForm}</Form>
        </Container>
    );
}