import Button from './shared/styles/Button';
import Container from "./shared/styles/Container";
import Form from "./shared/styles/Form";
import Header from "./shared/styles/Header";

export default function NewExit() {
    return (
        <Container>
            <Header>Nova saída</Header>
            <Form marginTop="40px">
                <input placeholder="Valor" />
                <input placeholder="Descrição" />
                <Button>Salvar saída</Button>
            </Form>
        </Container>
    );
}