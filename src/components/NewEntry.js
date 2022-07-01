import Button from './shared/styles/Button';
import Container from "./shared/styles/Container";
import Form from "./shared/styles/Form";
import Header from "./shared/styles/Header";

export default function NewEntry() {
    return (
        <Container>
            <Header>Nova entrada</Header>
            <Form marginTop="40px">
                <input placeholder="Valor" />
                <input placeholder="Descrição" />
                <Button>Salvar entrada</Button>
            </Form>
        </Container>
    );
}