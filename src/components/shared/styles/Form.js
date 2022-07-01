import styled from 'styled-components';

const Form = styled.form`
    display: flex;
    flex-direction: column;
    gap: 13px;
    width: 100%;
    margin-top: ${props => props.marginTop};
    
    input {
        background: #FFFFFF;
        border-radius: 5px;
        height: 58px;
        box-sizing: border-box;
        font-size: 20px;
        padding: 0 15px;
        color: #000000;
        border: none;
        outline: none;
    }
    
`

export default Form;