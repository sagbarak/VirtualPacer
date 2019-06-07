import React, { Component } from 'react';
import Modal from 'react-modal';
import { Button } from 'react-bootstrap';

Modal.setAppElement(document.getElementById('root'))

const chooseStyle = {

  cursor: "pointer",
  padding: "1%",
  width: "30%",
  height: "50%"
}
const modalStyle = {
  overlay: {
    position: 'fixed',
    marginTop: "10%",
    marginLeft: "20%",
    marginRight: "20%",
    marginBottom: "10%",
    backgroundColor: 'rgba(255, 255, 255, 0.0)'
  },
  content: {
    position: 'absolute',
    marginLeft: "5%",
    border: '1px solid #ccc',
    background: '#fff',
    overflow: 'auto',
    WebkitOverflowScrolling: 'touch',
    borderRadius: '8px',
    outline: 'none',
    padding: '20px'
  }
}

class HomePage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      UserId: this.props.location.state.userId,
      homeScrn: true,
      puzzleScrn: false,
      memScrn: false,
      instruction: true
    }

    this.handleMemGame = this.handleMemGame.bind(this);
  }

  render() {
    console.log(this.props.location.state.userId);
    return (
      <div>
        <Modal isOpen={this.state.instruction} style={modalStyle}>
          <div style={{ marginLeft: "3%", marginTop: "2%" }}>
            <h3>Welcome!</h3>
            <p>You about to play two type of games: Puzzle & Memory Game</p>
            <p>For each game you will need to pass three levels with increasing difficulty.</p>
            <p>With you an opponent will play the same level as you,</p>
            <p>Your porpose is to finish each level as faster as you can. But in the most efficient way!</p>
            
            <h5>Good Luck!</h5>
            <Button className="btn btn-warning" onClick={() => this.handleMemGame()}>OK</Button>
          </div>
        </Modal>
      </div>
    );
  }

  handleMemGame() {
    this.props.history.push({
      pathname: '/memgame',
      state: { userId: this.state.UserId }
    });
  }

  /* handlePuzzleGame(){
     this.props.history.push({
       pathname:'/puzzlegame',
       state:{userId: this.state.UserId }
     });
   }*/

}

export default HomePage;