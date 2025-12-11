// import React from "react";
// import { StrictMode } from "react";
// import { createRoot } from "react-dom/client";
// import { Toaster } from "@/components/ui/sonner";
// import './index.css';

// import { BrowserRouter as Router } from "react-router-dom";
// import AppRoutes from "./AppRoutes.jsx";

// const root = createRoot(document.getElementById("root"));
// root.render(
//   <StrictMode>
//     <Router>
//       <AppRoutes />
//       <Toaster
//         position="top-right"
//         richColors
//         closeButton
//       />
//     </Router>
//   </StrictMode>
// );

import React from "react";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Toaster } from "@/components/ui/sonner";
import "./index.css";

import { BrowserRouter as Router } from "react-router-dom";
import AppRoutes from "./AppRoutes.jsx";

import {
  QueryClient,
  QueryClientProvider
} from "@tanstack/react-query";

const queryClient = new QueryClient();

const root = createRoot(document.getElementById("root"));

root.render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <Router>
        <AppRoutes />
        <Toaster
          position="top-right"
          richColors
          closeButton
        />
      </Router>
    </QueryClientProvider>
  </StrictMode>
);
