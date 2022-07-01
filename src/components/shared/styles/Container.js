import styled from 'styled-components';

const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: ${props => props.justifyContent};
    align-items: center;
    width: 325px;
    height: 100vh;
`

export default Container;