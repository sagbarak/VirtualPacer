import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import MemoryGame from '../components/MemoryGame/ChooseLevel';
import PuzzleGame from '../components/PuzzleGame/App'
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

    this.toggleHomeScrn = this.toggleHomeScrn.bind(this);
    this.toggleMem = this.toggleMem.bind(this);
    this.togglePuzzle = this.togglePuzzle.bind(this);
  }

  render() {
    return (
      <div>
        {this.state.homeScrn?
        <div style={{position:"relative", left:"50%",top:"20%"}}>
          <h1 style={{color:"white",position:"relative",left:"30%"}}>Choose a game</h1>
          <div>
            <img src={PuzzleImg} onClick={this.togglePuzzle} style={chooseStyle}/>
            <img src={MemImg} onClick={this.toggleMem} style={chooseStyle}/>
          </div>
          <div style={{clear:"both"}}>
            <h2 style={{float:"left",marginLeft:"15%"}}>Puzzle Game</h2>
            <h2 style={{float:"right",marginRight:"10%"}}>Memory Game</h2>
          </div>
        </div>
        :
        this.state.puzzleScrn?
          <PuzzleGame /> : <MemoryGame />
        }
      </div>
    );
  }

  togglePuzzle(){
    this.setState({homeScrn:false,puzzleScrn:true});
  }
  toggleMem(){
    this.setState({homeScrn:false,memScrn:true});
  }
  toggleHomeScrn(){
    this.setState({homeScrn:true,puzzleScrn:false, memScrn: false});
  }
}

export default HomePage;