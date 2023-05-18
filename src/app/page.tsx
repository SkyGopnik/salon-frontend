"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function MainPage() {
  const router = useRouter();

  useEffect(() => {
    router.push("/admin");
  }, []);

  return (
    <div />
  );
}
