import React, { Component } from 'react';

//modules
import Board from './components/Board';

//CSS
import './App.css';



class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="container flex">
          <Board>
          </Board>
        </div>
      </div>
    );
  }
}

export default App;
