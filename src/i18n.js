import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import pt from './locales/pt/translation.json'
import en from './locales/en/translation.json'

const resources = {
  pt: {
    translation: pt
  },
  en: {
    translation: en
  }
}

const getBrowserLanguage = () => {
  const lang = navigator.language || navigator.userLanguage
  return lang.startsWith('en') ? 'en' : 'pt'
}

const detectedLanguage = getBrowserLanguage()

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: localStorage.getItem('language') || detectedLanguage,
    fallbackLng: 'pt',
    interpolation: {
      escapeValue: false
    }
  })

if (!localStorage.getItem('language')) {
  localStorage.setItem('language', detectedLanguage)
}

export default i18n