import { useState, useEffect } from 'react'
import styled from 'styled-components'
import { Icon } from '@iconify/react'
import { useAppContext } from '../../contexts/AppContext.jsx'
import AVM from '../icons/AVM.jsx'

const MobileHeader = ({ delay = 0 }) => {
  const { theme, language, toggleTheme, changeLanguage } = useAppContext()
  const [isVisible, setIsVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)
  const [hasAnimated, setHasAnimated] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setHasAnimated(true)
    }, (delay + 0.5) * 1000)

    return () => clearTimeout(timer)
  }, [delay])

  useEffect(() => {
    let ticking = false

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentScrollY = window.scrollY

          if (currentScrollY < 50) {
            setIsVisible(true)
          } else if (currentScrollY < lastScrollY) {
            setIsVisible(true)
          } else if (currentScrollY > lastScrollY && currentScrollY > 100) {
            setIsVisible(false)
          }

          setLastScrollY(currentScrollY)
          ticking = false
        })

        ticking = true
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [lastScrollY])

  return (
    <Header $isVisible={isVisible} $delay={delay} $hasAnimated={hasAnimated}>
      <Controls>
        <Logo>
          <AVM width={'60px'} color="var(--textColor)" />
        </Logo>
        <IconButton onClick={toggleTheme} key={theme}>
          <Icon 
            icon={theme === 'light' ? 'line-md:moon-filled-to-sunny-filled-loop-transition' : 'line-md:sunny-filled-loop-to-moon-filled-loop-transition'} 
            width={'25px'}
          />
        </IconButton>
        <LanguageSelector>
          <LangButton active={language === 'pt'} onClick={() => changeLanguage('pt')}>PT</LangButton>
          <LangButton active={language === 'en'} onClick={() => changeLanguage('en')}>EN</LangButton>
        </LanguageSelector>
      </Controls>
    </Header>
  )
}

const fadeIn = `
  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(-20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

const Header = styled.div`
  width: 100%;
  padding: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  background-color: var(--backgroundColor);
  z-index: 100;
  border-bottom: 1px solid rgba(var(--textColor-rgb), 0.1);
  transform: translateY(${props => props.$isVisible ? '0' : '-100%'});
  transition: transform 0.3s ease-in-out;
  backdrop-filter: blur(10px);
  background-color: rgba(var(--backgroundColor-rgb), 0.95);
  animation: ${props => props.$hasAnimated ? 'none' : `fadeIn 0.5s ease-out ${props.$delay || 0}s both`};
  ${fadeIn}
`;

const Controls = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
  width: 100%;
  max-width: 800px;
`;

const Logo = styled.div`
  flex: 1;
  display: flex;
  justify-content: flex-start;
`;

const IconButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0.5rem;
  color: var(--textColor);
  opacity: 0.85;
  transition: all 0.2s ease;

  &:hover {
    opacity: 1;
    transform: scale(1.1);
  }
`;

const LanguageSelector = styled.div`
  display: flex;
  gap: 0.5rem;
  border: 2px solid var(--textColor);
  border-radius: 6px;
  padding: 0.15rem;
  opacity: 0.85;
  margin-right: 30px;
`;

const LangButton = styled.button`
  background: ${props => props.active ? 'var(--textColor)' : 'transparent'};
  color: ${props => props.active ? 'var(--backgroundColor)' : 'var(--textColor)'};
  border: none;
  padding: 0.4rem 0.8rem;
  border-radius: 4px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.2s ease;
  font-size: 0.9rem;

  &:hover {
    opacity: 0.8;
  }
`;

export default MobileHeader
