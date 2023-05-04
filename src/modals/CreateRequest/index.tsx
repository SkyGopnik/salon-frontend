import { Button, FormControl, InputLabel, MenuItem, Modal, Select } from "@mui/material";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import axios from "axios";
import React, { useEffect, useState } from "react";
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

  const [form, setForm] = useState<{
    firstName: string,
    lastName: string,
    phone: string,
    serviceId: string
  }>({
    firstName: "",
    lastName: "",
    phone: "",
    serviceId: ""
  });

  useEffect(() => {
    console.log(data);
    if (!data) {
      return;
    }

    setForm({
      ...form,
      serviceId: data.id ? String( data.id) : ""
    });
  }, [data]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { firstName, lastName, phone, serviceId } = form;

    if (!firstName || !lastName || !phone || !serviceId) {
      return;
    }

    const formData = {
      firstName,
      lastName,
      phone,
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
      serviceId: ""
    });

    onClose(isSuccess);
  };

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
