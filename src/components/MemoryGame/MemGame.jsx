import React, { Component } from 'react';
import Board from './Board';
import Modal from 'react-modal';
import { Button } from 'react-bootstrap';
import card2 from '../../graphics/card2.jpg';
import card3 from '../../graphics/card3.png';
import card4 from '../../graphics/card4.jpg';
import card5 from '../../graphics/card5.png';
import card6 from '../../graphics/card6.png';
import card7 from '../../graphics/card7.png';
import card8 from '../../graphics/card8.png';
import card9 from '../../graphics/card9.png';
import card10 from '../../graphics/card10.png';
import card11 from '../../graphics/card11.png';
import card12 from '../../graphics/card12.jpg';
import card13 from '../../graphics/card13.jpg';
import card14 from '../../graphics/card14.png';
import card15 from '../../graphics/card15.jpg';
import card16 from '../../graphics/card16.png';
import card17 from '../../graphics/card17.jpg';
import card18 from '../../graphics/card18.png';
import example from '../../graphics/meminst.jpg';
import './MemGame.css';

Modal.setAppElement(document.getElementById('root'))

const modalStyle = {
    overlay: {
        position: 'fixed',
        marginTop: "10%",
        marginLeft: "20%",
        marginRight: "30%",
        marginBottom: "5%",
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
class MemGame extends Component {
    constructor(props) {
        super(props);

        this.state = {
            imageList: [
                card2, card3, card4, card5, card6, card7, card8, card9, card10, card11, card12, card13, card14, card15, card16, card17, card18
            ],
            rows: 2,
            columns: 5,
            userId: this.props.location.state.userId,
            instruction: true,
            level: 1
        }

        console.log(this.props);
        this.handleLevelClick = this.handleLevelClick.bind(this);
    }

    handleCloseModal() {
        this.setState({ instruction: false });
    }

    handleOpenModal() {
        this.setState({ instruction: true });
    }
    render() {
        return (
            <div>
                <Modal isOpen={this.state.instruction} style={modalStyle}>
                    <div style={{ marginLeft: "3%", marginTop: "2%" }}>
                        <h3>Memory Game</h3>
                        <p>In this game, there are an even number of cards.</p>
                        <p>Your goal is to find all pairs of cards.</p>
                        <p>On the left side of the screen you will see your opponenet board and his progress.</p>
                        <p>Can you find all the pairs faster then your opponent?</p>

                        <h5>Good Luck!</h5>
                        <Button className="btn btn-warning" onClick={this.handleCloseModal.bind(this)}>Let's Go!</Button>
                        <h6 style={{paddingTop:"2%"}}>Example:</h6>
                        <img src={example} style={{width:"70%",padding:0,position:"relative", top:"62%", left:"10%"}} />
                    </div>
                </Modal>


                <div style={{ position: "relative" }}>
                    <Board rows={this.state.rows} columns={this.state.columns} imageList={this.state.imageList}
                        openInsturction={this.handleOpenModal.bind(this)} nextLevel={() => this.handleLevelClick()}
                        userId={this.state.userId} level={this.state.level} />
                </div>

            </div>
        );
    }

    handleLevelClick() {
        let nextlevel = this.state.level + 1;
        console.log("entry level" + nextlevel);
        if (nextlevel === 2) {
            this.setState({ rows: 3, columns: 4, level: nextlevel });
        }
        if (nextlevel === 3) {
            this.setState({ rows: 4, columns: 4, level: nextlevel });
        }
        if (nextlevel === 4) {
            console.log("next level")
            this.props.history.push({
                pathname: '/puzzlegame',
                state: { userId: this.state.userId }
            })
        }
        console.log("level:" + nextlevel);
    }


}


export default MemGame;