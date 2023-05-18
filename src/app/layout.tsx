"use client";

import axios from "axios";
import { SnackbarProvider } from "notistack";
import React, { ReactNode } from "react";

import { Providers } from "src/components/Providers";
import SetupClient from "src/components/SetupClient";

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

import "src/style/index.scss";

axios.defaults.baseURL = "https://api.salonykrasotyonline.ru/";

export default function RootLayout({
  children
}: {
  children: ReactNode
}) {
  return (
    <html lang="en">
      {/*
          <head /> will contain the components returned by the nearest parent
          head.tsx. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
        */}
      <head />
      <body>
        <Providers>
          <SnackbarProvider maxSnack={3}>
            {children}
          </SnackbarProvider>
          <SetupClient />
        </Providers>
      </body>
    </html>
  );
}
