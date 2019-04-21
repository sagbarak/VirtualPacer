import React, { Component } from 'react';
import Card from './card';
import uuid from 'uuid';
import 'bootstrap/dist/css/bootstrap.css';
import { Button } from 'react-bootstrap';
import Modal from 'react-modal';
import axios from 'axios';

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

const btnStyle = {
    padding: "0.5%"
};

const titleStyle = {
    width: "100%",
    color: "black",
    position: "center",
    margin: "auto",
    textAlign: "center"
}

const cardWrapper = {
    position: "relative",
    left: "20%",
    top: "40px",
    width: "40%",
    height: "60%"
}

const sleep = (milliseconds) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds));
}

class Board extends Component {
    constructor(props) {
        super(props);
        this.state = {
            board: this.initialBoard(this.props.rows, this.props.columns),
            numOfOpenCards: 0,
            lastId: "",
            matchCounter: 0,
            moves: 0,
            isFinished: false,
            firstClick: false,
            resetRequest: false,
            seconds: 0,
            mistakes: 0
        }
        this.resetGame = this.resetGame.bind(this);
        this.stopCountingSeconds = this.stopCountingSeconds.bind(this);
        this.countSeconds = this.countSeconds.bind(this);
    }


    renderBoard() {
        return (
            this.state.board.map((card, index) => {
                return (<div><Card key={card.id} card={card} flipCard={this.flipCard} /></div>)
            })
        )
    }

    render() {
        return (
            <div>
                <Modal isOpen={this.state.isFinished} style={modalStyle}>
                    <div style={{ marginLeft: "3%", marginTop: "2%" }}>
                        <h3>Well Done!!</h3>
                        <p>Time: {this.state.seconds} seconds</p>
                        <p>You had {this.state.mistakes} mistakes</p>
                        

                        <div style={btnStyle}><Button style={btnStyle} bsStyle="success"
                            onClick={() => { this.handleNextLevel() }}>Next Level</Button></div>
                        <div style={btnStyle}><Button style={btnStyle} bsStyle="danger"
                            onClick={() => { this.resetGame() }}>Reset</Button></div>
                    </div>
                </Modal>

                <div>
                    <div style={cardWrapper}>
                        {this.renderBoard()}
                    </div>
                </div>

                <div style={{ position: "fixed", top: "35%", left: "3%" }}>
                    <div style={{ padding: "0.5%" }}><Button bsStyle="light" onClick={this.props.openInsturction}>Instruction</Button></div>
                </div>

            </div>
        );
    }
    setTimeResult = (result) => {
        this.setState({ time: result });
        console.log(this.state.time);
    }
    handleCloseModal() {
        this.setState({ isFinished: false });
    }

    handleNextLevel() {
        this.handleCloseModal();
        this.props.nextLevel();
        setTimeout(() => { this.resetGame() }, 300);
    }

    resetGame = () => {
        let newState = Object.assign({}, this.state);
        newState.board = this.initialBoard(this.props.rows, this.props.columns);
        newState.numOfOpenCars = 0;
        newState.lastId = "";
        newState.isFinished = false;
        newState.moves = 0;
        newState.matchCounter = 0;
        newState.firstClick = false;
        newState.seconds = 0;
        newState.mistakes = 0;
        this.setState(newState);
    }

    countSeconds() {
        this.timer = setInterval((() => {
            this.setState({ seconds: this.state.seconds + 1 });
        }).bind(this), 1000);
        console.log(this);
    }

    stopCountingSeconds() {
        console.log("stoping timer");
        console.log(this);
        clearInterval(this.timer);
    }

    flipCard = (id) => {
        let newState = this.state;
        console.log("id " + id);
        console.log("last id " + newState.lastId);
        if (!newState.firstClick) {
            newState.firstClick = true;
            this.countSeconds();
        }
        newState.board.map(card => {
            if (card.id === id) { //find card by id
                if (!card.faceUp) { //if card is face down, you can flip it
                    newState.moves++;
                    if (newState.numOfOpenCards < 2) { // if less then 2 cards are open you can flip with no check
                        card.faceUp = true;
                        newState.numOfOpenCards += 1;
                        console.log(newState.numOfOpenCards);
                    }
                    if (newState.numOfOpenCards === 2) { //comparsion of cards 
                        console.log("2 cards check")
                        newState.board.map(card2 => {
                            if (card2.id === newState.lastId) {
                                console.log("found second card");
                                if (card2.imgUrl === card.imgUrl) {
                                    card.paired = true;
                                    card2.paired = true;
                                    newState.matchCounter++;
                                }
                                else if (card2.imgUrl !== card.imgUrl) {
                                    sleep(500).then(() => {
                                        card.faceUp = false;
                                        card2.faceUp = false;
                                        this.setState({ mistakes: this.state.mistakes + 1 });
                                    })
                                }
                            }
                        })
                        newState.numOfOpenCards = 0;
                    }
                }
            }
        })
        newState.lastId = id;
        this.setState(newState);
        this.checkIfGameOver();
    }


    checkIfGameOver() {
        if (this.state.matchCounter === (this.state.board.length / 2)) {
            this.stopCountingSeconds();
            sleep(200).then(() => {
                this.setState({ isFinished: true });
            })
            this.sendResultsToDB();
        }
    }

    sendResultsToDB() {
        //get existing array of result from db to update
        axios.get('http://193.106.55.176:3000/vpdata/' + this.props.userId).then(
            res => {
                let resultArr = res.data.result;
                //add new results object to the array
                resultArr.push({
                    game: "memory",
                    time: this.state.seconds,
                    level: this.props.level,
                    mistakes: this.state.mistakes,
                    moves: this.state.moves,
                });
                //post to server the result array to update
                axios.post('http://193.106.55.176:3000/vpdata/update/' + this.props.userId, { result: resultArr })
                    .then(res => { console.log(res); });
            }
        )
    }


    shuffleImageList(imageList) {
        for (let i = imageList.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [imageList[i], imageList[j]] = [imageList[j], imageList[i]];
        }
        return imageList;
    }

    //choose random images at half size of board
    chooseImages(rows, columns) {
        let data = [];
        let selectedImage;
        let imageList = this.props.imageList;
        const numOfPics = (rows * columns);
        while (data.length !== numOfPics) {
            selectedImage = imageList[Math.floor(Math.random() * imageList.length)];
            if (!data.includes(selectedImage)) { //make there's no two pairs of the same picture
                data.push(selectedImage, selectedImage);
            }
        }
        data = this.shuffleImageList(data);
        return data;
    }

    initialBoard(rows, columns) {
        let board = [];
        const imageData = this.chooseImages(rows, columns);
        const boardSize = rows * columns;
        for (let index = 0; index < boardSize; index++) {
            board[index] = {
                id: uuid.v4(),
                imgUrl: imageData[index],
                faceUp: false,
                paired: false
            };
        }
        return board;
    }
}

export default Board;