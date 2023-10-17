import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  palette: {
    primary: {
      // pink
      main: "#FFA1F5",
      contrastText: "#fff",
    },
    secondary: {
      // green
      main: "#00DFA2",
    },
    info: {
      // yellow
      main: "#fff",
    },
    success: {
      main: "#00DFA2",
    },
    warning: {
      main: "#FF6000",
    },
    error: {
      main: "#FE0000",
    },
  },
});
