import React, { Component } from "react";
import logo from "../logo.svg";

class Header extends Component {
  state = {};
  render() {
    return (
      <header className="App-header">
        <div className="container">
          <div className="row">
            <div className="col-md-1">
              <center>
                <img src={logo} className="App-logo" alt="logo" />
              </center>
            </div>
            <div className="col-md-10">
              <input
                type="text"
                id="field"
                className="form-control"
                spellCheck="false"
                autoFocus
              />
            </div>
            <div className="col-md-1">
              <button className="btn btn-primary" onClick={this.props.onSearch}>
                <b>Find!</b>
              </button>
            </div>
          </div>
        </div>
      </header>
    );
  }
}

export default Header;
