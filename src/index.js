import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { RequestProvider } from "react-request-hook";
import axios from "axios";

// More info about configuration: https://github.com/axios/axios#axioscreateconfig
const axiosInstance = axios.create({
  baseURL: "http://yitao.io/ifthen/"
});

ReactDOM.render(
  <RequestProvider value={axiosInstance}>
    <App />
  </RequestProvider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
