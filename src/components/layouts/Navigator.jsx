import React from "react";
import styled from "styled-components";
import { FaLaptopCode, FaUser, FaAddressCard, FaCode, FaBriefcase } from "react-icons/fa";
import { useTranslation } from 'react-i18next';

const StyledNavigator = styled.nav`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
  position: fixed;
  left: calc(var(--padding-inline-layout) / 2);
  background-color: var(--secondary-color);
  padding-inline: 10px;
  border-radius: 50px;
  padding-block: 5px;

  @media screen and (max-width: 900px) {
    display: none;
  }

  @media screen and (max-width: 700px) {
    display: flex;
    flex-direction: row;
    bottom: 0;
    right: 0;
    left: 0;
    border-radius: 0;
  }
`;

const StyledItem = styled.div`
  display: flex;
  background-color: var(--primary-color);
  padding: 10px;
  border-radius: 100%;
  margin-block: 8px;
  font-size: 1.3em;
  position: relative;
  justify-content: center;
  align-content: center;

  &:hover{
    cursor: pointer;
    border-radius: 10px;
  }
  &:hover .tooltip {
    visibility: visible;
    opacity: 1;
  }

  @media screen and (max-width: 700px) {
    background-color: transparent;
    margin-bottom: 15px;
    margin-top: 0;
    margin-inline: 0;
    width: 100%;

    &:hover{
      background-color: transparent;
    }
  }
`;

const Tooltip = styled.span`
  position: absolute;
  text-align: right;
  left: 65px;
  top: 50%;
  transform: translateY(-50%);
  background-color: var(--secondary-color);
  color: var(--primary-text-color);
  padding: 8px;
  border-radius: 5px;
  font-size: 0.65em;
  padding-inline: 5px;
  font-weight: normal;
  visibility: hidden;
  opacity: 0;
  transition: visibility 0s, opacity 0.3s linear;
  white-space: nowrap;

  @media screen and (max-width: 700px) {
    opacity: 1;
    padding-inline: 0;
    right: 0;
    left: 0;
    top: 110%;
    font-size: .5em;
    visibility: visible;
    background-color: transparent;
    margin: 0;
    text-align: center;
    justify-content: center;
    align-items: center;
  }
`;

const StyledTooltipText = styled.p`
  margin-inline: 10px;
  font-family: var(--content-font);
  font-weight: 600;
  
  @media screen and (max-width: 700px) {
    margin: 0;
    text-align: center;
    width: 100%;
  }
`

const StyledDivNavigator = styled.div`
  display: flex;
  height: 100vh;
  position: fixed;
  top: 0;
  justify-content: center;
  align-items: center;
`;

function Navigator() {
  const { t } = useTranslation();

  const handleScrollToSection = (id) => {
    const section = document.getElementById(id);
    section.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <StyledDivNavigator>
    <StyledNavigator>
      <StyledItem onClick={() => handleScrollToSection("aboutMeSection")}>
        <FaUser />
        <Tooltip className="tooltip"><StyledTooltipText>{t('label-about-me')}</StyledTooltipText></Tooltip>
      </StyledItem>
      <StyledItem onClick={() => handleScrollToSection("skillsSection")}>
        <FaCode />
        <Tooltip className="tooltip"><StyledTooltipText>{t('label-skills')}</StyledTooltipText></Tooltip>
      </StyledItem>
      <StyledItem onClick={() => handleScrollToSection("experiencesSection")}>
        <FaBriefcase />
        <Tooltip className="tooltip"><StyledTooltipText>{t('label-experiences')}</StyledTooltipText></Tooltip>
      </StyledItem>
      <StyledItem onClick={() => handleScrollToSection("projectsSection")}>
        <FaLaptopCode />
        <Tooltip className="tooltip"><StyledTooltipText>{t('label-projects')}</StyledTooltipText></Tooltip>
      </StyledItem>
      <StyledItem onClick={() => handleScrollToSection("contactSection")}>
        <FaAddressCard />
        <Tooltip className="tooltip"><StyledTooltipText>{t('label-contact')}</StyledTooltipText></Tooltip>
      </StyledItem>
    </StyledNavigator>
    </StyledDivNavigator>
  );
}

export default Navigator;