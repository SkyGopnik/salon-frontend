import { Button, Modal } from "@mui/material";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Service } from "src/types/service";

import style from "./index.module.scss";

interface IProps {
  saloonId: string | number,
  data?: Service,
  opened: boolean,
  onClose(): void
}

export default function CreateServiceModal({ saloonId, data, opened, onClose }: IProps) {

  const [form, setForm] = useState({
    name: "",
    subName: "",
    description: "",
    price: ""
  });

  const isEdit = !!data;

  useEffect(() => {
    if (!data) {
      return;
    }

    setForm({
      ...data
    });
  }, [data]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { name, description, price } = form;

    if (!name || !description || !price) {
      return;
    }

    const formData = {
      name,
      subName: form.subName ? form.subName : undefined,
      description,
      price
    };

    if (!isEdit) {
      await axios.post("/services/" + saloonId, formData);
    } else  {
      await axios.put(`/services/${saloonId}/${data.id}`, formData);
    }

    modalClose();
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget;

    const newForm = {
      ...form,
      [name]: value
    };

    setForm(newForm);
  };

  const modalClose = () => {
    setForm({
      name: "",
      subName: "",
      description: "",
      price: ""
    });

    onClose();
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
      onClose={modalClose}
    >
      <Box className={style.modal} component="form" sx={modalStyle} onSubmit={handleSubmit}>
        <Typography variant="h6">
          {isEdit ? "Изменение" : "Создание"} услуги
        </Typography>
        <div className={style.form}>
          <TextField
            label="Название"
            name="name"
            value={form.name}
            variant="standard"
            onChange={handleInputChange}
          />
          <TextField
            label="Подназвание"
            name="subName"
            value={form.subName}
            variant="standard"
            onChange={handleInputChange}
          />
          <TextField
            name="description"
            label="Описание"
            variant="standard"
            value={form.description}
            onChange={handleInputChange}
          />
          <TextField
            name="price"
            type="number"
            label="Стоимость"
            variant="standard"
            value={form.price}
            onChange={handleInputChange}
          />
        </div>
        <Button
          className={style.action}
          type="submit"
          variant="contained"
        >
          {isEdit ? "Изменить" : "Создать"}
        </Button>
      </Box>
    </Modal>
  );
}
