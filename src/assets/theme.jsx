import { createTheme } from "@mui/material/styles";
import { green } from "@mui/material/colors";

const theme = createTheme({
  palette: {
    primary: green,
    secondary: {
      main: "#43a047",
    },
  },
});

export default createTheme(theme);
