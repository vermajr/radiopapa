import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import AppR from "./AppR";
import registerServiceWorker from "./registerServiceWorker";
import "bootstrap/dist/css/bootstrap.css";
import ReactGA from "react-ga";

ReactGA.initialize("UA-126691383-1");
ReactGA.pageview("/radiopapa/");

ReactDOM.render(<AppR />, document.getElementById("root"));
registerServiceWorker();
