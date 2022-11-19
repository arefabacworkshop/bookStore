import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap";
import $ from "jquery";
import "./global.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
ReactDOM.render(
  <BrowserRouter>
    <App />
    <ToastContainer />
  </BrowserRouter>,
  document.getElementById("root")
);

reportWebVitals();
