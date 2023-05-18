import { Button, Modal } from "@mui/material";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import axios from "axios";
import { useSnackbar } from "notistack";
import React, { useEffect, useState } from "react";
import { Saloon } from "src/types/saloon";

import style from "./index.module.scss";

interface IProps {
  data?: Saloon,
  opened: boolean,
  onClose(): void
}
export default function CreateSaloonModal({ data, opened, onClose }: IProps) {

  const { enqueueSnackbar } = useSnackbar();
  const [form, setForm] = useState({
    name: "",
    description: ""
  });

  const isEdit = !!data;

  useEffect(() => {
    if (!data) {
      return;
    }

    setForm({
      name: data.name,
      description: data.description
    });
  }, [data]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { name, description } = form;

    if (!name || !description) {
      return;
    }

    if (name.length < 3) {
      enqueueSnackbar("Название не может быть меньше трех символов", {
        variant: "error"
      });
      return;
    }

    if (description.length < 3) {
      enqueueSnackbar("Описание не может быть меньше трех символов", {
        variant: "error"
      });
      return;
    }

    try {
      if (!isEdit) {
        await axios.post("/saloons", {
          name,
          description
        });
      } else  {
        await axios.put("/saloons/" + data.id, {
          name,
          description
        });
      }
    } catch (e: any) {
      const { message } = e.response.data;

      console.log(message);
      enqueueSnackbar(message, {
        variant: "error"
      });
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
      description: ""
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
