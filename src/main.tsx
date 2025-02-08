import { createRoot } from "react-dom/client";
import Login from "./components/Login/Login.tsx";
import { StrictMode } from "react";
import "./index.css";
import Header from "./components/Header/header.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Header />
    <Login />
  </StrictMode>
);
