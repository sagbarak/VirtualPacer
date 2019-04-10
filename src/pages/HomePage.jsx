import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import PuzzleImg from '../graphics/puzzle-game.png';
import MemImg from '../graphics/memory-games.png';

const chooseStyle={
  cursor: "pointer",
  padding: "5px"
}


class HomePage extends Component {
  constructor(props){
    super(props);

    this.state = {
      homeScrn: true,
      puzzleScrn: false,
      memScrn: false,
    }

    this.handleMemGame = this.handleMemGame.bind(this);
    this.handlePuzzleGame = this.handlePuzzleGame.bind(this);
  }

  render() {
    return (
        <div>
          <h1 style={{color:"white",position:"relative",marginLeft:"50%",marginTop:"3%"}}>Choose a game</h1>
          <div style={{marginLeft:"37%"}}>
            <img src={PuzzleImg} onClick={this.handlePuzzleGame} style={chooseStyle}/>
            <img src={MemImg} onClick={this.handleMemGame} style={chooseStyle}/>
          </div>
          <div style={{clear:"both"}}>
            <h2 style={{float:"left",marginLeft:"42%"}}>Puzzle Game</h2>
            <h2 style={{float:"right",marginRight:"27%"}}>Memory Game</h2>
          </div>
        </div>
    );
  }

  handleMemGame(){
    this.props.history.push('/memgame');
  }

  handlePuzzleGame(){
    this.props.history.push('/puzzlegame');
  }

}

export default HomePage;