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
  padding: 2rem;
  max-width: 800px;
  margin: 0 auto;
  opacity: ${props => props.visible ? 1 : 0};
  transform: ${props => props.visible ? 'translateY(0)' : 'translateY(20px)'};
  transition: opacity 0.5s ease, transform 0.5s ease;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  font-weight: bold;
  color: var(--textColor);
  margin-bottom: 1rem;
  animation: ${fadeIn} 0.5s ease-out ${props => props.delay || 0}s both;
`;

const IntroText = styled.p`
  font-size: 1.2rem;
  color: var(--textColor);
  font-weight: 600;
  opacity: 0.9;
  margin-bottom: 2rem;
  line-height: 1.5;
  animation: ${fadeInOp} 0.5s ease-out ${props => props.delay || 0}s both;
`;

const ContactList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  width: 100%;
  margin-bottom: 3rem;
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
  animation: ${fadeIn} 0.5s ease-out ${props => props.delay || 0}s both;

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
`;

const ContactDescription = styled.span`
  font-size: 0.95rem;
  color: var(--textColor);
  opacity: 0.8;
  line-height: 1.4;
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