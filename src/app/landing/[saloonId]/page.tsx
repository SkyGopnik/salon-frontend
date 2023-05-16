"use client";

import { Snackbar, Alert, Avatar, Card, CardActions, CardContent, Rating, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import axios from "axios";
import { useEffect, useState } from "react";
import * as React from "react";
import CreateRequestModal from "src/modals/CreateRequest";
import { Saloon } from "src/types/saloon";
import { Service } from "src/types/service";

import style from "./page.module.scss";

export default function LandingPage({ params }: {
  params: {
    saloonId: string
  }
}) {
  const [createRequest, setCreateRequest] = useState<{
    isOpen: boolean,
    data?: Service
  }>({
    isOpen: false
  });

  const [saloon, setSaloon] = useState<Saloon>();
  const [showSnackbar, setShowSnackbar] = useState(false);

  useEffect(() => {
    const init = async () => {
      const { data } = await axios.get("/saloons/" + params.saloonId);

      setSaloon(data);
    };

    init().catch((err) => console.log(err));
  }, []);

  const createRequestClose = async (isSuccess?: boolean) => {
    if (isSuccess) {
      setShowSnackbar(true);
    }

    setCreateRequest({
      isOpen: false
    });
  };

  if (!saloon) {
    return null;
  }

  return (
    <div className={style.page}>
      <div className={style.header}>
        <Container maxWidth="xl">
          <div className={style.header__in}>
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="/"
              sx={{
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none"
              }}
            >
              {saloon.name}
            </Typography>
            {/*<div className={style.header__menu}>*/}
            {/*  {pages.map((page) => (*/}
            {/*    <Link href="#" key={page}>*/}
            {/*      <Typography variant="body2">*/}
            {/*        {page}*/}
            {/*      </Typography>*/}
            {/*    </Link>*/}
            {/*  ))}*/}
            {/*</div>*/}
            <Button variant="outlined" onClick={() => setCreateRequest({ isOpen: true })}>Оставить заявку</Button>
          </div>
        </Container>
      </div>
      <Container>
        <div className={style.main}>
          <Typography variant="h5" gutterBottom>
            {saloon.name}
          </Typography>
          <Typography className={style.main__description} variant="body2" gutterBottom>
            {saloon.description}
          </Typography>
          <Button variant="outlined" onClick={() => setCreateRequest({ isOpen: true })}>Оставить заявку</Button>
        </div>
        <div className={style.services}>
          <Typography className={style.title} variant="h4" gutterBottom>
            Услуги
          </Typography>
          <div className={style.services__list}>
            {saloon?.services && saloon.services.map((item) => (
              <Card key={item.id}>
                <CardContent>
                  <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                    {item.subName}
                  </Typography>
                  <Typography variant="h5" component="div">
                    {item.name}
                  </Typography>
                  <Typography sx={{ mb: 1.5 }} color="text.secondary">
                    {item.description}
                  </Typography>
                  <Typography variant="body2">
                    {item.duration} минут
                  </Typography>
                  <Typography variant="subtitle2">
                    {item.price} руб.
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button
                    size="small"
                    onClick={() => setCreateRequest({
                      isOpen: true,
                      data: item
                    })}
                  >
                    Заказать
                  </Button>
                </CardActions>
              </Card>
            ))}
          </div>
        </div>
        <div className={style.reviews}>
          <Typography className={style.title} variant="h4" gutterBottom>
            Отзывы
          </Typography>
          <div className={style.reviews__list}>
            {saloon.reviews?.map((item) => (
              <Card className={style.reviews__item} key={item.id}>
                <CardContent className={style.item__content}>
                  <div className={style.item__info}>
                    <Avatar>{item.firstName.slice(0, 1).toUpperCase()}</Avatar>
                    <Typography variant="body1" gutterBottom>
                      {item.firstName} {item.lastName}
                    </Typography>
                  </div>
                  <Rating value={item.rating} precision={0.5} readOnly />
                  <Typography variant="body2" gutterBottom>
                    {item.description}
                  </Typography>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </Container>
      <CreateRequestModal
        saloonId={params.saloonId}
        services={saloon?.services || []}
        opened={createRequest.isOpen}
        data={createRequest.data}
        onClose={createRequestClose}
      />
      <Snackbar open={showSnackbar} autoHideDuration={6000} onClose={() => setShowSnackbar(false)}>
        <Alert severity="success">Вы успешно записались на услугу, ожидайте звонка от мастера!</Alert>
      </Snackbar>
    </div>
  );
}
