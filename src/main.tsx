import { createRoot } from "react-dom/client";
import Login from "./components/Login/Login.tsx";
import { StrictMode } from "react";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Login />
  </StrictMode>
);
