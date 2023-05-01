import { Modal } from "@mui/base";
import { Button } from "@mui/material";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import React, { useState } from "react";
import { Saloon } from "src/types/saloon";

import style from "./index.module.scss";

interface IProps {
  data?: Saloon,
  opened: boolean,
  onClose(): void
}
export default function CreateSaloonModel({ data, opened, onClose }: IProps) {

  const [form, setForm] = useState({
    name: "",
    description: ""
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget;

    const newForm = {
      ...form,
      [name]: value
    };

    setForm(newForm);
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

  const isEdit = !!data;

  return (
    <Modal
      open={opened}
      onClose={onClose}
    >
      <Box className={style.modal} component="form" sx={modalStyle} onSubmit={handleSubmit}>
        <Typography variant="h6">
          {isEdit ? "Изменение" : "Создание"} салона
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
            name="description"
            label="Описание"
            variant="standard"
            value={form.description}
            onChange={handleInputChange}
          />
        </div>
        <Button className={style.action} variant="contained">
          {isEdit ? "Изменить" : "Создать"}
        </Button>
      </Box>
    </Modal>
  );
}
