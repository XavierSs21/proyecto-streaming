import React from "react";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import './index.css';

import { BrowserRouter as Router } from "react-router-dom";
import AppRoutes from "./AppRoutes.jsx";

const root = createRoot(document.getElementById("root"));
root.render(
  <StrictMode>
    <Router>
      <AppRoutes />
    </Router>
  </StrictMode>
);
