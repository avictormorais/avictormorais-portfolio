import { createContext, useContext, useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'

const AppContext = createContext()

export const useAppContext = () => useContext(AppContext)

export const AppProvider = ({ children }) => {
  const { i18n } = useTranslation()
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light')
  const [language, setLanguage] = useState(localStorage.getItem('language') || 'pt')

  useEffect(() => {
    localStorage.setItem('theme', theme)
    document.documentElement.setAttribute('data-theme', theme)
  }, [theme])

  useEffect(() => {
    localStorage.setItem('language', language)
    i18n.changeLanguage(language)
  }, [language, i18n])

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light')
  }

  const changeLanguage = (lang) => {
    setLanguage(lang)
  }

  return (
    <AppContext.Provider value={{ theme, language, toggleTheme, changeLanguage }}>
      {children}
    </AppContext.Provider>
  )
}