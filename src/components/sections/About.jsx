import styled, { keyframes } from "styled-components";
import AVM from "../icons/AVM.jsx";
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

export default function About({ visible }) {
    const { t } = useTranslation();
    const languages = [
        { name: "JavaScript", icon: "simple-icons:javascript" },
        { name: "Python", icon: "simple-icons:python" },
        { name: "Java", icon: "ri:java-fill" },
        { name: "C", icon: "simple-icons:c" },
        { name: "HTML", icon: "simple-icons:html5" },
        { name: "CSS", icon: "simple-icons:css3" },
        { name: "Solidity", icon: "simple-icons:solidity" },
    ];

    const frameworks = [
        { name: "React", icon: "simple-icons:react" },
        { name: "Native", icon: "tabler:brand-react-native" },
        { name: "Node.js", icon: "simple-icons:nodedotjs" },
        { name: "Express", icon: "simple-icons:express" },
        { name: "Flask", icon: "cib:flask" },
        { name: "Electron", icon: "simple-icons:electron" },
        { name: "Expo", icon: "simple-icons:expo" },
    ];

    const tools = [
        { name: "Git", icon: "simple-icons:git" },
        { name: "MongoDB", icon: "simple-icons:mongodb" },
        { name: "Styled", icon: "simple-icons:styledcomponents" },
        { name: "Bootstrap", icon: "simple-icons:bootstrap" },
        { name: "Axios", icon: "simple-icons:axios" },
        { name: "Vitest", icon: "simple-icons:vitest" },
        { name: "WebSocket", icon: "simple-icons:socketdotio" },
        { name: "Jira", icon: "simple-icons:jira" },
    ];

    return (
        <Container visible={visible}>
            <ContainerIcon delay={0.2}>
                <AVM width={'150px'} color="var(--textColor)" />
            </ContainerIcon>
            <Title delay={0.4}>{t('about_name')}</Title>
            <Paragraph delay={0.6}>{t('about_intro_1')}</Paragraph>
            <Paragraph delay={0.8}>{t('about_intro_2')}</Paragraph>
            <Title delay={1.0}>{t('technologies_title')}</Title>
            <Paragraph delay={1.2}>{t('technologies_desc')}</Paragraph>

            <StackSection>
                <StackCategory delay={1.6}>
                    <CategoryTitle>{t('languages')}</CategoryTitle>
                    <TechGrid>
                        {languages.map((tech) => (
                            <TechItem key={tech.name}>
                                <Icon icon={tech.icon} width="40" height="40" style={{ color: 'var(--textColor)' }} />
                                <TechName>{tech.name}</TechName>
                            </TechItem>
                        ))}
                    </TechGrid>
                </StackCategory>

                <StackCategory delay={1.8}>
                    <CategoryTitle>{t('frameworks')}</CategoryTitle>
                    <TechGrid>
                        {frameworks.map((tech) => (
                            <TechItem key={tech.name}>
                                <Icon icon={tech.icon} width="40" height="40" style={{ color: 'var(--textColor)' }} />
                                <TechName>{tech.name}</TechName>
                            </TechItem>
                        ))}
                    </TechGrid>
                </StackCategory>

                <StackCategory delay={2.0}>
                    <CategoryTitle>{t('tools')}</CategoryTitle>
                    <TechGrid>
                        {tools.map((tech) => (
                            <TechItem key={tech.name}>
                                <Icon icon={tech.icon} width="40" height="40" style={{ color: 'var(--textColor)' }} />
                                <TechName>{tech.name}</TechName>
                            </TechItem>
                        ))}
                    </TechGrid>
                </StackCategory>
            </StackSection>

            <CVSection delay={2.2}>
                <Title>{t('cv_title')}</Title>
                <Paragraph>{t('cv_description')}</Paragraph>
                <CVButton href="/curriculum.pdf" aria-label={t('download_cv')}>
                    {t('download_cv')}
                </CVButton>
            </CVSection>
        </Container>
    )
}

const Container = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    padding-top: 3rem;
    padding-bottom: 2rem;
    padding-right: 30px;
    margin-right: 0px;
    max-width: 1000px;
    overflow-y: auto;
    overflow-x: hidden;
    opacity: ${props => props.visible ? 1 : 0};
    transition: opacity 0.5s ease-out;
`;

const Row = styled.div`
    display: flex;
    flex-direction: row;
`;

const Title = styled.h1`
    font-size: 1.55rem;
    font-weight: bolder;
    color: var(--textColor);
    margin-top: 1rem;
    margin-bottom: 0.5rem;
    padding-bottom: 0;
    animation: ${fadeIn} 0.5s ease-out ${props => props.delay || 0}s both;
`;

const Paragraph = styled.p`
    font-size: 1.1rem;
    color: var(--textColor);
    font-weight: 800;
    opacity: 0.85;
    margin-bottom: 0.75rem;
    margin-top: 0;
    padding-top: 0;
    animation: ${fadeInOp} 0.5s ease-out ${props => props.delay || 0}s both;
`;

const StackSection = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1.25rem;
    margin-top: 1.5rem;
`;

const StackCategory = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    animation: ${fadeIn} 0.5s ease-out ${props => props.delay || 0}s both;
`;

const CategoryTitle = styled.h2`
    font-size: 1.2rem;
    font-weight: bold;
    color: var(--textColor);
    margin: 0;
    opacity: 0.95;
`;

const TechGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(85px, 1fr));
    gap: 1rem;
    
    @media (max-width: 768px) {
        grid-template-columns: repeat(auto-fill, minmax(70px, 1fr));
        gap: 0.75rem;
    }
`;

const TechItem = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 0.4rem;
    padding: 0.75rem 0.5rem;
    border-radius: 6px;
    transition: transform 0.2s ease;
    padding-inline: 0;
    margin-left: -15px;
    
    &:hover {
        transform: translateY(-3px);
    }
`;

const TechName = styled.span`
    font-size: 0.85rem;
    color: var(--textColor);
    font-weight: 800;
    margin-top: 5px;
    text-align: center;
    opacity: 0.85;
    line-height: 1.2;
`;

const ContainerIcon = styled.div`
    min-height: 70px;
    margin-bottom: 1rem;
    animation: ${fadeIn} 0.5s ease-out ${props => props.delay || 0}s both;
`;

const CVSection = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;
    margin-top: 2rem;
    border-radius: 8px;
    backdrop-filter: blur(10px);
    animation: ${fadeIn} 0.5s ease-out ${props => props.delay || 0}s both;
`;


const CVButton = styled.a`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.75rem;
    padding: 0.5rem 1.5rem;
    border-radius: 6px;
    background-color: transparent;
    border: 2px solid var(--textColor);
    color: var(--textColor);
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
    text-decoration: none;
    width: fit-content;
    
    &:hover {
        background-color: var(--textColor);
        color: var(--backgroundColor);
        transform: translateY(-2px);
    }
    
    &:focus-visible {
        outline: 2px solid var(--textColor);
        outline-offset: 2px;
    }
    
    &:active {
        transform: translateY(0px);
    }
`;