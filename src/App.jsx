import { useEffect, useState, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { useAppContext } from './contexts/AppContext.jsx'
import styled, { keyframes } from 'styled-components'
import { Icon } from '@iconify/react'
import AVM from './components/icons/AVM.jsx'
import Loading from './components/commom/Loading.jsx'
import About from './components/sections/About.jsx'
import Experiences from './components/sections/Experiences.jsx'
import Lenis from 'lenis'

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

const fadeInMenu = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 0.85;
    transform: translateY(0);
  }
`

function App() {
  const { t } = useTranslation()
  const { theme, language, toggleTheme, changeLanguage } = useAppContext()
  const [loading, setLoading] = useState(true)
  const [selectedMenuItem, setSelectedMenuItem] = useState('')
  const [fadingOut, setFadingOut] = useState(false)
  const [iconVisible, setIconVisible] = useState(true)
  const [aboutMounted, setAboutMounted] = useState(false)
  const [experiencesMounted, setExperiencesMounted] = useState(false)
  const wrapperRef = useRef(null)
  const contentRef = useRef(null)
  const lenisRef = useRef(null)

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false)
    }, 1500)

    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (wrapperRef.current && contentRef.current && !iconVisible && !lenisRef.current) {
      lenisRef.current = new Lenis({
        wrapper: wrapperRef.current,
        content: contentRef.current,
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        direction: 'vertical',
        gestureDirection: 'vertical',
        smooth: true,
        mouseMultiplier: 1,
        smoothTouch: false,
        touchMultiplier: 2,
        infinite: false,
      })

      function raf(time) {
        lenisRef.current?.raf(time)
        requestAnimationFrame(raf)
      }

      requestAnimationFrame(raf)
    }

    return () => {
      if (lenisRef.current) {
        lenisRef.current.destroy()
        lenisRef.current = null
      }
    }
  }, [iconVisible])

  useEffect(() => {
    if (selectedMenuItem) {
      setFadingOut(true)
      const timer = setTimeout(() => {
        setIconVisible(false)
      }, 500)
      return () => clearTimeout(timer)
    }
  }, [selectedMenuItem])

  useEffect(() => {
    if (selectedMenuItem === 'about') {
      setAboutMounted(true)
      const timer = setTimeout(() => {
        setExperiencesMounted(false)
      }, 500)
      return () => clearTimeout(timer)
    } else if (selectedMenuItem === 'experiences') {
      setExperiencesMounted(true)
      const timer = setTimeout(() => {
        setAboutMounted(false)
      }, 500)
      return () => clearTimeout(timer)
    } else if (selectedMenuItem && selectedMenuItem !== 'about' && selectedMenuItem !== 'experiences') {
      const timer = setTimeout(() => {
        setAboutMounted(false)
        setExperiencesMounted(false)
      }, 500)
      return () => clearTimeout(timer)
    }
  }, [selectedMenuItem])

  const handleChangeMenuItem = (item) => {
    const timer = setTimeout(() => {
      setSelectedMenuItem(item)
    }, 500)
    return () => clearTimeout(timer)
  }

  return (
    <Container>
      <Loading active={loading} />
      <MenuContainer>
        <MenuItens>
          <Controls delay={2}>
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
            <Row>
              <MenuItem selected={selectedMenuItem === 'about'} delay={2.2} onClick={() => handleChangeMenuItem('about')}>{t('about')}</MenuItem>
              <Circle active={selectedMenuItem === 'about'} />
            </Row>
            <Row>
              <MenuItem selected={selectedMenuItem === 'experiences'} delay={2.4} onClick={() => handleChangeMenuItem('experiences')}>{t('experiences')}</MenuItem>
              <Circle active={selectedMenuItem === 'experiences'} />
            </Row>
            <Row>
              <MenuItem selected={selectedMenuItem === 'projects'} delay={2.6} onClick={() => handleChangeMenuItem('projects')}>{t('projects')}</MenuItem>
              <Circle active={selectedMenuItem === 'projects'} />
            </Row>
            <Row>
              <MenuItem selected={selectedMenuItem === 'contact'} delay={2.8} onClick={() => handleChangeMenuItem('contact')}>{t('contact')}</MenuItem>
              <Circle active={selectedMenuItem === 'contact'} />
            </Row>
          </MenuItems>
        </MenuItens>
      </MenuContainer>
      <ContentContainer delay={3} fadingOut={fadingOut}>
        <ScrollWrapper ref={wrapperRef}>
          <ScrollContent ref={contentRef}>
            {iconVisible && (
              <IconContainer fadingOut={fadingOut}>
                <AVM width={'60%'} color="var(--textColor)" />
              </IconContainer>
            )}
            {!iconVisible && aboutMounted && <About visible={selectedMenuItem === 'about'} />}
            {!iconVisible && experiencesMounted && <Experiences visible={selectedMenuItem === 'experiences'} />}
          </ScrollContent>
        </ScrollWrapper>
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
  overflow: hidden;
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
  animation: ${fadeIn} 0.5s ease-out ${props => props.delay || 0}s both;
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
  margin: 0;
  padding: 0;
  margin-top: 5px;
  transition: all 0.3s ease-in-out;
  animation: ${fadeInMenu} 0.5s ease-out ${props => props.delay || 0}s both;

  &:hover {
    transition: all 0.3s ease-in-out;
    opacity: 1 !important;
  }
`;

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  align-items: end;
  justify-content: end;
  animation: ${fadeIn} 0.5s ease-out ${props => props.delay || 0}s both;
`;

const ScrollWrapper = styled.div`
  width: 100%;
  height: 100%;
  overflow-y: auto;
  overflow-x: hidden;
  display: flex;
  flex-direction: column;
  align-items: end;
`;

const ScrollContent = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: end;
`;

const IconContainer = styled.div`
  margin: 2rem;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: end;
  align-items: end;
  opacity: ${props => props.fadingOut ? 0 : 1};
  transition: opacity 0.5s ease-out;
  align-items: end;
  height: 95dvh;
  margin-top: auto;
`;

const Row = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  align-items: center;
`;

const Circle = styled.div`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: var(--textColor);
  margin-bottom: -10px;
  margin-left: 5px;
  opacity: ${props => props.active ? 0.5 : 0};
  transition: all 0.3s ease-in-out;
`;

export default App