import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import AppR from "./AppR";
import registerServiceWorker from "./registerServiceWorker";
import "bootstrap/dist/css/bootstrap.css";
import * as firebase from "firebase";

var config = {
  apiKey: "AIzaSyAaHsGtseMK3cC8wwqqCMcqg54t_AojHdc",
  authDomain: "radiopapa99.firebaseapp.com",
  databaseURL: "https://radiopapa99.firebaseio.com",
  projectId: "radiopapa99",
  storageBucket: "radiopapa99.appspot.com",
  messagingSenderId: "220519401928"
};
firebase.initializeApp(config);

ReactDOM.render(<AppR />, document.getElementById("root"));
registerServiceWorker();
