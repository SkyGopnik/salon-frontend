"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { useSnackbar } from "notistack";
import { useState } from "react";
import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { setToken } from "src/functions/token";

const theme = createTheme();

export default function SignUp() {

  const { enqueueSnackbar } = useSnackbar();
  const router = useRouter();

  const [form, setForm] = useState<{ [key: string]: string }>({
    firstName: "",
    lastName: "",
    email: "",
    password: ""
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget;

    const newForm = { ...form };

    newForm[name] = value;

    setForm(newForm);
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const {
      firstName,
      lastName,
      email,
      password
    } = form;

    if (
      !firstName
      || !lastName
      || !email
      || !password
    ) {
      return;
    }

    if (firstName.length < 3) {
      enqueueSnackbar("Имя не может быть меньше трех символов", {
        variant: "error"
      });
      return;
    }

    if (lastName.length < 3) {
      enqueueSnackbar("Фамилия не может быть меньше трех символов", {
        variant: "error"
      });
      return;
    }

    if (email.length < 3) {
      enqueueSnackbar("Почта не может быть меньше трех символов", {
        variant: "error"
      });
      return;
    }

    if (password.length < 3) {
      enqueueSnackbar("Пароль не может быть меньше трех символов", {
        variant: "error"
      });
      return;
    }

    try {
      const { data } = await axios.post("/auth/register", form);

      setToken(data.token);

      router.push("/admin");
    } catch (e: any) {
      const localization: {
        [key: string]: string
      } = {
        "User already exist": "Пользователь уже существует"
      };

      const { message } = e.response.data;

      console.log(message);
      enqueueSnackbar(localization[message] ? localization[message] : message, {
        variant: "error"
      });
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center"
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Регистрация
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="Имя"
                  autoFocus
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Фамилия"
                  name="lastName"
                  autoComplete="family-name"
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email"
                  name="email"
                  autoComplete="email"
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Пароль"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  onChange={handleInputChange}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Зарегестрироваться
            </Button>
            <Grid container justifyContent="center">
              <Grid item>
                <Link href="/login" variant="body2">
                  Уже есть аккаунт? Войти
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
