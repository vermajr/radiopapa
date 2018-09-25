import React, { Component } from "react";
import logo from "../radiopapa_sm.png";

class Header extends Component {
  state = {};
  render() {
    return (
      <header className="App-header">
        <div className="container" id="headContainer">
          <div className="row">
            <div id="hcol1" className="col-md-2" />
            <div id="hcol2" className="col-md-1">
              <center>
                <img src={logo} alt="logo" id="logo" />
              </center>
            </div>
            <div id="hcol3" className="col-md-6" />
          </div>
        </div>
      </header>
    );
  }
}

export default Header;
