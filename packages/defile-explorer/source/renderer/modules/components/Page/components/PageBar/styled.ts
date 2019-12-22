import styled from 'styled-components';



export const StyledPageBar: any = styled.div`
    height: 50px;
    display: grid;
    grid-template-columns: 1fr 3fr 1fr;
    align-items: center;

    background-color: ${(props: any) => {
        return props.theme.backgroundColorDark;
    }};
`;
