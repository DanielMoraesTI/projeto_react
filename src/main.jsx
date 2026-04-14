import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { PreferencesProvider } from "./context/PreferencesContext.jsx";
import { ThemeProvider } from "./context/ThemeContext.jsx";
import App from "./App.jsx";
import "./styles/App.css";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <PreferencesProvider>
        <ThemeProvider>
          <App />
        </ThemeProvider>
      </PreferencesProvider>
    </QueryClientProvider>
  </StrictMode>,
);
