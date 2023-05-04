"use client";

import { Box, Tab, Tabs } from "@mui/material";
import Container from "@mui/material/Container";
import React, { ReactNode } from "react";

import style from "./layout.module.scss";

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function SaloonIdLayout({
  children
}: {
  children: ReactNode
}) {
  return (
    <Container className={style.page}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={0} aria-label="basic tabs example">
          <Tab label="Главная" {...a11yProps(0)} />
          <Tab label="Услуги" {...a11yProps(1)} />
          <Tab label="Отзывы" {...a11yProps(2)} />
        </Tabs>
      </Box>
      {children}
    </Container>
  );
}
