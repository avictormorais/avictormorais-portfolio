import styled from "styled-components";
import AVM from "../icons/AVM.jsx";

export default function Loading({ active = true }) {
    return(
        <Container active={active}>
            <AVM width={'20dvw'} color="var(--textColor)" />
        </Container>
    )
}

const Container = styled.div`
    height: 100dvh;
    width: 100dvw;
    position: fixed;
    background-color: var(--backgroundColor);
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: ${props => props.active ? 1 : 0};
    transition: opacity 0.5s ease-in-out;
    pointer-events: ${props => props.active ? 'auto' : 'none'};
    z-index: 1000;
`;