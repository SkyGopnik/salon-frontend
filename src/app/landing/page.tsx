"use client";

import { Avatar, Card, CardActions, CardContent, Rating, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import * as React from "react";

import style from "./page.module.scss";

const card = (
  <React.Fragment>
    <CardContent>
      <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
        Word of the Day
      </Typography>
      <Typography variant="h5" component="div">
        tst
      </Typography>
      <Typography sx={{ mb: 1.5 }} color="text.secondary">
        adjective
      </Typography>
      <Typography variant="body2">
        well meaning and kindly.
        <br />
        {'"a benevolent smile"'}
      </Typography>
    </CardContent>
    <CardActions>
      <Button size="small">Заказать</Button>
    </CardActions>
  </React.Fragment>
);

export default function LandingPage() {
  return (
    <Container>
      <div className={style.main}>
        <Typography variant="h5" gutterBottom>
          h5. Heading
        </Typography>
        <Typography className={style.main__description} variant="body2" gutterBottom>
          body2. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos
          blanditiis tenetur unde suscipit, quam beatae rerum inventore consectetur,
          neque doloribus, cupiditate numquam dignissimos laborum fugiat deleniti? Eum
          quasi quidem quibusdam.
        </Typography>
        <Button variant="outlined">Оставить заявку</Button>
      </div>
      <div className={style.services}>
        <Typography className={style.title} variant="h4" gutterBottom>
          Услуги
        </Typography>
        <div className={style.services__list}>
          <Card>{card}</Card>
          <Card>{card}</Card>
          <Card>{card}</Card>
          <Card>{card}</Card>
          <Card>{card}</Card>
          <Card>{card}</Card>
          <Card>{card}</Card>
          <Card>{card}</Card>
        </div>
      </div>
      <div className={style.reviews}>
        <Typography className={style.title} variant="h4" gutterBottom>
          Отзывы
        </Typography>
        <div className={style.reviews__list}>
          <Card className={style.reviews__item}>
            <CardContent className={style.item__content}>
              <div className={style.item__info}>
                <Avatar alt="Remy Sharp" src="https://mui.com/static/images/avatar/1.jpg" />
                <Typography variant="body1" gutterBottom>
                  Username username
                </Typography>
              </div>
              <Rating name="read-only" value={5} readOnly />
              <Typography variant="body2" gutterBottom>
                Vse otlichno Vse otlichno Vse otlichno Vse otlichno Vse otlichno Vse otlichno Vse otlichno Vse otlichno
              </Typography>
              <Typography variant="subtitle2" gutterBottom>
                28 фев. 2023г.
              </Typography>
            </CardContent>
          </Card>
          <Card className={style.reviews__item}>
            <CardContent className={style.item__content}>
              <div className={style.item__info}>
                <Avatar alt="Remy Sharp" src="https://mui.com/static/images/avatar/1.jpg" />
                <Typography variant="body1" gutterBottom>
                  Username username
                </Typography>
              </div>
              <Rating name="read-only" value={5} readOnly />
              <Typography variant="body2" gutterBottom>
                Vse otlichno Vse otlichno Vse otlichno Vse otlichno Vse otlichno Vse otlichno Vse otlichno Vse otlichno
              </Typography>
              <Typography variant="subtitle2" gutterBottom>
                28 фев. 2023г.
              </Typography>
            </CardContent>
          </Card>
          <Card className={style.reviews__item}>
            <CardContent className={style.item__content}>
              <div className={style.item__info}>
                <Avatar alt="Remy Sharp" src="https://mui.com/static/images/avatar/1.jpg" />
                <Typography variant="body1" gutterBottom>
                  Username username
                </Typography>
              </div>
              <Rating name="read-only" value={5} readOnly />
              <Typography variant="body2" gutterBottom>
                Vse otlichno Vse otlichno Vse otlichno Vse otlichno Vse otlichno Vse otlichno Vse otlichno Vse otlichno
              </Typography>
              <Typography variant="subtitle2" gutterBottom>
                28 фев. 2023г.
              </Typography>
            </CardContent>
          </Card>
        </div>
      </div>
    </Container>
  );
}
