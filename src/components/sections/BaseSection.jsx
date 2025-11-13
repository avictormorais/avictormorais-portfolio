import styled from "styled-components";

export default function About() {
    return(
        <Container>
            <Row>
            </Row>
        </Container>
    )
}

const Container = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    padding-block: 2rem;
    padding-right: 30px;
    margin-right: 0px;
    max-width: 1000px;
`;

const Row = styled.div`
    display: flex;
    flex-direction: row;
`;