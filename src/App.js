import React from 'react';
import './App.css'
import Board from './Board.js';

class App extends React.Component {

  render() {
    return (
      <header key="header" className="App-header">
        <div key="app" className="App">
          <Board rows="5" cols="5"/>
        </div>
      </header>
    );
  }
}

export default App;
