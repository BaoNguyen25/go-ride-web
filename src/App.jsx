import "./App.css";
import { CssBaseline, ThemeProvider } from "@mui/material";
import MainRoutes from "./routes/MainRoutes";
import customTheme from "./assets/theme";

export default function App() {
  return (
    <ThemeProvider theme={customTheme}>
      <CssBaseline />
      <MainRoutes />
    </ThemeProvider>
  );
}
