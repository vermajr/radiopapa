import React, { Component } from "react";
import "./App.css";
import Logo from "./components/logo";
import Artists from "./components/artists";
import Tags from "./components/tags";
import Cooker from "./components/cooker";
import $ from "jquery";
import "jquery-ui/ui/widgets/draggable";
import "jquery-ui/ui/widgets/droppable";
import "jquery-ui/ui/effects/effect-slide";
import "jquery-ui/ui/effects/effect-shake";
import facebook_icon from "./facebook.png";
import linkedin_icon from "./linkedin.png";
import github_icon from "./github.png";
import stackoverflow_icon from "./stackoverflow.png";

class AppR extends Component {
  state = {
    ingredients: {
      artists: [],
      tags: []
    },
    search_artists: [
      { name: "Linkin Park", mbid: "f59c5520-5f46-4d2c-b2c4-822eabf53419" },
      { name: "Arctic Monkeys", mbid: "ada7a83c-e3e1-40f1-93f9-3e73dbc9298a" },
      {
        name: "System Of A Down",
        mbid: "cc0b7089-c08d-4c10-b6b0-873582c17fd6"
      },
      { name: "Eminem", mbid: "b95ce3ff-3d05-4e87-9e01-c97b66af13d4" },
      { name: "George Michael", mbid: "ccb8f30e-4d71-40c4-8b1d-846dafe73e2c" },
      {
        name: "Rage Against The Machine",
        mbid: "3798b104-01cb-484c-a3b0-56adc6399b80"
      },
      { name: "Queen", mbid: "420ca290-76c5-41af-999e-564d7c71f1a7" },
      { name: "The Beatles", mbid: "b10bbbfc-cf9e-42e0-be17-e2c3e1d2600d" },
      {
        name: "The Rolling Stones",
        mbid: "b071f9fa-14b0-4217-8e97-eb41da73f598"
      },
      { name: "Bee Gees", mbid: "bf0f7e29-dfe1-416c-b5c6-f9ebc19ea810" }
    ]
  };
  componentDidMount() {
    var userAgent = navigator.userAgent || navigator.vendor || window.opera;
    var onMobilePhone = 0;
    if (/windows phone/i.test(userAgent)) onMobilePhone = 1;
    if (/android/i.test(userAgent)) onMobilePhone = 1;
    if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream)
      onMobilePhone = 1;
    if (onMobilePhone == 1)
      document.getElementById("root").innerHTML =
        "<div style='width:96%;'><br /><br /><div id='mobileLogo'>radiopapa</div><br><center><b>Not available on mobile phones for now :(<br />Would launch an App soon!<br />Till then, fire up your custom radio station on your Desktop ;)</b></center></div>";
    $(window).on("resize", function() {
      var win = $(this); //this = window
      if (win.width() < 750) {
        //document.getElementById("tagsContainer").style.height = "64px";
        //document.getElementById("tagsContainer").style.overflowX = "scroll";
        //document.getElementById("tagsContainer").style.overflowY = "hidden";
      }
    });
    $(".draggable").draggable({ revert: "invalid", helper: "clone" });
    $(".droppable").droppable({
      drop: function(e, ui) {
        document.getElementsByClassName("dropMessage")[0].innerHTML = "";
        var X = ui.offset.left - $(this).offset().left;
        var Y = ui.offset.top - $(this).offset().top;
        if (X < 0) X = 0;
        if (Y < 0) Y = 0;
        var ingredient = $(document.createElement("div"));
        ingredient.css({
          top: Y,
          left: X,
          position: "absolute"
        });
        ingredient.addClass("ingredient");
        if (
          $(ui.draggable)
            .parent()
            .attr("id") == "artistsContainer"
        ) {
          // Artist
          ingredient.addClass("artist");
          ingredient.attr("data-mbid", $(ui.draggable).attr("data-mbid"));
        } else if (
          $(ui.draggable)
            .parent()
            .attr("id") == "tagsContainer"
        ) {
          // Tag
          ingredient.addClass("tag");
        }
        ingredient.text($(ui.draggable).text());
        $(this).append(ingredient);
        $(ui.draggable)
          .off()
          .hide(500, function() {
            $(this).remove();
          });
      }
    });
  }
  componentDidUpdate() {
    $(".draggable").draggable({ revert: "invalid", helper: "clone" });
    $(".droppable").droppable({
      drop: function(e, ui) {
        document.getElementsByClassName("dropMessage")[0].innerHTML = "";
        var X = ui.offset.left - $(this).offset().left;
        var Y = ui.offset.top - $(this).offset().top;
        if (X < 0) X = 0;
        if (Y < 0) Y = 0;
        var ingredient = $(document.createElement("div"));
        ingredient.css({
          top: Y,
          left: X,
          position: "absolute"
        });
        ingredient.addClass("ingredient");
        if (
          $(ui.draggable)
            .parent()
            .attr("id") == "artistsContainer"
        ) {
          // Artist
          ingredient.addClass("artist");
          ingredient.attr("data-mbid", $(ui.draggable).attr("data-mbid"));
        } else if (
          $(ui.draggable)
            .parent()
            .attr("id") == "tagsContainer"
        ) {
          // Tag
          ingredient.addClass("tag");
        }
        ingredient.text($(ui.draggable).text());
        $(this).append(ingredient);
        $(ui.draggable)
          .off()
          .hide(500, function() {
            $(this).remove();
          });
      }
    });
  }
  handleSearch = e => {
    if (e.target.value.length > 0) {
      fetch(
        "https://ws.audioscrobbler.com/2.0/?method=artist.search&artist=" +
          e.target.value +
          "&api_key=0017041e90dd503219cd302cac55510a&limit=10&format=json"
      )
        .then(res => res.json())
        .then(result => {
          var search_artists = [...result.results.artistmatches.artist];
          search_artists = search_artists.filter(artist => artist.mbid);
          if (search_artists.length != 0) this.setState({ search_artists });
        });
    }
  };
  startCooking = () => {
    var ingredients = {
      artists: [],
      tags: []
    };
    var cooker = document.getElementById("cooker");
    var artists = cooker.getElementsByClassName("artist");
    var tags = cooker.getElementsByClassName("tag");
    if (artists.length > 0) {
      for (var i = 0; i < artists.length; i++) {
        var artist = { title: "N/A", mbid: "N/A" };
        artist.title = artists[i].innerHTML;
        artist.mbid = artists[i].getAttribute("data-mbid");
        ingredients.artists.push(artist);
      }
    }
    if (tags.length > 0) {
      for (var i = 0; i < tags.length; i++) {
        var tag = { title: "N/A" };
        tag.title = tags[i].innerHTML;
        ingredients.tags.push(tag);
      }
    }
    if (ingredients.artists.length != 0 || ingredients.tags.length != 0) {
      document.getElementById("cookerContainer").style.display = "none";
      //document.getElementById("scol1").innerHTML = "";
      //document.getElementById("scol2").innerHTML = "";
      //document.getElementById("cscol").innerHTML = "";
      $("#scol1i").hide("slide", { direction: "left" }, 1500, function() {
        document.getElementById("scol1").innerHTML = "";
        document.getElementById("scol1").style = "";
        document.getElementById("scol1").className = "col-md-2";
        document.getElementById("ccol").className = "col-md-8";
      });
      $("#scol2i").hide("slide", { direction: "right" }, 1500);
      document.getElementById("gear-container").style.display = "";
      document.getElementById("tagline").innerHTML = "";
      document.getElementsByClassName("App")[0].style.backgroundColor =
        "transparent";
      document.getElementById("afterLogo").innerHTML = "radiopapa";
      document
        .getElementById("header")
        .parentElement.removeChild(document.getElementById("header"));
      document
        .getElementById("footMessage")
        .parentElement.removeChild(document.getElementById("footMessage"));
      //document.getElementById("scol1").className = "col-md-2";
      //document.getElementById("scol2").className = "";
      //document.getElementById("logo").setAttribute("src", "/radiopapa.png");
      //document.getElementById('cookerLoader').innerHTML='<style>body{background-color:#ccc;-moz-animation:change-background 2s infinite;-webkit-animation:change-background 2s infinite;animation:change-background 2s infinite;-moz-animation-delay:2s;-webkit-animation-delay:2s;animation-delay:2s;}</style><div class="container_aud"><div class="boombox"><div class="lights"></div><div class="lines"></div><div class="speaker"></div><div class="speaker"></div></div><div class="shadow"></div></div>';
      this.setState({ ingredients });
    } else {
      $("#cooker").effect("shake");
    }
  };
  render() {
    console.log("Main App Render()");
    return (
      <React.Fragment>
        <Logo />
        <div className="App" style={{ backgroundColor: "#eee" }}>
          <div className="container">
            <div className="row">
              <div id="scol1" className="col-md-4">
                <div id="scol1i">
                  <span style={{ fontSize: 30, float: "right" }}>
                    Genres&#x1F3B5;
                  </span>
                  <br />
                  <br />
                  <Tags />
                </div>
              </div>
              <div id="ccol" className="col-md-5">
                <div id="afterLogo" />
                <div id="gear-container" style={{ display: "none" }}>
                  <div class="gear two">
                    <div class="gear-inner">
                      <div class="bar" />
                      <div class="bar" />
                      <div class="bar" />
                    </div>
                  </div>
                  <div class="gear three medium">
                    <div class="gear-inner">
                      <div class="baz" />
                      <div class="baz" />
                      <div class="baz" />
                      <div class="baz" />
                      <div class="baz" />
                    </div>
                  </div>
                  <div class="gear four large">
                    <div class="gear-inner">
                      <div class="bar" />
                      <div class="bar" />
                      <div class="bar" />
                      <div class="bar" />
                      <div class="bar" />
                      <div class="bar" />
                    </div>
                  </div>
                </div>
                <Cooker
                  startCooking={this.startCooking}
                  ingredients={this.state.ingredients}
                />
              </div>
              <div id="scol2" className="col-md-3">
                <div id="scol2i">
                  <span style={{ fontSize: 30 }}>&#x1F3A4;Artists</span>
                  <input
                    style={{
                      fontSize: 18,
                      fontWeight: "bold",
                      marginBottom: 6
                    }}
                    type="text"
                    className="form-control"
                    onKeyUp={this.handleSearch}
                    placeholder="search for artists"
                    spellCheck="false"
                  />
                  <Artists content={this.state.search_artists} />
                </div>
              </div>
            </div>
          </div>
        </div>
        <span id="footMessage" style={{ float: "right" }}>
          <span style={{ fontFamily: "courier", fontSize: 14, marginTop: 3 }}>
            Created by: VermaJr
          </span>
          &nbsp;&nbsp;
          <a
            href="https://stackoverflow.com/users/5073281/verma-jr"
            target="_blank"
          >
            <img src={stackoverflow_icon} />
          </a>
          &nbsp;
          <a href="https://www.linkedin.com/in/vermajr/" target="_blank">
            <img src={linkedin_icon} />
          </a>
          &nbsp;
          <a href="https://github.com/vermajr" target="_blank">
            <img src={github_icon} />
          </a>
          &nbsp;
          <a href="https://www.facebook.com/utkarsh.verma" target="_blank">
            <img src={facebook_icon} />
          </a>
          &nbsp;&nbsp;&nbsp;
        </span>
      </React.Fragment>
    );
  }
}

export default AppR;
