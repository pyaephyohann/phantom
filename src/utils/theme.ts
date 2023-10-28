import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  palette: {
    primary: {
      main: "#F2BE22",
      contrastText: "#fff",
    },
    secondary: {
      main: "#242424",
    },
    info: {
      main: "#fff",
    },
    background: {
      paper: "#2f2f2f",
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
    text: {
      primary: "#fff",
    },
  },
  components: {
    MuiTab: {
      styleOverrides: {
        root: {
          color: "#fff",
        },
      },
    },
  },
  typography: {
    allVariants: {
      color: "#fff",
    },
  },
});
