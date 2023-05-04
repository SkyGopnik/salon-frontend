"use client";

import Box from "@mui/material/Box";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { ReactNode } from "react";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import Container from "@mui/material/Container";

import style from "./layout.module.scss";

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`
  };
}

export default function SaloonIdLayout({
  children,
  params
}: {
  children: ReactNode,
  params: {
    saloonId: string
  }
}) {
  const menuItems = [
    {
      name: "Главная",
      url: "/"
    },
    {
      name: "Услуги",
      url: "/services"
    },
    {
      name: "Отзывы",
      url: "/reviews"
    }
  ];

  return (
    <Container className={style.page}>
      <ButtonGroup variant="contained" aria-label="outlined primary button group">
        {menuItems.map((item) => (
          <Button key={item.name}>
            <Link href={`/admin/${params.saloonId}/${item.url}`}>
              {item.name}
            </Link>
          </Button>
        ))}
      </ButtonGroup>
      {children}
    </Container>
  );
}
