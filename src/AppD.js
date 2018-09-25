import React, { Component } from "react";
//import $ from "jquery";
import firebase from "firebase";
//import "firebase/firebase-app";
//import "firebase/firebase-auth";
//import "firebase/firebase-database";

class AppD extends Component {
  state = {
    myradio: []
  };
  componentDidMount() {
    var rootRef = firebase.database.ref.child("myradio");
    var userRef = rootRef.child("tyopiunmly");
    var tracksRef = userRef.child("tracks");
  }
  render() {
    return <h1>Fudda</h1>;
  }
}

export default AppD;
