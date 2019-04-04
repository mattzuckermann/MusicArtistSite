import React, { Component } from 'react';

export default class Jumbotron extends Component {
  state = {
    navbarHeight: 0,
  };

  // componentDidMount() {
  //   this.setState({
  //     navbarHeight: document.querySelector('.navbar').clientHeight,
  //   });
  // }

  render() {
    return (
      <div
        style={{
          height: 200,
          clear: 'both',
          // marginTop: this.state.navbarHeight,
        }}
        className="jumbotron"
      >
        {this.props.children}
      </div>
    );
  }
}
