import React, { Component } from "react";
class Logo extends Component {
  render() {
    return (
      <React.Fragment>
        <div id="header">
          <span className="App-logo logo-head">radio</span>
          <span className="App-logo logo-base">papa</span>
        </div>
        <div id="tagline">
          Mix Genres & Artists to create your custom Radio
          Station!&nbsp;&#x2728;
        </div>
      </React.Fragment>
    );
  }
}

export default Logo;
