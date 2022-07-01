import styled from 'styled-components';

import AddEntry from './shared/styles/AddEntry';
import Container from "./shared/styles/Container";
import Header from "./shared/styles/Header";
import exit from '../assets/icons/exit.svg'

export default function Home() {
    return (
        <Container>
            <Header>
                <span>Olá, Fulano</span>
                <img src={exit} alt="Exit" />
            </Header>
            <History></History>
            <EntryBox>
                <AddEntry>
                    <ion-icon name="add-circle-outline"></ion-icon>
                    <Entry>Nova entrada</Entry>
                </AddEntry>
                <AddEntry>
                    <ion-icon name="remove-circle-outline"></ion-icon>
                    <Entry>Nova saída</Entry>
                </AddEntry>
            </EntryBox>
        </Container>
    );
}

const History = styled.div`
    height: 445px;
    width: 100%;
    background: #FFFFFF;
    border-radius: 5px;
    margin: 25px 0 15px;
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