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
import './MemGame.css';

Modal.setAppElement(document.getElementById('root'))

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
class MemGame extends Component {
    constructor(props) {
        super(props);

        this.state = {
            imageList: [
                card2, card3, card4, card5, card6, card7, card8, card9, card10, card11, card12, card13, card14, card15, card16, card17, card18
            ],
            rows: 2,
            columns: 5,
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
                        <p>Each time you turn two different card it will count as a mistake, so pay attention!</p>
                        <p>At the end of the level your results will be shown to you</p>

                        <h5>Good Luck!</h5>
                        <Button className="btn btn-success" onClick={this.handleCloseModal.bind(this)}>OK</Button>
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