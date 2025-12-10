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

export default function Experiences({ visible }) {
    const { t } = useTranslation();

    const experiences = [
        {
            role: t('exp_blockchain_role'),
            company: t('exp_blockchain_company'),
            period: t('exp_blockchain_period'),
            description: t('exp_blockchain_desc'),
            technologies: ["Solidity", "Node.js", "React", "AWS", "Pinata Cloud", "Hardhat"],
            icon: "eos-icons:blockchain"
        },
        {
            role: t('exp_frontend_role'),
            company: t('exp_frontend_company'),
            period: t('exp_frontend_period'),
            description: t('exp_frontend_desc'),
            technologies: ["React", "Figma", "Styled Components", "Bootstrap"],
            icon: "temaki:accounting"
        },
        {
            role: t('exp_freelancer_role'),
            company: t('exp_freelancer_company'),
            period: t('exp_freelancer_period'),
            description: t('exp_freelancer_desc'),
            technologies: ["React", "React Native", "Styled Components", "i18next", "Axios", "AWS", "Vercel", "Docker", "Git", "Figma", "Jira", "Node.js", "Express"],
            icon: "simple-icons:freelancer"
        }
    ];

    return (
        <Container visible={visible}>
            <Title delay={0.2}>{t('exp_title')}</Title>
            <Paragraph delay={0.4}>
                {t('exp_intro')}
            </Paragraph>

            <ExperiencesSection>
                {experiences.map((exp, index) => (
                    <ExperienceCard key={index} delay={0.6 + (index * 0.2)}>
                        <ExperienceHeader>
                            <IconWrapper>
                                <Icon icon={exp.icon} width="32" height="32" style={{ color: 'var(--textColor)' }} />
                            </IconWrapper>
                            <ExperienceTitle>
                                <Role>{exp.role}</Role>
                                <Company>{exp.company}</Company>
                            </ExperienceTitle>
                            <Period>{exp.period}</Period>
                        </ExperienceHeader>
                        <Description>{exp.description}</Description>
                        <TechStack>
                            {exp.technologies.map((tech) => (
                                <TechBadge key={tech}>{tech}</TechBadge>
                            ))}
                        </TechStack>
                    </ExperienceCard>
                ))}
            </ExperiencesSection>

            <AchievementsSection delay={1.4}>
                <Title>{t('achievements_title')}</Title>
                <AchievementsList>
                    <AchievementItem>
                        <Icon icon="mdi:certificate" width="24" height="24" style={{ color: 'var(--textColor)' }} />
                        <span>{t('achievement_1')}</span>
                    </AchievementItem>
                    <AchievementItem>
                        <Icon icon="mdi:certificate" width="24" height="24" style={{ color: 'var(--textColor)' }} />
                        <span>{t('achievement_2')}</span>
                    </AchievementItem>
                    <AchievementItem>
                        <Icon icon="mdi:certificate" width="24" height="24" style={{ color: 'var(--textColor)' }} />
                        <span>{t('achievement_3')}</span>
                    </AchievementItem>
                </AchievementsList>
            </AchievementsSection>
        </Container>
    )
}

const Container = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    padding-top: 3rem;
    padding-bottom: 2rem;
    padding-right: ${props => props.isMobile ? '1rem' : '30px'};
    padding-left: ${props => props.isMobile ? '1rem' : '2rem'};
    margin-right: 0px;
    max-width: ${props => props.isMobile ? '100%' : '1100px'};
    box-sizing: border-box;
    opacity: ${props => props.visible ? 1 : 0};
    transition: opacity 0.5s ease-out;
    position: ${props => props.isMobile ? 'relative' : (props.visible ? 'relative' : 'absolute')};
    pointer-events: ${props => props.visible ? 'auto' : 'none'};
`;

const Title = styled.h1`
    font-size: 1.55rem;
    font-weight: bolder;
    color: var(--textColor);
    margin-top: -1rem;
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

const ExperiencesSection = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    margin-top: 2rem;
    box-sizing: border-box;
    max-width: 100%;
`;

const ExperienceCard = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;
    padding: 1.5rem;
    border-radius: 8px;
    border: 2px solid var(--textColor);
    opacity: 0.9;
    transition: all 0.3s ease;
    box-sizing: border-box;
    max-width: 100%;
    animation: ${fadeIn} 0.5s ease-out ${props => props.delay || 0}s both;

    &:hover {
        opacity: 1;
        transform: translateY(-4px);
        box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
    }
`;

const ExperienceHeader = styled.div`
    display: flex;
    align-items: flex-start;
    gap: 1rem;
    
    @media (max-width: 768px) {
        flex-direction: column;
        align-items: center;
        text-align: center;
    }
`;

const IconWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    min-width: 48px;
    min-height: 48px;
    border-radius: 8px;
    border: 2px solid var(--textColor);
    opacity: 0.85;
`;

const ExperienceTitle = styled.div`
    display: flex;
    flex-direction: column;
    flex: 1;
    
    @media (max-width: 768px) {
        align-items: center;
        width: 100%;
    }
`;

const Role = styled.h3`
    font-size: 1.2rem;
    font-weight: bold;
    color: var(--textColor);
    margin: 0;
`;

const Company = styled.h4`
    font-size: 1rem;
    font-weight: 800;
    color: var(--textColor);
    opacity: 0.85;
    margin: 0 0 0 0;
`;

const Period = styled.span`
    font-size: 0.9rem;
    font-weight: 800;
    color: var(--textColor);
    opacity: 0.7;
    white-space: nowrap;
    
    @media (max-width: 768px) {
        white-space: normal;
        text-align: center;
    }
`;

const Description = styled.p`
    font-size: 1rem;
    color: var(--textColor);
    font-weight: 800;
    opacity: 0.85;
    margin: 0;
    line-height: 1.6;
`;

const TechStack = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
`;

const TechBadge = styled.span`
    padding: 0.4rem 0.8rem;
    background-color: transparent;
    border: 1px solid var(--textColor);
    color: var(--textColor);
    font-size: 0.85rem;
    font-weight: 800;
    border-radius: 4px;
    opacity: 0.8;
    transition: all 0.2s ease;
    cursor: pointer;

    &:hover {
        opacity: 1;
        transform: scale(1.05);
    }
`;

const AchievementsSection = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;
    margin-top: 3rem;
    animation: ${fadeIn} 0.5s ease-out ${props => props.delay || 0}s both;
`;

const AchievementsList = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;
`;

const AchievementItem = styled.div`
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 1rem;
    border-radius: 6px;
    border: 2px solid var(--textColor);
    opacity: 0.85;
    transition: all 0.3s ease;

    span {
        font-size: 1rem;
        font-weight: 800;
        color: var(--textColor);
    }

    &:hover {
        opacity: 1;
        transform: translateX(8px);
    }
`;
