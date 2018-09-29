import React, { Component } from "react";
import Audio from "../components/audio";
import $ from "jquery";
class Populate extends Component {
  state = {
    //<Audio> variables
    keywords: [],
    currentKey: 0,
    results: [],
    currentSourceId: []
  };

  /*
      constructor(props) {
        super(props);
        this.state = {
          ingredients: props.ingredients,
          keywords: [],
          currentKey: 0,
          results: [],
          currentSourceId: []
        };
      }
      */
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
  // track.getSimilar *
  // artist.getTopTracks
  // album.getInfo
  // tag.getTopTracks

  populateViaArtists = data => {
    var keywords = [...data.keywords];
    var that = this;
    if (that.props.ingredients.artists.length != 0) {
      fetch(
        "https://ws.audioscrobbler.com/2.0/?method=artist.gettoptracks&mbid=" +
          that.props.ingredients.artists[data.index].mbid +
          "&api_key=0017041e90dd503219cd302cac55510a&limit=100&format=json"
      )
        .then(res => res.json())
        .then(result => {
          var results = [...result.toptracks.track];
          for (var j = 0; j < results.length; j++) {
            keywords.push(results[j].name + " " + results[j].artist.name);
          }
          var index = data.index + 1;
          if (index < that.props.ingredients.artists.length)
            that.populateViaArtists({ index, keywords });
          else that.populateViaTags({ index: 0, keywords });
        });
    } else that.populateViaTags({ index: 0, keywords });
  };
  populateViaTags = data => {
    var keywords = [...data.keywords];
    var that = this;
    if (that.props.ingredients.tags.length != 0) {
      fetch(
        "https://ws.audioscrobbler.com/2.0/?method=tag.gettoptracks&tag=" +
          that.props.ingredients.tags[data.index].title +
          "&api_key=0017041e90dd503219cd302cac55510a&limit=100&format=json"
      )
        .then(res => res.json())
        .then(result => {
          var results = [...result.tracks.track];
          for (var j = 0; j < results.length; j++) {
            if (results[j].duration > 90)
              keywords.push(results[j].name + " " + results[j].artist.name);
          }
          var index = data.index + 1;
          if (index < that.props.ingredients.tags.length)
            that.populateViaTags({ index, keywords });
          else that.sanitizeKeywords(keywords);
        });
    } else that.sanitizeKeywords(keywords);
  };
  sanitizeKeywords = keywords => {
    if (
      this.props.ingredients.artists.length != 0 ||
      this.props.ingredients.tags.length != 0
    ) {
      var currentIndex = keywords.length,
        temporaryValue,
        randomIndex;
      while (0 !== currentIndex) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = keywords[currentIndex];
        keywords[currentIndex] = keywords[randomIndex];
        keywords[randomIndex] = temporaryValue;
      }
      var uniqueKeywords = [];
      $.each(keywords, function(i, el) {
        if ($.inArray(el, uniqueKeywords) === -1) uniqueKeywords.push(el);
      });
      console.log("POPULATE.JSX/sanitizeKeywords() Set {keywords}");
      this.setState({ keywords: uniqueKeywords });
    }
  };
  printIngredients = () => {
    var that = this;
    if (
      that.props.ingredients.artists.length != 0 ||
      that.props.ingredients.tags.length != 0
    ) {
      var ingredients = [],
        i;
      var content = that.props.ingredients;
      for (i = 0; i < content.artists.length; i++) {
        ingredients.push(content.artists[i].title);
      }
      for (i = 0; i < content.tags.length; i++) {
        ingredients.push(content.tags[i].title);
      }
      return ingredients;
    } else {
      return [];
    }
  };
  render() {
    console.log("POPULATE.JSX/Render() FL");
    {
      this.state.keywords.length == 0
        ? this.populateViaArtists({ index: 0, keywords: [] })
        : "";
    }
    return (
      <React.Fragment>
        <Audio
          keywords={this.state.keywords}
          printIngredients={this.printIngredients}
          currentKey={this.state.currentKey}
          setCurrentKey={this.setCurrentKey}
          currentSourceId={this.state.currentSourceId}
          audioData={this.state.results[0]}
          setAudio={this.setAudio}
        />
      </React.Fragment>
    );
  }
}

export default Populate;
