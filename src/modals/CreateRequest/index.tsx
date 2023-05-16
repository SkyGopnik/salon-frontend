import { useMenu } from "@mui/base";
import { Button, FormControl, InputLabel, MenuItem, Modal, Select } from "@mui/material";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import axios from "axios";
import moment from "moment";
import React, { useEffect, useMemo, useState } from "react";
import { Service } from "src/types/service";

import style from "./index.module.scss";

interface IProps {
  saloonId: string | number,
  services: Array<Service>,
  data?: Service,
  opened: boolean,
  onClose(isSuccess?: boolean): void
}

export default function CreateRequestModal({ saloonId, data, opened, services, onClose }: IProps) {

  const [busyTime, setBusyTime] = useState<Array<{
    time: string,
    service: Service
  }>>();

  const [form, setForm] = useState<{
    firstName: string,
    lastName: string,
    phone: string,
    time: string,
    serviceId: string
  }>({
    firstName: "",
    lastName: "",
    phone: "",
    time: "",
    serviceId: ""
  });

  useEffect(() => {
    if (!data) {
      return;
    }

    fetchTimes().catch((err) => console.log(err));

    setForm({
      ...form,
      serviceId: data.id ? String( data.id) : ""
    });
  }, [data]);

  const fetchTimes = async () => {
    const requestTime = await axios.get(`/requests/time/${saloonId}`);

    setBusyTime(requestTime.data);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { firstName, lastName, phone, serviceId, time } = form;

    if (!firstName || !lastName || !phone || !serviceId || !time) {
      return;
    }

    const formData = {
      firstName,
      lastName,
      phone,
      time,
      serviceId
    };

    await axios.post("/requests/" + saloonId, formData);

    modalClose(true);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget;

    const newForm = {
      ...form,
      [name]: value
    };

    setForm(newForm);
  };

  const modalClose = (isSuccess?: boolean) => {
    setForm({
      firstName: "",
      lastName: "",
      phone: "",
      time: "",
      serviceId: ""
    });

    onClose(isSuccess);
  };

  const validRequestTime = useMemo(() => {
    const times = [];

    for (let i = 0; i < 7; i++) {
      for (let j = 0; j < 18; j++) {
        const tempTime = moment().startOf("day").add(i, "days").add(9, "hours").add(30 * j, "minutes");

        let insert = true;

        busyTime?.forEach((item) => {
          const startDay = moment(item.time).startOf("day");
          const endDay = moment(item.time).endOf("day");

          if (!tempTime.isBetween(startDay, endDay)) {
            return;
          }

          const duration = tempTime.diff(moment(item.time).add(item.service.duration, "minutes"));

          if (duration < 0) {
            insert = false;
          }
        });

        if (insert) {
          times.push(tempTime.format("HH:mm DD.MM"));
        }
      }
    }

    return times;
  }, [opened, busyTime]);

  const modalStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    bgcolor: "background.paper",
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3
  };

  return (
    <Modal
      open={opened}
      onClose={() => modalClose(false)}
    >
      <Box className={style.modal} component="form" sx={modalStyle} onSubmit={handleSubmit}>
        <Typography variant="h6">
          Оставление заявки
        </Typography>
        <div className={style.form}>
          <TextField
            label="Имя"
            name="firstName"
            value={form.firstName}
            variant="standard"
            onChange={handleInputChange}
          />
          <TextField
            label="Фамилия"
            name="lastName"
            value={form.lastName}
            variant="standard"
            onChange={handleInputChange}
          />
          <TextField
            name="phone"
            label="Номер телефона"
            variant="standard"
            value={form.phone}
            onChange={handleInputChange}
          />
          <br />
          <FormControl fullWidth>
            <InputLabel id="service-select-label">Услуга</InputLabel>
            <Select
              labelId="service-select-label"
              value={form.serviceId}
              label="Услуга"
              onChange={(e) => setForm({
                ...form,
                serviceId: e.target.value as string
              })}
            >
              {services.map((item) => (
                <MenuItem key={item.id} value={item.id}>
                  {item.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth>
            <InputLabel id="time-select-label">Время</InputLabel>
            <Select
              labelId="time-select-label"
              value={form.time}
              label="Время"
              onChange={(e) => {
                fetchTimes().catch((err) => console.log(err));

                setForm({
                  ...form,
                  time: e.target.value as string
                });
              }}
            >
              {validRequestTime.map((time) => (
                <MenuItem key={time} value={time}>
                  {time}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
        <Button
          className={style.action}
          type="submit"
          variant="contained"
        >
          Оставить
        </Button>
      </Box>
    </Modal>
  );
}
