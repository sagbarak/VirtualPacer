import React, { Component } from 'react';
import PuzzleImg from '../graphics/puzzle-game.png';
import MemImg from '../graphics/memory-games.png';

const chooseStyle={

  cursor: "pointer",
  padding: "1%",
  width: "30%",
  height: "50%"
}


class HomePage extends Component {
  constructor(props){
    super(props);

    this.state = {
      UserId: this.props.location.state.userId,
      homeScrn: true,
      puzzleScrn: false,
      memScrn: false,
    }

    this.handleMemGame = this.handleMemGame.bind(this);
    this.handlePuzzleGame = this.handlePuzzleGame.bind(this);
  }

  render() {
    console.log(this.props.location.state.userId);
    return (
        <div>
          <div style={{position:"static",marginLeft:"45%",marginRight:"35%",marginTop:"3%"}}>
            <h1 style={{color:"white"}}>Choose a game</h1>
          </div>
          <div style={{marginLeft:"37%",marginTop:"5%"}}>
            <img src={PuzzleImg} onClick={this.handlePuzzleGame} style={chooseStyle}/>
            <img src={MemImg} onClick={this.handleMemGame} style={chooseStyle}/>
          </div>
          <div style={{clear:"both"}}>
            <h2 style={{float:"left",marginLeft:"41%"}}>Puzzle Game</h2>
            <h2 style={{float:"right",marginRight:"27%"}}>Memory Game</h2>
          </div>
        </div>
    );
  }

  handleMemGame(){
    this.props.history.push({
      pathname:'/memgame',
      state:{userId: this.state.UserId }
    });
  }

  handlePuzzleGame(){
    this.props.history.push({
      pathname:'/puzzlegame',
      state:{userId: this.state.UserId }
    });
  }

}

export default HomePage;