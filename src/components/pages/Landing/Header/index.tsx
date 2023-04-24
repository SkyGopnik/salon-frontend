"use client";

import Link from "next/link";
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';

import style from "./index.module.scss";

const pages = ['Главная', 'Услуги', 'Отзывы'];

export default function LandingHeader() {
  return (
    <div className={style.header}>
      <Container className={style.header__in} maxWidth="xl">
        <Typography
          variant="h6"
          noWrap
          component="a"
          href="/"
          sx={{
            fontFamily: 'monospace',
            fontWeight: 700,
            letterSpacing: '.3rem',
            color: 'inherit',
            textDecoration: 'none',
          }}
        >
          LOGO
        </Typography>
        <div className={style.header__menu}>
          {pages.map((page) => (
            <Link href="#" key={page}>
              <Typography variant="body2">
                {page}
              </Typography>
            </Link>
          ))}
        </div>
        <Button variant="outlined">Оставить заявку</Button>
      </Container>
    </div>
    // <AppBar position="static">
    //   <Container maxWidth="xl">
    //     <Toolbar disableGutters>
    //       <Typography
    //         variant="h6"
    //         noWrap
    //         component="a"
    //         href="/"
    //         sx={{
    //           mr: 2,
    //           fontFamily: 'monospace',
    //           fontWeight: 700,
    //           letterSpacing: '.3rem',
    //           color: 'inherit',
    //           textDecoration: 'none',
    //         }}
    //       >
    //         LOGO
    //       </Typography>
    //
    //       <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
    //         {pages.map((page) => (
    //           <Button
    //             key={page}
    //             sx={{ my: 2, color: 'white', display: 'block' }}
    //           >
    //             {page}
    //           </Button>
    //         ))}
    //       </Box>
    //     </Toolbar>
    //   </Container>
    // </AppBar>
  );
}
