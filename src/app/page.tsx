"use client";

import React from "react";
import { Button } from "@mui/material";

import style from "./page.module.scss";

export default function MainPage() {
  return (
    <div>
      <div className={style.test}>
        d
      </div>
      <Button variant="contained">Hello World</Button>
    </div>
  );
}
