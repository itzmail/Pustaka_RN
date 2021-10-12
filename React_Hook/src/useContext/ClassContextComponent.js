import React, { Component } from 'react';
import { ThemeContext } from '.';

export default class ClassContextComponent extends Component {
  themeStyles = (dark) => {
    return {
      backgroundColor: dark ? '#333' : '#ccc',
      color: dark ? '#ccc' : '#333',
      padding: '2rem',
      margin: '2rem',
    };
  };

  render() {
    return (
      <ThemeContext.Consumer>
        {(darka) => {
          return <div style={this.themeStyles(darka)}>Class Theme</div>;
        }}
      </ThemeContext.Consumer>
    );
  }
}
