import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  palette: {
    primary: {
      main: "#6633F2",
    },
    secondary: {
      main: "#000000",
    },
  },
  typography: {
    fontFamily: "Montserrat",
    button: {
      textTransform: "none",
    },
  },
});
