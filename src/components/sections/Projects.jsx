import styled, { keyframes } from "styled-components";
import { Icon } from "@iconify/react";
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import P1 from '../../assets/projects/posterfy_1.png'
import P2 from '../../assets/projects/posterfy_2.png'
import P3 from '../../assets/projects/posterfy_3.png'
import MM1 from '../../assets/projects/mm_1.png'
import MM2 from '../../assets/projects/mm_2.png'
import MM3 from '../../assets/projects/mm_3.png'
import O1 from '../../assets/projects/oratio_1.png'
import O2 from '../../assets/projects/oratio_2.png'
import O3 from '../../assets/projects/oratio_3.png'
import O4 from '../../assets/projects/oratio_4.png'
import O5 from '../../assets/projects/oratio_5.png'
import SB from '../../assets/projects/simple_blockchain.png'
import SV from '../../assets/projects/sv.png'
import MovieMetricks from "../icons/MovieMetricks"
import Oratio from "../icons/Oratio"
import SyncVerse from "../icons/SyncVerse"
import Posterfy from "../icons/Posterfy"

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

const imageFade = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

export default function Projects({ visible }) {
    const { t } = useTranslation();
    const [activeImageIndex, setActiveImageIndex] = useState({});
    const [isTransitioning, setIsTransitioning] = useState({});
    const [imageLoaded, setImageLoaded] = useState({});
    const [touchStart, setTouchStart] = useState({});
    const [touchEnd, setTouchEnd] = useState({});

    const preloadImage = (src) => {
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.onload = () => resolve(src);
            img.onerror = reject;
            img.src = src;
        });
    };

    const projects = [
        {
            name: "Posterfy",
            icon: Posterfy,
            description: t('project_posterfy_desc'),
            highlight: t('project_posterfy_highlight'),
            images: [
                P2,
                P1,
                P3
            ],
            technologies: ["React", "Node.js", "MongoDB", "Stripe", "Redux", "Styled Components", "Express"],
            github: "https://github.com/avictormorais/posterfy",
            deploy: "https://posterfy.space"
        },
        {
            name: "Oratio",
            icon: Oratio,
            description: t('project_oratio_desc'),
            highlight: t('project_oratio_highlight'),
            images: [
                O1,
                O2,
                O3,
                O4,
                O5
            ],
            technologies: ["React", "React Native", "Electron", "Express", "Node.js", "WebSocket", "Expo"],
            github: "https://github.com/avictormorais/Oratio",
            deploy: "https://useoratio.vercel.app/"
        },
        {
            name: "MovieMetricks",
            icon: MovieMetricks,
            description: t('project_moviemetricks_desc'),
            highlight: t('project_moviemetricks_highlight'),
            images: [
                MM1,
                MM2,
                MM3
            ],
            technologies: ["React", "Flask", "MongoDB", "Git", "Vercel"],
            github: "https://github.com/avictormorais/moviemetricks",
            deploy: "https://moviemetricks.vercel.app/"
        },
        {
            name: "SyncVerse",
            icon: SyncVerse,
            description: t('project_syncverse_desc'),
            highlight: t('project_syncverse_highlight'),
            images: [
                SV
            ],
            technologies: ["JavaScript", "Fetch API"],
            github: "https://github.com/avictormorais/syncVerse",
            deploy: null
        },
        {
            name: "Simple Blockchain",
            icon: "icon-park-solid:blockchain",
            description: t('project_simpleblockchain_desc'),
            highlight: t('project_simpleblockchain_highlight'),
            images: [
                SB
            ],
            technologies: ["JavaScript", "Git"],
            github: "https://github.com/avictormorais/simpleBlockchain",
            deploy: null
        }
    ];

    const handlePrevImage = (projectIndex) => {
        const currentIndex = activeImageIndex[projectIndex] || 0;
        const newIndex = currentIndex === 0 ? projects[projectIndex].images.length - 1 : currentIndex - 1;
        const nextImageSrc = projects[projectIndex].images[newIndex];

        setIsTransitioning(prev => ({ ...prev, [projectIndex]: true }));
        setImageLoaded(prev => ({ ...prev, [projectIndex]: false }));
        
        preloadImage(nextImageSrc).then(() => {
            setTimeout(() => {
                setActiveImageIndex(prev => ({ ...prev, [projectIndex]: newIndex }));
                setImageLoaded(prev => ({ ...prev, [projectIndex]: true }));
                setTimeout(() => {
                    setIsTransitioning(prev => ({ ...prev, [projectIndex]: false }));
                }, 50);
            }, 200);
        });
    };

    const handleNextImage = (projectIndex) => {
        const currentIndex = activeImageIndex[projectIndex] || 0;
        const newIndex = currentIndex === projects[projectIndex].images.length - 1 ? 0 : currentIndex + 1;
        const nextImageSrc = projects[projectIndex].images[newIndex];

        setIsTransitioning(prev => ({ ...prev, [projectIndex]: true }));
        setImageLoaded(prev => ({ ...prev, [projectIndex]: false }));
        
        preloadImage(nextImageSrc).then(() => {
            setTimeout(() => {
                setActiveImageIndex(prev => ({ ...prev, [projectIndex]: newIndex }));
                setImageLoaded(prev => ({ ...prev, [projectIndex]: true }));
                setTimeout(() => {
                    setIsTransitioning(prev => ({ ...prev, [projectIndex]: false }));
                }, 50);
            }, 200);
        });
    };

    const handleTouchStart = (e, projectIndex) => {
        setTouchEnd({ ...touchEnd, [projectIndex]: null });
        setTouchStart({ ...touchStart, [projectIndex]: e.targetTouches[0].clientX });
    };

    const handleTouchMove = (e, projectIndex) => {
        setTouchEnd({ ...touchEnd, [projectIndex]: e.targetTouches[0].clientX });
    };

    const handleTouchEnd = (projectIndex) => {
        if (!touchStart[projectIndex] || !touchEnd[projectIndex]) return;
        
        const distance = touchStart[projectIndex] - touchEnd[projectIndex];
        const isLeftSwipe = distance > 50;
        const isRightSwipe = distance < -50;

        if (isLeftSwipe) {
            handleNextImage(projectIndex);
        }
        if (isRightSwipe) {
            handlePrevImage(projectIndex);
        }
    };

    return (
        <Container visible={visible}>
            <Title delay={0.2}>{t('projects_title')}</Title>
            <Paragraph delay={0.4}>
                {t('projects_intro')}
            </Paragraph>

            <ProjectsSection>
                {projects.map((project, index) => (
                    <ProjectCard key={index} delay={0.6 + (index * 0.2)}>
                        <ProjectHeader>
                            {typeof project.icon === 'string' ? (
                                <Icon icon={project.icon} width="64" height="64" style={{ color: 'var(--textColor)' }} />
                            ) : (
                                <project.icon width="64" height="64" fill="var(--textColor)"/>
                            )}
                            <ProjectName>{project.name}</ProjectName>
                        </ProjectHeader>

                        <Description>{project.description}</Description>

                        {project.images && project.images.length > 0 && (
                            <>
                                <ImageSlider>
                                    <ImageContainer
                                        onTouchStart={(e) => handleTouchStart(e, index)}
                                        onTouchMove={(e) => handleTouchMove(e, index)}
                                        onTouchEnd={() => handleTouchEnd(index)}
                                    >
                                        <ProjectImage 
                                            src={project.images[activeImageIndex[index] || 0]} 
                                            alt={`${project.name} screenshot`}
                                            transitioning={isTransitioning[index]}
                                            loaded={imageLoaded[index] !== false}
                                        />
                                        {project.images.length > 1 && (
                                            <>
                                                <SliderButton onClick={() => handlePrevImage(index)} position="left">
                                                    <Icon icon="mdi:chevron-left" width="24" height="24" />
                                                </SliderButton>
                                                <SliderButton onClick={() => handleNextImage(index)} position="right">
                                                    <Icon icon="mdi:chevron-right" width="24" height="24" />
                                                </SliderButton>
                                            </>
                                        )}
                                    </ImageContainer>
                                    {project.images.length > 1 && (
                                        <ImageIndicators>
                                            {project.images.map((_, imgIndex) => (
                                                <Indicator 
                                                    key={imgIndex} 
                                                    active={imgIndex === (activeImageIndex[index] || 0)}
                                                    onClick={() => {
                                                        if (imgIndex === (activeImageIndex[index] || 0)) return;
                                                        
                                                        const nextImageSrc = project.images[imgIndex];
                                                        setIsTransitioning(prev => ({ ...prev, [index]: true }));
                                                        setImageLoaded(prev => ({ ...prev, [index]: false }));
                                                        
                                                        preloadImage(nextImageSrc).then(() => {
                                                            setTimeout(() => {
                                                                setActiveImageIndex(prev => ({ ...prev, [index]: imgIndex }));
                                                                setImageLoaded(prev => ({ ...prev, [index]: true }));
                                                                setTimeout(() => {
                                                                    setIsTransitioning(prev => ({ ...prev, [index]: false }));
                                                                }, 50);
                                                            }, 200);
                                                        });
                                                    }}
                                                />
                                            ))}
                                        </ImageIndicators>
                                    )}
                                </ImageSlider>

                                <ProjectHighlight>{project.highlight}</ProjectHighlight>
                            </>
                        )}

                        <TechStack>
                            {project.technologies.map((tech) => (
                                <TechBadge key={tech}>{tech}</TechBadge>
                            ))}
                        </TechStack>

                        <ProjectLinks>
                            <ProjectButton href={project.github} target="_blank" rel="noopener noreferrer">
                                <Icon icon="mdi:github" width="20" height="20" color="currentColor" />
                                <span>{t('btn_github')}</span>
                            </ProjectButton>
                            {project.deploy && (
                                <ProjectButton href={project.deploy} target="_blank" rel="noopener noreferrer">
                                    <Icon icon="bitcoin-icons:rocket-filled" width="20" height="20" color="currentColor" />
                                    <span>{t('btn_deploy')}</span>
                                </ProjectButton>
                            )}
                        </ProjectLinks>
                    </ProjectCard>
                ))}
            </ProjectsSection>
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

const ProjectsSection = styled.div`
    display: flex;
    flex-direction: column;
    gap: 2rem;
    margin-top: 2rem;
    margin-bottom: 4rem;
    box-sizing: border-box;
    max-width: 100%;
`;

const ProjectCard = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    animation: ${fadeIn} 0.5s ease-out ${props => props.delay || 0}s both;
    padding-bottom: 2rem;
    border-bottom: 1px solid var(--textColor);
    opacity: 0.2;
    box-sizing: border-box;
    max-width: 100%;

    &:last-child {
        border-bottom: none;
        padding-bottom: 0;
    }
`;

const ProjectHeader = styled.div`
    display: flex;
    align-items: center;
    gap: 1rem;
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

const ProjectName = styled.h3`
    font-size: 1.5rem;
    font-weight: bolder;
    color: var(--textColor);
    margin: 0;
`;

const Description = styled.p`
    font-size: 1rem;
    color: var(--textColor);
    font-weight: 800;
    opacity: 0.85;
    margin: 0;
    line-height: 1.6;
`;

const ImageSlider = styled.div`
    position: relative;
    width: 100%;
`;

const ProjectHighlight = styled.p`
    font-size: 0.95rem;
    color: var(--textColor);
    font-weight: 700;
    opacity: 0.75;
    margin: 1rem 0 0 0;
    line-height: 1.5;
    font-style: italic;
`;

const ImageContainer = styled.div`
    position: relative;
    width: 100%;
    border-radius: 8px;
    overflow: hidden;
    aspect-ratio: 16 / 9;
    touch-action: pan-y;
    user-select: none;

    &:hover button {
        opacity: 0.7;
    }
`;

const ProjectImage = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
    opacity: ${props => props.transitioning || !props.loaded ? 0 : 1};
    transition: opacity 0.2s ease-in-out;
`;

const SliderButton = styled.button`
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    ${props => props.position === 'left' ? 'left: 1rem;' : 'right: 1rem;'}
    background-color: var(--backgroundColor);
    border: 2px solid var(--textColor);
    color: var(--textColor);
    width: 40px;
    height: 40px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    opacity: 0;
    transition: all 0.3s ease;
    z-index: 2;

    &:hover {
        opacity: 1 !important;
        transform: translateY(-50%) scale(1.1);
    }

    &:active {
        transform: translateY(-50%) scale(0.95);
    }
`;

const ImageIndicators = styled.div`
    display: flex;
    gap: 0.5rem;
    justify-content: center;
    margin-top: 0.75rem;
`;

const Indicator = styled.div`
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background-color: var(--textColor);
    opacity: ${props => props.active ? 0.9 : 0.3};
    cursor: pointer;
    transition: all 0.3s ease;

    &:hover {
        opacity: 0.7;
        transform: scale(1.2);
    }
`;

const TechStack = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    margin-top: 0;
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

    &:hover {
        opacity: 1;
        transform: scale(1.05);
    }
`;

const ProjectLinks = styled.div`
    display: flex;
    gap: 1rem;
    margin-top: 0.5rem;
`;

const ProjectButton = styled.a`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    padding: 0.35rem 1.5rem;
    border-radius: 18px;
    background-color: var(--backgroundColor);
    border: 2px solid var(--textColor);
    color: var(--textColor);
    font-size: 1rem;
    font-weight: 800;
    cursor: pointer;
    transition: all 0.3s ease;
    text-decoration: none;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);

    svg {
        color: var(--backgroundColor);
        fill: var(--backgroundColor);
        transition: color 0.3s ease, fill 0.3s ease;
    }

    span {
        color: var(--textColor);
        transition: color 0.3s ease;
    }

    &:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
    }

    &:active {
        transform: translateY(0px);
        box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
    }
`;
