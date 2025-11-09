import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useAppContext } from './contexts/AppContext.jsx'
import styled from 'styled-components'
import AVM from './components/icons/AVM.jsx'

function App() {
  const { t } = useTranslation()
  const { theme, toggleTheme, changeLanguage } = useAppContext()
  const [count, setCount] = useState(0)

  return (
    <Container>
      <IconContainer>
        <AVM width={220} color="var(--textColor)" />
      </IconContainer>
      <Button onClick={toggleTheme}>{theme === 'light' ? t('dark') : t('light')}</Button>
      <Button onClick={() => changeLanguage('pt')}>PT</Button>
      <Button onClick={() => changeLanguage('en')}>EN</Button>
    </Container>
  )
}

const IconContainer = styled.div`
  margin-bottom: 50px;
`;

const Container = styled.div`
  height: 100dvh;
  width: 100dvw;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const Button = styled.div`
  width: 250px;
  border-radius: 20px;
  cursor: pointer;
  text-align: center;
  margin-inline: auto;
  margin-top: 15px;
  font-size: 1.25rem;
  font-weight: bolder;
  padding-block: 2px;
`;

export default App
