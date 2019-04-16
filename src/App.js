import React, { Component } from 'react';
import { BrowserRouter, Route, } from 'react-router-dom';
import HomePage from './pages/HomePage';
import MemoryGame from './components/MemoryGame/MemGame';
import PuzzleGame from './components/PuzzleGame/App';
import CreateUser from './components/Users/CreateUser';
import EndGame from './pages/EndGame';
import Logo from './graphics/logo4.png';
import './components/background.css';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
      <div className="bgStyle">
        <img src={Logo} style={{position:"absolute",left:"3%"}}/>
        <Route exact path="/" component={CreateUser} />
        <Route path="/gameselect" component={HomePage} />
        <Route path="/memgame" component={MemoryGame} />
        <Route path="/puzzlegame" component={PuzzleGame} />
        <Route path="/endgame" component={EndGame} />
      </div>
      </BrowserRouter>
    );
  }
}

export default App;
