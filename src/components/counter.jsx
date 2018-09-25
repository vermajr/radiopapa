import React, { Component } from "react";
class Counter extends Component {
  render() {
    return (
      <React.Fragment>
        <div className="container">
          <div className="row">
            <div className="col-md-2">
              <span style={{ fontSize: 24, fontWeight: "bold", marginTop: 30 }}>
                {this.formatCount()}
              </span>
            </div>
            <div className="col-md-6">
              <button
                onClick={() =>
                  this.props.onVote({
                    action: "up",
                    data: this.props.counter
                  })
                }
                className="btn btn-primary btn-sm"
              >
                Upvote
              </button>
              &nbsp;
              <button
                onClick={() =>
                  this.props.onVote({
                    action: "down",
                    data: this.props.counter
                  })
                }
                className="btn btn-danger btn-sm"
              >
                Downvote
              </button>
              &nbsp;
              <button
                onClick={() => this.props.onDelete(this.props.counter.id)}
                className="btn btn-danger btn-sm"
              >
                X
              </button>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
  formatCount() {
    const { downvotes } = this.props.counter;
    const { upvotes } = this.props.counter;
    return upvotes + " / " + downvotes;
  }
}

export default Counter;
