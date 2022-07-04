import styled from 'styled-components';

const Header = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    color: #FFFFFF;
    font-size: 26px;
    font-weight: 700;
    margin-top: 25px;

    span {
        max-width: 270px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
`

export default Header;