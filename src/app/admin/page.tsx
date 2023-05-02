"use client";

import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import Container from "@mui/material/Container";
import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import CreateSaloonModel from "src/modals/CreateSaloon";
import { Saloon } from "src/types/saloon";

import style from "./page.module.scss";

export default function AdminMain() {

  const router = useRouter();

  const [saloons, setSaloons] = useState<Array<Saloon>>();

  const [createSaloon, setCreateSaloon] = useState<{
    isOpen: boolean,
    data?: Saloon
  }>({
    isOpen: false
  });

  useEffect(() => {
    fetchSaloons().catch((err) => console.log(err));
  }, []);

  const fetchSaloons = async () => {
    const { data } = await axios.get("/saloons");

    setSaloons(data);
  };

  const createSaloonClose = async () => {
    await fetchSaloons();

    setCreateSaloon({
      isOpen: false
    });
  };

  const deleteSaloon = async (saloon: Saloon) => {
    const result = confirm("Вы уверены что хотитет удалить салон - " + saloon.name);

    if (!result) {
      return;
    }

    await axios.delete("/saloons/" + saloon.id);

    await fetchSaloons();
  };

  return (
    <>
      <Container className={style.page}>
        <Grid
          container
          direction="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <Typography style={{ padding: "16px 0" }} variant="h6" component="div">
            Список салонов
          </Typography>
          <Button
            variant="contained"
            onClick={() => setCreateSaloon({
              isOpen: true
            })}
          >
            Создать
          </Button>
        </Grid>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Название</TableCell>
                <TableCell align="center">Описание</TableCell>
                <TableCell align="right">Действия</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {saloons && saloons.map((item) => (
                <TableRow
                  key={item.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {item.name}
                  </TableCell>
                  <TableCell align="center">{item.description}</TableCell>
                  <TableCell align="right">
                    <Button color="success" onClick={() => router.push("/landing/" + item.id)}>Магазин</Button>
                    <Button color="success" onClick={() => router.push("/admin/" + item.id)}>Настройки</Button>
                    <Button
                      onClick={() => setCreateSaloon({
                        isOpen: true,
                        data: item
                      })}
                    >
                      Изменить
                    </Button>
                    <Button color="error" onClick={() => deleteSaloon(item)}>Удалить</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
      <CreateSaloonModel
        data={createSaloon.data}
        opened={createSaloon.isOpen}
        onClose={createSaloonClose}
      />
    </>
  );
}
