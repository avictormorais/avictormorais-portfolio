import styled, { keyframes } from 'styled-components'

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`

const FadeInDiv = styled.div`
  animation: ${fadeIn} 0.5s ease-out ${props => props.delay || 0}s both;
`

const FadeIn = ({ children, delay }) => (
  <FadeInDiv delay={delay}>
    {children}
  </FadeInDiv>
)

export default FadeIn