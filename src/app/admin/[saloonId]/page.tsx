"use client";

import { buttonClasses, Tab, tabClasses, TabPanel, Tabs, TabsList } from "@mui/base";
import Container from "@mui/material/Container";
import { styled } from "@mui/system";
import React from "react";

import style from "./page.module.scss";

export default function SaloonIdPage({ params }: {
  params: {
    saloonId: string
  }
}) {
  return (
    <Container className={style.page}>
      <Tabs defaultValue={1}>
        <StyledTabsList>
          <StyledTab value={1}>Главная</StyledTab>
          <StyledTab value={2}>Услуги</StyledTab>
          <StyledTab value={3}>Отзывы</StyledTab>
        </StyledTabsList>
        <StyledTabPanel value={1}>First page</StyledTabPanel>
        <StyledTabPanel value={2}>Second page</StyledTabPanel>
        <StyledTabPanel value={3}>Third page</StyledTabPanel>
      </Tabs>
    </Container>
  );
}

const blue = {
  50: "#F0F7FF",
  100: "#C2E0FF",
  200: "#80BFFF",
  300: "#66B2FF",
  400: "#3399FF",
  500: "#007FFF",
  600: "#0072E5",
  700: "#0059B2",
  800: "#004C99",
  900: "#003A75"
};

const grey = {
  50: "#f6f8fa",
  100: "#eaeef2",
  200: "#d0d7de",
  300: "#afb8c1",
  400: "#8c959f",
  500: "#6e7781",
  600: "#57606a",
  700: "#424a53",
  800: "#32383f",
  900: "#24292f"
};

const StyledTab = styled(Tab)`
  font-family: IBM Plex Sans, sans-serif;
  color: white;
  cursor: pointer;
  font-size: 0.875rem;
  font-weight: bold;
  background-color: transparent;
  width: 100%;
  padding: 12px;
  margin: 6px 6px;
  border: none;
  border-radius: 7px;
  display: flex;
  justify-content: center;

  &:hover {
    background-color: ${blue[400]};
  }

  &:focus {
    color: #fff;
    outline: 3px solid ${blue[200]};
  }

  &.${tabClasses.selected} {
    background-color: #fff;
    color: ${blue[600]};
  }

  &.${buttonClasses.disabled} {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const StyledTabPanel = styled(TabPanel)`
  width: 100%;
  font-family: IBM Plex Sans, sans-serif;
  font-size: 0.875rem;
`;

const StyledTabsList = styled(TabsList)(
  ({ theme }) => `
  min-width: 400px;
  background-color: ${blue[500]};
  border-radius: 12px;
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  align-content: space-between;
  box-shadow: 0px 4px 8px ${theme.palette.mode === "dark" ? grey[900] : grey[200]};
  `
);
