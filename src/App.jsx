import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useAppContext } from './contexts/AppContext.jsx'
import styled from 'styled-components'
import { Icon } from '@iconify/react'
import AVM from './components/icons/AVM.jsx'
import Loading from './components/commom/Loading.jsx'

function App() {
  const { t } = useTranslation()
  const { theme, language, toggleTheme, changeLanguage } = useAppContext()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false)
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  return (
    <Container>
      <Loading active={loading} />
      <MenuContainer>
        <MenuItens>
          <Controls>
            <IconButton onClick={toggleTheme} key={theme}>
              <Icon 
                icon={theme === 'light' ? 'line-md:moon-filled-to-sunny-filled-loop-transition' : 'line-md:sunny-filled-loop-to-moon-filled-loop-transition'} 
                width={'20px'}
              />

            </IconButton>
            <LanguageSelector>
              <LangButton active={language === 'pt'} onClick={() => changeLanguage('pt')}>PT</LangButton>
              <LangButton active={language === 'en'} onClick={() => changeLanguage('en')}>EN</LangButton>
            </LanguageSelector>
          </Controls>
          <MenuItems>
            <MenuItem>{t('about')}</MenuItem>
            <MenuItem>{t('experiences')}</MenuItem>
            <MenuItem>{t('projects')}</MenuItem>
            <MenuItem>{t('contact')}</MenuItem>
          </MenuItems>
        </MenuItens>
      </MenuContainer>
      <ContentContainer>
        <IconContainer>
          <AVM width={'60%'} color="var(--textColor)" />
        </IconContainer>
      </ContentContainer>
    </Container>
  )
}

const Container = styled.div`
  height: 100dvh;
  width: 100dvw;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
`;

const MenuContainer = styled.div`
  width: 20dvw;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: end;
`;

const MenuItens = styled.div`
  margin: 2rem;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  justify-content: space-between;
  min-width: 220px;
`;

const Controls = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
`;

const MenuItems = styled.div`
  display: flex;
  flex-direction: column;
`;

const IconButton = styled.button`
  border: none;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 50%;
  transition: background-color 0.3s;
  background-color: var(--backgroundColor);
  border: 2px solid var(--textColor);
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  
  & svg {
    color: var(--textColor);
  }
`;

const LanguageSelector = styled.div`
  display: flex;
  border-radius: 20px;
  overflow: hidden;
  border: 1px solid var(--textColor);
`;

const LangButton = styled.button`
  background: ${props => props.active ? 'var(--textColor)' : 'transparent'};
  color: ${props => props.active ? 'var(--backgroundColor)' : 'var(--textColor)'};
  border: none;
  padding: 0.5rem 1rem;
  cursor: pointer;
  transition: all 0.3s;
  font-weight: bold;
  opacity: 0.85;
  letter-spacing: 2px;

  &:hover {
    background: var(--textColor);
    color: var(--backgroundColor);
  }
`;

const MenuItem = styled.h2`
  cursor: pointer;
  color: var(--textColor);
  font-size: 1.5rem;
  font-weight: bolder;
  opacity: 0.85;
  margin: 0;
  padding: 0;
  margin-top: 5px;
  transition: all 0.3s ease-in-out;

  &:hover {
    opacity: 1;
    transform: scale(1.005);
  }
`;

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  align-items: end;
  justify-content: end;
`;

const IconContainer = styled.div`
  margin: 2rem;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: end;
  align-items: end;
`;

export default App