import React, { Component } from 'react';

export default class Counter extends Component<{}, { count: number }> {
  state = {
    count: 0,
  };

  increment = () => {
    this.setState(prevState => ({
      count: prevState.count + 1,
    }));
  };

  render() {
    const { count } = this.state;
    return (
      <div className="hello">
        <button onClick={this.increment} data-testid="counter-button">
          {count}
        </button>
      </div>
    );
  }
}
