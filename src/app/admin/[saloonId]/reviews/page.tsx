"use client";

import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Paper, Rating, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import CreateReviewModal from "src/modals/CreateReview";
import { Review } from "src/types/review";

export default function SaloonServicesPage({ params }: {
  params: {
    saloonId: string
  }
}) {

  const [reviews, setReviews] = useState<Array<Review>>();

  const [createReview, setCreateReview] = useState<{
    isOpen: boolean,
    data?: Review
  }>({
    isOpen: false
  });

  useEffect(() => {
    fetchReviews().catch((err) => console.log(err));
  }, []);

  const fetchReviews = async () => {
    const { data } = await axios.get("/reviews/" + params.saloonId);

    setReviews(data);
  };

  const createReviewClose = async () => {
    await fetchReviews();

    setCreateReview({
      isOpen: false
    });
  };

  const deleteReview = async (review: Review) => {
    const result = confirm(`Вы уверены что хотитет удалить отзыв - ${review.firstName} ${review.lastName}`);

    if (!result) {
      return;
    }

    await axios.delete(`/reviews/${params.saloonId}/${review.id}`);

    await fetchReviews();
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
          Список отзывов
        </Typography>
        <Button
          variant="contained"
          onClick={() => setCreateReview({
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
              <TableCell>Имя Фамилия</TableCell>
              <TableCell align="center">Рейтинг</TableCell>
              <TableCell align="center">Описание</TableCell>
              <TableCell align="right">Действия</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {reviews && reviews.map((item) => (
              <TableRow
                key={item.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {item.firstName} {item.lastName}
                </TableCell>
                <TableCell align="center">
                  <Rating name="read-only" value={item.rating} precision={0.5} readOnly />
                </TableCell>
                <TableCell align="center">{item.description}</TableCell>
                <TableCell align="right">
                  <Button
                    onClick={() => setCreateReview({
                      isOpen: true,
                      data: item
                    })}
                  >
                    Изменить
                  </Button>
                  <Button color="error" onClick={() => deleteReview(item)}>Удалить</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <CreateReviewModal
        saloonId={params.saloonId}
        data={createReview.data}
        opened={createReview.isOpen}
        onClose={createReviewClose}
      />
    </>
  );
}
