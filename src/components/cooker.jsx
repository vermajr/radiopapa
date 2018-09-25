import React, { Component } from "react";
import Populate from "../components/populate";
class Cooker extends Component {
  render() {
    console.log("COOKER.JSX/Render() FL");
    return (
      <React.Fragment>
        <div id="cookerContainer">
          <div
            id="cooker"
            class="droppable"
            style={{ width: "100%", height: 300 }}
          >
            <span className="dropMessage">Drop Genres / Artists here</span>
          </div>
          <div className="startButtonContainer">
            <center>
              <button
                onClick={this.props.startCooking}
                className="btn btn-primary"
                style={{
                  fontSize: 18,
                  fontWeight: "bold",
                  marginTop: 3,
                  width: "100%",
                  borderTopLeftRadius: 0,
                  borderTopRightRadius: 0,
                  backgroundColor: "#337ab7",
                  borderColor: "#337ab7"
                }}
              >
                Start Radio!
              </button>
            </center>
          </div>
        </div>
        {this.props.ingredients ? (
          <div id="populateContainer">
            <Populate
              ingredients={this.props.ingredients}
              setKeywords={this.setKeywords}
            />
          </div>
        ) : (
          ""
        )}
      </React.Fragment>
    );
  }
}

export default Cooker;
