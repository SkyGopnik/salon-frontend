import axios from "axios";
import React, { ReactNode } from "react";

import { Providers } from "src/components/Providers";
import SetupClient from "src/components/SetupClient";

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

import "src/style/index.scss";

axios.defaults.baseURL = "http://localhost:6713/";

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
          {children}
          <SetupClient />
        </Providers>
      </body>
    </html>
  );
}
