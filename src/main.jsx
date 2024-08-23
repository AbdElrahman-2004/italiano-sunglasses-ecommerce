import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { ChakraProvider } from "@chakra-ui/react";
import { extendTheme } from "@chakra-ui/react";
import { BrowserRouter } from "react-router-dom";
import ScrollToTop from "./utils/ScrollToTop.jsx";

const theme = extendTheme({
  colors: {
    black: "#191919",
  },
  styles: {
    global: {
      "*": {
        direction: "rtl",
        fontFamily: "Almarai, sans-serif !important",
      },
      "input:focus-visible, textarea:focus-visible": {
        border: "2px solid black !important",
        boxShadow: "none !important",
      },
      "button:active:not(.css-avw398, .css-vl1ssf)": {
        transform: "scale(0.93)",
      },
      ".swiper-pagination-bullet-active": {
        background: "black",
      },
      "th, td": {
        borderColor: "gray.200 !important",
      },
      ".css-kq5oaw[data-status=complete], .css-4t6ey5[data-status=complete]": {
        background: "black !important",
        color: "white !important",
      },
      ".css-kq5oaw[data-status=active]": {
        borderColor: "black  !important",
      },
    },
  },
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <BrowserRouter>
        <ScrollToTop>
          <App />
        </ScrollToTop>
      </BrowserRouter>
    </ChakraProvider>
  </React.StrictMode>
);
