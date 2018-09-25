import React, { Component } from "react";
import "./App.css";
import Audio from "./components/audio";
import Populate from "./components/populate";

class AppX extends Component {
  state = {
    //<Populate> variables
    ingredients: {
      tracks: [],
      artists: [],
      albums: [],
      tags: []
    },
    //<Audio> variables
    keywords: [],
    currentKey: 0,
    results: [],
    currentSourceId: []
  };
  setAudio = data => {
    this.setState({
      results: data.results,
      currentSourceId: data.currentSourceId
    });
  };
  setCurrentKey = data => {
    this.setState({
      currentKey: data.currentKey
    });
  };
  setKeywords = keywords => {
    //alert(keywords.length);
    //document.getElementById("populateContainer").innerHTML = "";
    this.setState({
      keywords
    });
  };
  render() {
    return (
      <React.Fragment>
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <div id="populateContainer">
                <Populate
                  ingredients={this.state.ingredients}
                  keywords={this.state.keywords}
                  setKeywords={this.setKeywords}
                />
              </div>
            </div>
            <div className="col-md-6">
              <Audio
                keywords={this.state.keywords}
                currentKey={this.state.currentKey}
                setCurrentKey={this.setCurrentKey}
                currentSourceId={this.state.currentSourceId}
                audioData={this.state.results[0]}
                setAudio={this.setAudio}
              />
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default AppX;
