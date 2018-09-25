import React, { Component } from "react";

class Artists extends Component {
  render() {
    return (
      <div id="artistsContainer">
        {this.props.content.map(artist => (
          <React.Fragment>
            <span
              className="draggable"
              style={{
                fontSize: 16,
                fontWeight: "bold",
                padding: "3 6 3 6 px",
                borderRadius: 3,
                cursor: "move"
              }}
              data-mbid={artist.mbid}
            >
              {artist.name}
            </span>
            <div style={{ marginBottom: 3 }} />
          </React.Fragment>
        ))}
      </div>
    );
  }
}

export default Artists;
