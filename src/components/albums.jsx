import React, { Component } from "react";

class Albums extends Component {
  render() {
    return (
      <div id="albumsContainer">
        {this.props.content.map(album => (
          <React.Fragment>
            <div
              className="draggable"
              style={{
                padding: 6,
                backgroundColor: "#eeeeee",
                borderRadius: 6,
                cursor: "move"
              }}
              data-title={album.name}
              data-artist={album.artist}
              data-mbid={album.mbid}
            >
              <span style={{ fontSize: 16 }}>{album.name} </span>
              <div style={{ marginBottom: -3 }} />
              <span style={{ fontSize: 14 }}>{album.artist}</span>
            </div>
            <div style={{ marginBottom: 6 }} />
          </React.Fragment>
        ))}
      </div>
    );
  }
}

export default Albums;
