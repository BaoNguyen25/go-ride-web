import React from "react";
import { useRoutes, Navigate } from "react-router-dom";
import HomePage from "../pages/HomePage";
import SignIn from "../pages/Login";

export default function MainRoutes() {
  return useRoutes([
    {
      path: "/",
      element: <HomePage />,
    },
    {
      path: "/signin",
      element: <SignIn />,
    },
    {
      path: "*",
      element: <Navigate to="/" />,
    },
  ]);
}
