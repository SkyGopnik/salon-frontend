"use client";

import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import CreateServiceModal from "src/modals/CreateService";
import { Service } from "src/types/service";

export default function SaloonServicesPage({ params }: {
  params: {
    saloonId: string
  }
}) {

  const [services, setServices] = useState<Array<Service>>();

  const [createService, setCreateService] = useState<{
    isOpen: boolean,
    data?: Service
  }>({
    isOpen: false
  });

  useEffect(() => {
    fetchServices().catch((err) => console.log(err));
  }, []);

  const fetchServices = async () => {
    const { data } = await axios.get("/services/" + params.saloonId);

    setServices(data);
  };

  const createServiceClose = async () => {
    await fetchServices();

    setCreateService({
      isOpen: false
    });
  };

  const deleteService = async (service: Service) => {
    const result = confirm("Вы уверены что хотитет удалить услугу - " + service.name);

    if (!result) {
      return;
    }

    await axios.delete(`/services/${params.saloonId}/${service.id}`);

    await fetchServices();
  };

  return (
    <>
      <Grid
        container
        direction="row"
        alignItems="center"
        justifyContent="space-between"
      >
        <Typography style={{ padding: "16px 0" }} variant="h6" component="div">
          Список услуг
        </Typography>
        <Button
          variant="contained"
          onClick={() => setCreateService({
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
              <TableCell align="center">Подназвание</TableCell>
              <TableCell align="center">Описание</TableCell>
              <TableCell align="center">Стоимость</TableCell>
              <TableCell align="right">Действия</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {services && services.map((item) => (
              <TableRow
                key={item.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {item.name}
                </TableCell>
                <TableCell align="center">{item.subName ? item.subName : "Отсутствует"}</TableCell>
                <TableCell align="center">{item.description}</TableCell>
                <TableCell align="center">{item.price} руб.</TableCell>
                <TableCell align="right">
                  <Button
                    onClick={() => setCreateService({
                      isOpen: true,
                      data: item
                    })}
                  >
                    Изменить
                  </Button>
                  <Button color="error" onClick={() => deleteService(item)}>Удалить</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <CreateServiceModal
        saloonId={params.saloonId}
        data={createService.data}
        opened={createService.isOpen}
        onClose={createServiceClose}
      />
    </>
  );
}
