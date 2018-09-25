import React, { Component } from "react";
class Tags extends Component {
  state = {
    search_tags: [
      [{ name: "Hip-Hop", fs: 20 }],
      [
        { name: "Blues", fs: 20 },
        { name: "Blues Rock", fs: 16 },
        { name: "Country Blues", fs: 16 },
        { name: "British Blues", fs: 16 },
        { name: "Gospel Blues", fs: 16 },
        { name: "Soul Blues", fs: 16 },
        { name: "Electric Blues", fs: 16 }
      ],
      [
        { name: "Rock", fs: 20 },
        { name: "Alternative Rock", fs: 16 },
        { name: "Christian Rock", fs: 16 },
        { name: "Electronic Rock", fs: 16 },
        { name: "Garage Rock", fs: 16 },
        { name: "Glam Rock", fs: 16 },
        { name: "Hard Rock", fs: 16 },
        { name: "Progressive Rock", fs: 16 },
        { name: "Punk Rock", fs: 16 },
        { name: "Rap Rock", fs: 16 }
      ],
      [{ name: "RnB", fs: 20 }],
      [
        { name: "Metal", fs: 20 },
        { name: "Heavy Metal", fs: 16 },
        { name: "Black Metal", fs: 16 },
        { name: "Christian Metal", fs: 16 },
        { name: "Death Metal", fs: 16 },
        { name: "Rap Metal", fs: 16 },
        { name: "Glam Metal", fs: 16 },
        { name: "Nu Metal", fs: 16 },
        { name: "Power Metal", fs: 16 },
        { name: "Progressive Metal", fs: 16 },
        { name: "Sludge Metal", fs: 16 },
        { name: "Thrash Metal", fs: 16 },
        { name: "Gothic Metal", fs: 16 },
        { name: "Funk Metal", fs: 16 }
      ],
      [
        { name: "Country", fs: 20 },
        { name: "Alternative Country", fs: 16 },
        { name: "Country Rock", fs: 16 },
        { name: "Outlaw Country", fs: 16 },
        { name: "Progressive Country", fs: 16 },
        { name: "Country Rap", fs: 16 },
        { name: "Country Pop", fs: 16 },
        { name: "Country Classic", fs: 16 }
      ],
      [{ name: "Easy Listening", fs: 20 }],
      [
        { name: "Electronic", fs: 20 },
        { name: "House", fs: 16 },
        { name: "EDM", fs: 16 },
        { name: "Techno", fs: 16 },
        { name: "Ambient Electronic", fs: 16 },
        { name: "Trance", fs: 16 },
        { name: "Electronica", fs: 16 },
        { name: "Downtempo", fs: 16 },
        { name: "Breakbeat", fs: 16 },
        { name: "Disco", fs: 16 }
      ],
      [
        { name: "Jazz", fs: 20 },
        { name: "Acid Jazz", fs: 16 },
        { name: "Jazz Blues", fs: 16 },
        { name: "Jazz Rap", fs: 16 },
        { name: "Jazz Rock", fs: 16 },
        { name: "Jazz Funk", fs: 16 },
        { name: "Nu Jazz", fs: 16 },
        { name: "Soul Jazz", fs: 16 }
      ],
      [{ name: "Grunge", fs: 20 }],
      [
        { name: "Rap", fs: 20 },
        { name: "East Coast Rap", fs: 16 },
        { name: "West Coast Rap", fs: 16 },
        { name: "Gangsta Rap", fs: 16 }
      ],
      [
        { name: "Pop", fs: 20 },
        { name: "Britpop", fs: 16 },
        { name: "Electropop", fs: 16 },
        { name: "Power Pop", fs: 16 },
        { name: "Pop Rap", fs: 16 },
        { name: "Pop Rock", fs: 16 }
      ],
      [
        { name: "Psychedelic", fs: 20 },
        { name: "Psychedelic Rock", fs: 16 },
        { name: "Psychedelic Rap", fs: 16 }
      ],
      [
        { name: "Folk", fs: 20 },
        { name: "Cowboy", fs: 16 },
        { name: "Psychedelic Folk", fs: 16 },
        { name: "Contemporary Folk", fs: 16 },
        { name: "Indie Folk", fs: 16 },
        { name: "Folk Rock", fs: 16 },
        { name: "Folk Pop", fs: 16 },
        { name: "Folk Metal", fs: 16 }
      ],
      [{ name: "Avant Garde", fs: 20 }],
      [{ name: "Soul", fs: 20 }],
      [{ name: "Reggae", fs: 20 }]
    ]
  };
  componentDidMount() {
    var tags = document
      .getElementById("tagsContainer")
      .getElementsByClassName("tag");
    var k = 0;
    for (var i = 0; i < this.state.search_tags.length; i++) {
      for (var j = 0; j < this.state.search_tags[i].length; j++) {
        if (j != 0) tags[k].classList.add("subtag");
        tags[k].style.fontSize = this.state.search_tags[i][j].fs + "px";
        k++;
      }
    }
    /*
    for (var i = 0; i < tags.length; i++) {
      tags[i].style.fontSize = this.props.content[i].fontSize + "px";
    }
    */
  }
  render() {
    return (
      <div
        id="tagsContainer"
        style={{
          textAlign: "right",
          overflowY: "scroll",
          overflowX: "hidden",
          height: 369
        }}
      >
        {this.state.search_tags.map(cat => (
          <React.Fragment>
            {cat.map(tag => (
              <span className="draggable tag" style={{ fontSize: 16 }}>
                {tag.name}
              </span>
            ))}
            <hr style={{ marginTop: 6, marginBottom: 9 }} />
          </React.Fragment>
        ))}
      </div>
    );
  }
}

export default Tags;
