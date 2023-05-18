import { Button, Modal, Rating } from "@mui/material";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import axios from "axios";
import { useSnackbar } from "notistack";
import React, { useEffect, useState } from "react";
import { Review } from "src/types/review";

import style from "./index.module.scss";

interface IProps {
  saloonId: string | number,
  data?: Review,
  opened: boolean,
  onClose(): void
}

export default function CreateReviewModal({ saloonId, data, opened, onClose }: IProps) {

  const { enqueueSnackbar } = useSnackbar();
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    rating: 0,
    description: ""
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

    const { firstName, lastName, rating, description } = form;

    if (!firstName) {
      enqueueSnackbar("Имя должно быть заполнена", {
        variant: "error"
      });
      return;
    }

    if (!lastName) {
      enqueueSnackbar("Фамилия должно быть заполнена", {
        variant: "error"
      });
      return;
    }

    if (!description) {
      enqueueSnackbar("Описание должно быть заполнена", {
        variant: "error"
      });
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

    if (description.length < 3) {
      enqueueSnackbar("Описание не может быть меньше трех символов", {
        variant: "error"
      });
      return;
    }

    const formData = {
      firstName,
      lastName,
      rating,
      description
    };

    if (!isEdit) {
      await axios.post("/reviews/" + saloonId, formData);
    } else  {
      await axios.put(`/reviews/${saloonId}/${data.id}`, formData);
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
      firstName: "",
      lastName: "",
      rating: 0,
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
          {isEdit ? "Изменение" : "Создание"} отзыва
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
            name="description"
            label="Описание"
            variant="standard"
            value={form.description}
            onChange={handleInputChange}
          />
          <Rating
            name="simple-controlled"
            value={form.rating}
            precision={0.5}
            onChange={(_, value) => setForm({
              ...form,
              rating: value || 0
            })}
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
