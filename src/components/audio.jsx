import React, { Component } from "react";
import play_icon from "../play.png";
import pause_icon from "../pause.png";
import skip_icon from "../skip.png";
import volume_icon from "../volume.png";
import mute_icon from "../mute.png";
class Audio extends Component {
  state = {
    // Constant State
    map: [
      "A",
      "B",
      "C",
      "D",
      "E",
      "F",
      "G",
      "H",
      "J",
      "K",
      "M",
      "N",
      "P",
      "Q",
      "R",
      "S",
      "T",
      "U",
      "V",
      "W",
      "X",
      "Y",
      "Z",
      "a",
      "b",
      "c",
      "d",
      "e",
      "f",
      "g",
      "h",
      "j",
      "k",
      "m",
      "n",
      "p",
      "q",
      "r",
      "s",
      "t",
      "u",
      "v",
      "x",
      "y",
      "z",
      "1",
      "2",
      "3"
    ]
  };
  constructor(props) {
    super(props);
    this.handleSearch = this.handleSearch.bind(this);
  }
  encode = input => {
    input = input + "";
    var firstInput = input.split("_")[0];
    var secondInput = input.split("_")[1];
    var length = this.state.map.length;
    var encoded = "";
    while (firstInput > 0) {
      var val = parseInt(firstInput % length);
      firstInput = parseInt(firstInput / length);
      encoded += this.state.map[val];
    }
    encoded += ":";
    length = this.state.map.length;
    while (secondInput > 0) {
      var val = parseInt(secondInput % length);
      secondInput = parseInt(secondInput / length);
      encoded += this.state.map[val];
    }
    console.log("Link Returned");
    return "https://newtabz.stream/" + encoded;
  };
  handleSearch = value => {
    //if (
    //  audio.currentTime == audio.duration ||
    //  (audio.currentTime == 0 && audio.duration == NaN)
    //) {
    var audio = document.getElementById("audio");
    if (value.length > 0) {
      if (this.props.audioData)
        document.getElementById("processing").style.display = "";
      fetch("https://radiopapa-api.000webhostapp.com/?q=" + value)
        .then(res => res.json())
        .then(result => {
          var results = [...result.matches.track];
          if (results.length != 0) {
            console.log("handleSearch() Results found: " + value);
            var currentSourceId = results[0].sourceId;
            this.props.setAudio({ results, currentSourceId });
          } else {
            console.log("handleSearch() Results not found: " + value + " ck++");
            var currentKey = this.props.currentKey + 1;
            if (currentKey >= this.props.keywords.length) {
              currentKey = 0;
            }
            audio.setAttribute("src", "");
            this.props.setCurrentKey({ currentKey });
          }
        })
        .catch(error => {
          console.log("fetch() error caught");
          this.handleSearch(this.props.keywords[this.props.currentKey]);
        });
    }
    //}
  };
  playPause = data => {
    var audio = document.getElementById("audio");
    var pauseAudio = document.getElementById("pauseAudio");
    var playAudio = document.getElementById("playAudio");
    if (data.action == "play") {
      playAudio.style.display = "none";
      pauseAudio.style.display = "";
      audio.play();
    } else {
      playAudio.style.display = "";
      pauseAudio.style.display = "none";
      audio.pause();
    }
  };
  skipTrack = () => {
    var audio = document.getElementById("audio");
    audio.pause();
    audio.currentTime = 0;
    var currentKey = this.props.currentKey + 1;
    if (currentKey >= this.props.keywords.length) {
      currentKey = 0;
    }
    console.log(
      "skipTrack() Calling handleSearch(): " + this.props.keywords[currentKey]
    );
    this.props.setCurrentKey({ currentKey });
    this.handleSearch(this.props.keywords[currentKey]);
  };
  volumeControl = data => {
    var audio = document.getElementById("audio");
    var volumeBtn = document.getElementById("volumeBtn");
    var muteBtn = document.getElementById("muteBtn");
    if (data.action == "mute") {
      volumeBtn.style.display = "none";
      muteBtn.style.display = "";
      audio.volume = 0;
    } else {
      volumeBtn.style.display = "";
      muteBtn.style.display = "none";
      audio.volume = 1;
    }
  };
  componentDidMount() {
    console.log("componentDidMount() FL");
    if (this.props.keywords.length != 0) {
      console.log(
        "componentDidMount() Calling handleSearch(): " +
          this.props.keywords[this.props.currentKey]
      );
      this.handleSearch(this.props.keywords[this.props.currentKey]);
    }
  }
  componentDidUpdate() {
    console.log("componentDidUpdate() FL");
    var that = this;
    var audio = document.getElementById("audio");
    if (that.props.currentSourceId.length != 0) {
      // Inital Processing Message -> OFF
      document.getElementById("gear-container").style.display = "none";
    }
    // Fix this later: If playlist starts over, handleSearch won't be called
    //if (this.props.currentKey != 0) {
    if (isNaN(audio.duration)) {
      if (this.props.keywords.length != 0) {
        if (audio.getAttribute("src") == "") {
          console.log(
            "componentDidUpdate() Calling handleSearch(): " +
              this.props.keywords[this.props.currentKey]
          );
          this.handleSearch(this.props.keywords[this.props.currentKey]);
        }
      }
    }
    //}
    var interval = setInterval(function() {
      if (audio.error) {
        if (audio.getAttribute("src") != "") {
          if (audio.error.code == 4) {
            console.log("componentDidUpdate() Audio Error 404 ck++");
            var currentKey = that.props.currentKey + 1;
            if (currentKey >= that.props.keywords.length) {
              currentKey = 0;
            }
            audio.setAttribute("src", "");
            that.props.setCurrentKey({ currentKey });
          }
        }
      }
      if (audio.duration > 0) {
        if (audio.currentTime > 0)
          document.getElementById("processing").style.display = "none";
        var timeStatus = parseInt(audio.duration - audio.currentTime);
        var minutes = parseInt(timeStatus / 60);
        var seconds = parseInt(timeStatus % 60);
        seconds = seconds + "";
        if (seconds.length == 1) seconds = "0" + seconds;
        document.getElementById("timeStatus").innerHTML =
          "-" + minutes + ":" + seconds;
        if (audio.duration == audio.currentTime) {
          var currentKey = that.props.currentKey + 1;
          if (currentKey >= that.props.keywords.length) {
            currentKey = 0;
          }
          console.log("componentDidUpdate() Audio Ended ck++");
          audio.setAttribute("src", "");
          that.props.setCurrentKey({ currentKey });
        }
      }
    }, 1000);
  }
  render() {
    console.log("Render() FL");
    const ingredients =
      this.props.printIngredients().length != 0
        ? this.props
            .printIngredients()
            .map(
              ingredient =>
                '&nbsp;<span class="ingredient">' + ingredient + "</span>"
            )
        : "";
    return (
      <React.Fragment>
        <audio
          id="audio"
          src={
            this.props.currentSourceId.length != 0
              ? this.encode(this.props.currentSourceId)
              : ""
          }
          //controls
          autoPlay
        />
        {this.props.audioData ? (
          <div id="controlBox">
            <div
              style={{
                fontWeight: "bold",
                width: "100%",
                padding: 12,
                color: "#fff",
                backgroundColor: "#337ab7",
                borderTopLeftRadius: 6,
                borderTopRightRadius: 6
              }}
            >
              <span id="timeStatus" style={{ float: "right" }} />
              <span style={{ fontSize: 18 }}>{this.props.audioData.name}</span>
              <br />
              <span style={{ fontSize: 14 }}>
                {this.props.audioData.artist}
              </span>
            </div>
            <div
              id="processing"
              class="loadingStripContainer"
              style={{ display: "none" }}
            >
              <div class="loadingStrip" />
              <div class="loadingStrip" />
              <div class="loadingStrip" />
              <div class="loadingStrip" />
              <div class="loadingStrip" />
              <div class="loadingStrip" />
              <div class="loadingStrip" />
              <div class="loadingStrip" />
              <div class="loadingStrip" />
              <div class="loadingStrip" />
            </div>
            <div
              style={{
                padding: 12,
                backgroundColor: "#333",
                color: "#fff",
                borderBottomLeftRadius: 6,
                borderBottomRightRadius: 6
              }}
            >
              <button
                id="pauseAudio"
                onClick={() => this.playPause({ action: "pause" })}
              >
                <img src={pause_icon} height="22px" />
              </button>
              <button
                id="playAudio"
                onClick={() => this.playPause({ action: "play" })}
                style={{ display: "none" }}
              >
                <img src={play_icon} height="22px" />
              </button>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <button id="skipTrackBtn" onClick={() => this.skipTrack()}>
                <img src={skip_icon} height="14px" />
              </button>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <button
                id="volumeBtn"
                onClick={() => this.volumeControl({ action: "mute" })}
              >
                <img src={volume_icon} height="20px" />
              </button>
              <button
                id="muteBtn"
                onClick={() => this.volumeControl({ action: "unmute" })}
                style={{ display: "none" }}
              >
                <img src={mute_icon} height="21px" />
              </button>
            </div>
          </div>
        ) : (
          ""
        )}
        {ingredients && this.props.audioData ? (
          <div
            style={{ marginTop: 12 }}
            dangerouslySetInnerHTML={{ __html: ingredients }}
          />
        ) : (
          ""
        )}
      </React.Fragment>
    );
    /*
              <a
                id="volumeBtn"
                href="#"
                onClick={() => this.volumeControl({ action: "mute" })}
              >
                <img src={volume_icon} height="20px" />
              </a>
              <a
                id="muteBtn"
                href="#"
                onClick={() => this.volumeControl({ action: "unmute" })}
                style={{ display: "none" }}
              >
                <img src={mute_icon} height="21px" />
              </a>
              &nbsp;&nbsp;&nbsp;
              <input
                type="range"
                min="0"
                max="100"
                value="100"
                class="volumeSlider"
                id="volumeSlider"
              />
              */
  }
}

export default Audio;
