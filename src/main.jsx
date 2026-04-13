import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter, Routes, Route } from "react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import MainLayout from "./layouts/MainLayout.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import AddTransaction from "./pages/AddTransaction.jsx";
import History from "./pages/History.jsx";
import Settings from "./pages/Settings.jsx";
import "./styles/App.css";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route element={<MainLayout />}>
            <Route path="/" element={<App />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/add-transaction" element={<AddTransaction />} />
            <Route path="/history" element={<History />} />
            <Route path="/settings" element={<Settings />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  </StrictMode>,
);
