"use client";

import { useRouter } from "next/navigation";
import { ReactNode, useEffect, useState } from "react";
import AdminHeader from "src/components/pages/Admin/Header";
import { deleteToken, setToken } from "src/functions/token";
import { useAppDispatch, useAppSelector } from "src/hooks/redux";
import { fetchUser } from "src/store/reducers/user/action";

export default function AdminLayout({
  children
}: {
  children: ReactNode
}) {
  const { user } = useAppSelector((state) => state.userReducer);

  const router = useRouter();
  const dispatch = useAppDispatch();

  const [render, setRender] = useState(false);

  const authorizeUser = () => {
    // if (user) {
    //   setRender(true);
    //   return;
    // }

    const token = localStorage.getItem("token");

    if (!token) {
      router.push("/login");
      return;
    }

    setToken(token);

    dispatch(fetchUser())
      .then(() => setRender(true))
      .catch((e) => {
        console.log(e);
        deleteToken();

        router.push("/login");
      });
  };

  useEffect(() => {
    authorizeUser();
  }, []);

  if (!render) {
    return null;
  }


  return (
    <>
      <AdminHeader />
      {children}
    </>
  );
}
