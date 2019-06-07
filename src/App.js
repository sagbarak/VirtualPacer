import React, { Component } from 'react';
import { BrowserRouter, Route, } from 'react-router-dom';
import HomePage from './pages/HomePage';
import MemoryGame from './components/MemoryGame/MemGame';
import PuzzleGame from './components/PuzzleGame/App';
import CreateUser from './components/Users/CreateUser';
import EndGame from './pages/EndGame';
import Logo from './graphics/logo4.png';
import './components/background.css';
import LogoTB from './graphics/LogoTB.jpg';

const logoStyle={
  padding:0,
  margin:0,
  position: "absolute",
  left:"41%",
  right:"50%",
  height:"25%"
}
const pageStyle={
  backgroundColor: "rgb(245,231,194)",
  position: "absolute",
  top: "20%",
  width:"100%",
  height: "80%"
}

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <div>
        <img src={LogoTB} style={logoStyle}/>
        </div>
        <BrowserRouter>
          <div style={pageStyle}>
          <Route exact path="/" component={CreateUser} />
          <Route path="/gameselect" component={HomePage} />
          <Route path="/memgame" component={MemoryGame} />
          <Route path="/puzzlegame" component={PuzzleGame} />
          <Route path="/endgame" component={EndGame} />
          </div>
        </BrowserRouter>
      </React.Fragment>
    );
  }
}

export default App;
