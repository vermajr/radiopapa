import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import Counters from "./components/counters";

class App extends Component {
  state = {
    counters: [
      { id: 1, upvotes: 3, downvotes: 4 },
      { id: 2, upvotes: 4, downvotes: 2 },
      { id: 3, upvotes: 12, downvotes: 0 },
      { id: 4, upvotes: 1, downvotes: 14 }
    ]
  };
  handleVote = _vote => {
    const counters = [...this.state.counters];
    const index = counters.indexOf(_vote.data);
    if (_vote.action == "up") {
      counters[index].upvotes++;
      this.setState({ counters });
    } else {
      counters[index].downvotes++;
      this.setState({ counters });
    }
  };
  handleDelete = counterId => {
    console.log(counterId);
    const counters = this.state.counters.filter(c => c.id !== counterId);
    this.setState({ counters });
  };

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
        </header>
        <br />
        <Counters
          counters={this.state.counters}
          onDelete={this.handleDelete}
          onVote={this.handleVote}
        />
      </div>
    );
  }
}

export default App;
