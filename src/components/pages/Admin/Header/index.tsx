"use client";

import { useRouter } from "next/navigation";
import * as React from "react";

import { Button } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { deleteToken } from "src/functions/token";

import style from "./index.module.scss";

export default function AdminHeader() {

  const router = useRouter();

  const logout = () => {
    deleteToken();

    router.push("/");
  };

  return (
    <AppBar className={style.header} position="static">
      <Container maxWidth="xl">
        <div className={style.header__in}>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/admin"
            sx={{
              fontFamily: "monospace",
              fontWeight: 700,
              color: "inherit",
              textDecoration: "none"
            }}
          >
            Cалоны красоты
          </Typography>
          <Button
            variant="contained"
            color="error"
            onClick={logout}
          >
            Выйти
          </Button>
        </div>
      </Container>
    </AppBar>
  );
}
