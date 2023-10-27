import { createTheme } from "@mui/material";
import { red } from "@mui/material/colors";

export const purpleTheme = createTheme({
    palette: {
      primary: {
        // main: '#262254',
        main: '#3b3c3e',
      },
      secondary: {
        main: '#543884',
      },
      error: {
        main: red.A400,
      },
    },
  });