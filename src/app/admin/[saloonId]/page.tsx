"use client";

import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import axios from "axios";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { RequestI } from "src/types/request";

export default function SaloonMainPage({ params }: {
  params: {
    saloonId: string
  }
}) {
  const [requests, setRequests] = useState<Array<RequestI>>();

  useEffect(() => {
    fetchRequests().catch((err) => console.log(err));
  }, []);

  const fetchRequests = async () => {
    const { data } = await axios.get("/requests/" + params.saloonId);

    setRequests(data);
  };

  const deleteRequest = async (request: RequestI) => {
    const result = confirm(`Вы уверены что хотитет удалить услугу от ${request.firstName} ${request.lastName}`);

    if (!result) {
      return;
    }

    await axios.delete(`/requests/${params.saloonId}/${request.id}`);

    await fetchRequests();
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
          Список заявок
        </Typography>
      </Grid>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>ФИ</TableCell>
              <TableCell align="center">Номер телефона</TableCell>
              <TableCell align="center">Услуга</TableCell>
              <TableCell align="center">Время</TableCell>
              <TableCell align="right">Действия</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {requests && requests.map((item) => (
              <TableRow
                key={item.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {item.firstName} {item.lastName}
                </TableCell>
                <TableCell align="center">{item.phone}</TableCell>
                <TableCell align="center">
                  {item.service && (
                    <>
                      {item.service.name} - {item.service.price} руб.
                    </>
                  )}
                </TableCell>
                <TableCell align="center"><b>{moment(item.time).format("HH:mm")}</b> {moment(item.time).format("DD.MM.YYYY")}</TableCell>
                <TableCell align="right">
                  <Button color="error" onClick={() => deleteRequest(item)}>Удалить</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
