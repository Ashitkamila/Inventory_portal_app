import React from "react";
import GlobalImport from "./GlobalImport.js";
import { ThemeProvider, createTheme } from "@mui/material/styles";
// import IdleTimerComponent from "./utils/IdleTimerComponent.js";
const theme = createTheme({
  typography: {
    allVariants: {
      fontFamily: "Inter",
    },
  },
  palette: {
    primary: {
      main: "#363C90",
    },
    text: {
      primary: "#191932",
      secondary: "#EEEEFF",
    },
    secondary: {
      main: "#EEEEFF",
    },
    neutral: {
      main: "#FFBF86",
    },
  },
});

function App() {
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        {/* <IdleTimerComponent/> */}
        <GlobalImport />
      </ThemeProvider>
    </div>
  );
}

export default App;
