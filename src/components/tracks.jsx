import React, { Component } from "react";

class Tracks extends Component {
  render() {
    return (
      <div id="tracksContainer">
        {this.props.content.map(track => (
          <React.Fragment>
            <div
              className="draggable"
              style={{
                padding: 6,
                borderRadius: 6,
                marginBottom: 6
              }}
              data-title={track.name}
              data-artist={track.artist}
              data-mbid={track.mbid}
            >
              <span style={{ fontSize: 16 }}>
                <b>{track.name} </b>
              </span>
              <div style={{ marginBottom: -3 }} />
              <span style={{ fontSize: 14 }}>{track.artist}</span>
            </div>
          </React.Fragment>
        ))}
      </div>
    );
  }
}

export default Tracks;
