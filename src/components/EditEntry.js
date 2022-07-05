import axios from 'axios';
import { useState, useEffect } from 'react';
import { useNavigate, useLocation, useParams } from "react-router-dom";
import { ThreeDots } from "react-loader-spinner";
import checkForToken from './shared/functions/checkForToken';
import { API_URL } from './App';

import Button from './shared/styles/Button';
import Container from "./shared/styles/Container";
import Form from "./shared/styles/Form";
import Header from "./shared/styles/Header";

export default function EditEntry() {

    const navigate = useNavigate();
    const location = useLocation();
    const route = location.pathname;

    useEffect(() => {
        checkForToken(navigate, route, route);
    }, []);

    const [newEntry, setNewEntry] = useState({
        value: "",
        description: ""
    });
    const [loading, setLoading] = useState(false);
    const { id } = useParams();
    const [headerTitle, setHeaderTitle] = useState("");

    const defineHeader = records => {
        const [entryToEdit] = records.filter(record => record._id === id);

        if (entryToEdit.type === "income") {
            setHeaderTitle("entrada");
            return;
        } else if (entryToEdit.type === "expense") {
            setHeaderTitle("saída");
            return;
        };
    };

    useEffect(() => {
        async function getUserRecords() {
            const URL = `${API_URL}/records`;
            const token = localStorage.getItem("token");
            const config = {
                headers: {
                    "Authorization": token
                }
            };

            await axios
                .get(URL, config)
                .then(({ data }) => {
                    defineHeader(data);
                })
                .catch(err => {
                    console.log(err);
                });
        };

        getUserRecords();
    }, []);

    const updateNumber = (e) => {
        let value = e.target.value;
        if (e.target.validity.valid) {
            let newValue = value.split(".");
            if (newValue[1]?.length > 2) {
                newValue[1] = newValue[1].slice(0, 2);
                newValue = newValue.join(".");
                setNewEntry({ ...newEntry, newValue });
            } else {
                setNewEntry({ ...newEntry, value });
            }
        } else if (value === '') {
            setNewEntry({ ...newEntry, value });
        };
    };

    const editEntry = e => {
        e.preventDefault();

        setLoading(true);

        const URL = `${API_URL}/records/${id}`;
        const token = localStorage.getItem("token");
        const config = {
            headers: {
                "Authorization": token
            }
        };
        const body = {
            value: Number(newEntry.value),
            description: newEntry.description,
        };

        axios
            .put(URL, body, config)
            .then(() => {
                setNewEntry({
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

    const createEditForm = () => {
        return (
            <>
                <input
                    disabled={loading}
                    required
                    type='number'
                    min={0.01}
                    max={999999.99}
                    step="0.01"
                    value={newEntry.value}
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
                    value={newEntry.description}
                    onChange={e => setNewEntry({ ...newEntry, description: e.target.value })}
                />
                <Button disabled={loading}>
                    {!loading ? `Atualizar ${headerTitle}` : <ThreeDots color="#FFFFFF" />}
                </Button>
            </>
        );
    };

    const editForm = createEditForm();

    return (
        <Container>
            <Header>Editar {headerTitle}</Header>
            <Form marginTop="40px" onSubmit={editEntry}>{editForm}</Form>
        </Container>
    );
}