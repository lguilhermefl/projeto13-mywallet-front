import styled from 'styled-components';

import AddEntry from './shared/styles/AddEntry';
import Container from "./shared/styles/Container";
import Header from "./shared/styles/Header";

export default function Home() {
    return (
        <Container>
            <Header>Olá, Fulano</Header>
            <History></History>
            <EntryBox>
                <AddEntry>
                    <span>botão</span>
                    <span>Nova entrada</span>
                </AddEntry>
                <AddEntry>
                    <span>botão</span>
                    <span>Nova saída</span>
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