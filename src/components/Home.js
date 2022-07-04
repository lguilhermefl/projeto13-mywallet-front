import axios from 'axios';
import { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from "react-router-dom";
import styled from 'styled-components';
import dayjs from 'dayjs';
import checkForToken from './shared/styles/checkForToken';
import { API_URL } from './App';

import AddEntry from './shared/styles/AddEntry';
import Container from "./shared/styles/Container";
import Header from "./shared/styles/Header";
import exit from '../assets/icons/exit.svg'


const capitalizeStrings = strings => {
    return strings
        .toLowerCase()
        .split(' ')
        .map(str => str[0].toUpperCase() + str.slice(1))
        .join(' ');
};

const capitalizeString = string => {
    const str = string.toLowerCase();
    return str[0].toUpperCase() + str.slice(1);
};

const onlyFirstName = string => {
    const str = string.split(' ');
    const firstName = str[0];
    return firstName;
};

const formatValue = number => {
    return ((number * 100) / 100).toFixed(2).replace(".", ",");
}

function Record({ date, description, value, type, id, records, setRecords }) {
    const formatedDate = dayjs(date).format("DD/MM");
    const capitalizedDescription = capitalizeString(description);
    const formatedValue = formatValue(value);
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);

    const deleteFromRecords = () => {
        {
            const updatedRecords = records.filter(record => record._id !== id);
            setRecords(updatedRecords);
        };
    };

    const deleteEntry = () => {
        if (!window.confirm("Você realmente quer deletar esta entrada?")) {
            return;
        };

        const URL = `${API_URL}/records/${id}`;
        const token = localStorage.getItem("token");
        const config = {
            headers: {
                "Authorization": token
            }
        };

        axios
            .delete(URL, config)
            .then(() => {
                deleteFromRecords();
                setLoading(false);
            })
            .catch(err => {
                setLoading(false);
                console.log(err);
            });
    };

    const navigateToEditEntry = () => {
        navigate(`/edit-entry/${id}`);
    };

    return (
        <RecordItem>
            <DateAndDescription onClick={navigateToEditEntry}>
                <Date>{formatedDate}</Date>
                <Description>{capitalizedDescription}</Description>
            </DateAndDescription>
            <ValueAndDelete>
                <Value type={type}>{formatedValue}</Value>
                <Delete disabled={loading} onClick={deleteEntry}>X</Delete>
            </ValueAndDelete>
        </RecordItem>
    );
}

function Records({ records, setRecords }) {

    const createRecordsHistory = () => {
        if (records?.length === 0) {
            return (
                <NoRecords>
                    <span>Não há registros de entrada ou saída</span>
                </NoRecords>
            );
        } else {
            let totalIncome = 0;
            let totalExpense = 0;

            const incomeRecords = records
                ?.filter(record => record.type === "income");
            const expreseRecords = records
                ?.filter(record => record.type === "expense")

            incomeRecords
                ?.map(record => totalIncome += record.value)
            expreseRecords
                ?.map(record => totalExpense += record.value);

            const total = totalIncome - totalExpense;
            const formatedTotal = formatValue(Math.abs(total));
            return (
                <>
                    <Wrapper>
                        {records
                            ?.map(record =>
                                <Record
                                    key={record._id}
                                    date={record.date}
                                    description={record.description}
                                    value={record.value}
                                    type={record.type}
                                    id={record._id}
                                    records={records}
                                    setRecords={setRecords}
                                />)
                        }
                    </Wrapper>
                    <Balance>
                        <Title>SALDO</Title>
                        <Total total={total}>{formatedTotal}</Total>
                    </Balance>
                </>
            );
        }
    };

    const recordsHistory = createRecordsHistory();

    return (
        <>
            {recordsHistory}
        </>
    );
};

export default function Home() {

    const navigate = useNavigate();
    const location = useLocation();
    const route = location.pathname;

    useEffect(() => {
        checkForToken(navigate, route, route);
    }, []);

    const [user, setUser] = useState();
    const [records, setRecords] = useState();

    useEffect(() => {
        const URL = `${API_URL}/records`;
        const token = localStorage.getItem("token");
        const config = {
            headers: {
                "Authorization": token
            }
        };

        axios
            .get(URL, config)
            .then(({ data }) => {
                const records = data;
                const user = data.shift().user;
                const firstName = onlyFirstName(user);
                setRecords(records);
                setUser(capitalizeStrings(firstName));
            })
            .catch(err => {
                console.log(err);
            });
    }, []);

    const logout = () => {
        if (window.confirm("Você realmente quer sair?")) {
            localStorage.removeItem("token");
            navigate("/");
        };
    };

    return (
        <Container>
            <Header>
                <span>Olá, {user}</span>
                <img src={exit} alt="Exit" onClick={logout} />
            </Header>
            <History>
                <Records records={records} setRecords={setRecords} />
            </History>
            <EntryBox>
                <Link to="/new-income">
                    <AddEntry>
                        <ion-icon name="add-circle-outline"></ion-icon>
                        <Entry>Nova entrada</Entry>
                    </AddEntry>
                </Link>
                <Link to="/new-expense">
                    <AddEntry>
                        <ion-icon name="remove-circle-outline"></ion-icon>
                        <Entry>Nova saída</Entry>
                    </AddEntry>
                </Link>
            </EntryBox>
        </Container>
    );
}

const valueColor = type => {
    if (type === "income") {
        return "#03AC00";
    } else if (type === "expense") {
        return "#C70000";
    };
};

const totalColor = total => {
    if (total >= 0) {
        return "#03AC00";
    } else if (total < 0) {
        return "#C70000";
    };
};

const History = styled.div`
    height: 445px;
    width: 100%;
    background: #FFFFFF;
    border-radius: 5px;
    margin: 25px 0 15px;
    box-sizing: border-box;
    padding: 25px 15px;
    position: relative;
`

const EntryBox = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    gap: 15px;
`

const Entry = styled.span`
    word-break: break-word;
    width: 80px;
    text-align: left;
`

const NoRecords = styled.div`
    position: absolute;
    width: 180px;
    text-align: center;
    top: 50%;
    left: 50%;
    -ms-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);

    span {
        font-weight: 400;
        font-size: 20px;
        line-height: 23px;
        color: #868686;
        word-wrap: break-word;
    }
`

const RecordItem = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    font-size: 16px;
    font-weight: 400;
    margin-bottom: 15px;
`

const DateAndDescription = styled.div`
    display: flex;
    gap: 10px;
`

const Date = styled.span`
    color: #C6C6C6;
`

const Description = styled.span`
    color: #000000;
    max-width: 125px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
`

const ValueAndDelete = styled.div`
    display: flex;
    gap: 10px;
`

const Value = styled.span`
    color: ${props => valueColor(props.type)};
`

const Delete = styled.span`
    color: #C6C6C6;
`

const Balance = styled.div`
    width: 100%;
    padding: 10px 15px;
    display: flex;
    justify-content: space-between;
    position: absolute;
    left: 0;
    bottom: 0;
    background: #FFFFFF;
    font-size: 17px;
    box-sizing: border-box;
`

const Title = styled.span`
    font-weight: 700;
    color: #000000;
`

const Total = styled.span`
    color: ${props => totalColor(props.total)};
`

const Wrapper = styled.div`
    max-height: 95%;
    overflow: auto;
`