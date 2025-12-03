import styled, { keyframes } from "styled-components";
import { Icon } from "@iconify/react";
import { useTranslation } from 'react-i18next';

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const fadeInOp = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 0.85;
    transform: translateY(0);
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: ${props => props.isMobile ? '2rem 1rem' : '2rem'};
  max-width: ${props => props.isMobile ? '100%' : '800px'};
  width: 100%;
  box-sizing: border-box;
  margin: 0 auto;
  opacity: ${props => props.visible ? 1 : 0};
  transform: ${props => props.visible ? 'translateY(0)' : 'translateY(20px)'};
  transition: opacity 0.5s ease, transform 0.5s ease;
  
  @media (max-width: 768px) {
    align-items: flex-start;
    text-align: left;
  }
`;

const Title = styled.h1`
  font-size: 2.5rem;
  font-weight: bold;
  color: var(--textColor);
  margin-bottom: 1rem;
  animation: ${fadeIn} 0.5s ease-out ${props => props.delay || 0}s both;
  
  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const IntroText = styled.p`
  font-size: 1.2rem;
  color: var(--textColor);
  font-weight: 600;
  opacity: 0.9;
  margin-bottom: 2rem;
  line-height: 1.5;
  animation: ${fadeInOp} 0.5s ease-out ${props => props.delay || 0}s both;
  
  @media (max-width: 768px) {
    font-size: 1.05rem;
  }
`;

const ContactList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
  max-width: 100%;
  box-sizing: border-box;
  margin-bottom: 3rem;
  
  @media (max-width: 768px) {
    gap: 0.75rem;
  }
`;

const ContactItem = styled.a`
  display: flex;
  align-items: center;
  gap: 1.5rem;
  padding: 1.5rem;
  border-radius: 12px;
  background-color: rgba(var(--textColor-rgb), 0.05);
  border: 1px solid rgba(var(--textColor-rgb), 0.1);
  transition: all 0.3s ease;
  text-decoration: none;
  box-sizing: border-box;
  max-width: 100%;
  animation: ${fadeIn} 0.5s ease-out ${props => props.delay || 0}s both;

  @media (max-width: 768px) {
    padding: 1rem;
    gap: 1rem;
    border-radius: 10px;
  }

  &:hover {
    transform: translateY(-4px);
    background-color: rgba(var(--textColor-rgb), 0.1);
    box-shadow: 0 6px 20px rgba(var(--textColor-rgb), 0.15);
  }
`;

const ContactIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 60px;
  height: 60px;
  border-radius: 12px;
  background-color: rgba(var(--textColor-rgb), 0.1);
  flex-shrink: 0;
  
  @media (max-width: 768px) {
    width: 48px;
    height: 48px;
    border-radius: 10px;
  }
`;

const ContactContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.25rem;
  flex: 1;
`;

const ContactName = styled.span`
  font-size: 1.2rem;
  font-weight: 600;
  color: var(--textColor);
  
  @media (max-width: 768px) {
    font-size: 1.05rem;
  }
`;

const ContactDescription = styled.span`
  font-size: 0.95rem;
  color: var(--textColor);
  opacity: 0.8;
  text-align: left;
  line-height: 1.4;
  
  @media (max-width: 768px) {
    font-size: 0.85rem;
  }
`;

const ThankYouSection = styled.div`
  text-align: center;
  margin-top: 2rem;
  animation: ${fadeIn} 0.5s ease-out 1.5s both;
`;

const ThankYouText = styled.p`
  font-size: 1.1rem;
  color: var(--textColor);
  font-weight: 500;
  opacity: 0.9;
  margin: 0;
  line-height: 1.5;
`;

export default function Contact({ visible }) {
  const { t } = useTranslation();

  const contacts = [
    {
      name: t('contact_email'),
      icon: "simple-icons:gmail",
      link: "mailto:victormm.dev@gmail.com",
      description: t('contact_email_desc')
    },
    {
      name: t('contact_github'),
      icon: "simple-icons:github",
      link: "https://github.com/avictormorais",
      description: t('contact_github_desc')
    },
    {
      name: t('contact_linkedin'),
      icon: "simple-icons:linkedin",
      link: "https://www.linkedin.com/in/avictormorais/",
      description: t('contact_linkedin_desc')
    },
  ];

  return (
    <Container visible={visible}>
      <Title delay={0.2}>{t('contact_title')}</Title>
      <IntroText delay={0.4}>
        {t('contact_intro_text')}
      </IntroText>
      
      <ContactList>
        {contacts.map((contact, index) => (
          <ContactItem 
            key={contact.name} 
            href={contact.link} 
            target="_blank" 
            rel="noopener noreferrer" 
            delay={0.6 + index * 0.2}
          >
            <ContactIcon>
              <Icon icon={contact.icon} width="32" height="32" style={{ color: 'var(--textColor)' }} />
            </ContactIcon>
            <ContactContent>
              <ContactName>{contact.name}</ContactName>
              <ContactDescription>{contact.description}</ContactDescription>
            </ContactContent>
          </ContactItem>
        ))}
      </ContactList>
      
      <ThankYouSection>
        <ThankYouText>
          {t('contact_thank_you')}
        </ThankYouText>
      </ThankYouSection>
    </Container>
  );
}