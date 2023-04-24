import { ReactNode } from "react";

import LandingHeader from "src/components/pages/Landing/Header";

import style from "./layout.module.scss";

export default function LandingLayout({
  children
}: {
  children: ReactNode
}) {
  return (
    <div className={style.layout}>
      <LandingHeader />
      {children}
    </div>
  );
}
