import React, { Component } from 'react';
import Card from './card';
import uuid from 'uuid';
import Timer from './timer';
import 'bootstrap/dist/css/bootstrap.css';
import { Button } from 'react-bootstrap';
import Modal from 'react-modal';
const boardStyle = {
    borderRadius: "10px",
    width: "60%",
    height: "100vh",
    backgroundColor: 'rgba(245,232,196,0.6)',
};

const titleStyle={
    width: "100%",
    color: "black",
    position: "center",
    margin: "auto",
    textAlign: "center"
}

const cardWrapper={
    margin: "auto",
    width: "60%",
    height: "80%",
}
const btnStyle={
    width: "50px",
    height: "25px",
    margin: "auto",
    textAlign: "center",
    fontSize: "13px"
}

const sleep = (milliseconds) => {
    return new Promise(resolve => setTimeout(resolve,milliseconds));
}

class Board extends Component {   
    constructor(props){
        super(props);
        this.state={
            board: this.initialBoard(this.props.rows,this.props.columns),
            numOfOpenCards: 0,
            lastId: "",
            matchCounter:0,
            clickCount: 0, 
            isFinished: false,
            firstClick: false,
            resetRequest: false,
            time: 0
        }
        this.resetGame=this.resetGame.bind(this);
    }
    

        renderBoard(){
            return( 
                this.state.board.map((card)=>{
                       return (<Card key={card.id} card={card} flipCard={this.flipCard} />)
                })
            )
        }
    

        render() { 
            return (  
                <div>
                    <div>
                        <Modal isOpen={this.state.isFinished}>
                        <h3>Well Done!!</h3>
                        <p>Time: {this.state.time}
                        </p>

                        <Button onClick={()=>{this.handleNextLevel()}}>Next Level</Button>
                        <Button onClick={()=>{this.resetGame()}}>Reset</Button>
                        <Button onClick={()=>{this.handleCloseModal()}}>Close</Button>
                        </Modal>
                    </div>
                    <div style={boardStyle}>
                        <div>
                            <div style={{margin:"auto"}}><h1 style={titleStyle}>Memory Game</h1></div>
                            <Button variant="info" onClick={this.props.openInsturction}>Instruction</Button>
                            <Timer firstClick={this.state.firstClick} isFinished={this.state.isFinished} onStop={this.setTimeResult} />
                            <div>
                                <Button variant="info" onClick={()=>this.resetGame()}>Reset</Button>
                            </div>
                            <div style={cardWrapper}>
                                {this.renderBoard()}
                            </div>
                        </div>
                    </div>
                </div>
            );
        }
    setTimeResult = (result) =>{
        this.setState({time: result});
        console.log(this.state.time);
    }
    handleCloseModal(){
        this.setState({isFinished: false});
    }

    handleNextLevel(){
        this.handleCloseModal();
        this.props.nextLevel();
        this.resetGame();
    }
    resetGame=()=>{
        let newState = Object.assign({},this.state);
        newState.board = this.initialBoard(this.props.rows,this.props.columns);
        newState.numOfOpenCars = 0;
        newState.lastId="";
        newState.isFinished=false;
        newState.clickCount=0;
        newState.matchCounter=0;
        newState.firstClick=false;
        this.setState(newState);
    }

    flipCard = (id) => {
        let newState = this.state;
        console.log("id " + id);
        console.log("last id " + newState.lastId);
        if(!newState.firstClick){
            newState.firstClick=true;
        }
        newState.board.map(card=>{
            if(card.id===id){ //find card by id
                if(!card.faceUp){ //if card is face down, you can flip it
                    newState.clickCount++;
                    if(newState.numOfOpenCards<2){ // if less then 2 cards are open you can flip with no check
                        card.faceUp=true;
                        newState.numOfOpenCards+=1;
                        console.log(newState.numOfOpenCards);
                    }
                    if(newState.numOfOpenCards===2){ //comparsion of cards 
                        console.log("2 cards check")
                        newState.board.map(card2=>{
                            if(card2.id===newState.lastId){
                                console.log("found second card");
                                if(card2.imgUrl===card.imgUrl){
                                    card.paired=true;
                                    card2.paired=true;
                                    newState.matchCounter++;
                                }
                                else if(card2.imgUrl!==card.imgUrl){
                                    sleep(200).then(()=>{
                                        card.faceUp=false;
                                        card2.faceUp=false;
                                    })
                                }
                            }
                        })
                        newState.numOfOpenCards=0;
                    }
                }
            }
        })
        newState.lastId=id;
        this.setState(newState);
        this.checkIfGameOver();
    }


    checkIfGameOver(){
        //if(!this.state.isFinished){
            if(this.state.matchCounter===(this.state.board.length/2)){
                sleep(200).then(()=>{
                    this.setState({isFinished: true});
                })
                
            }
        //}
    }

    shuffleImageList(imageList) {
        for (let i = imageList.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [imageList[i], imageList[j]] = [imageList[j], imageList[i]];
        }
        return imageList;
    }

    //choose random images at half size of board
    chooseImages(rows,columns){
        let data=[];
        let selectedImage;
        let imageList = this.props.imageList;
        const numOfPics=(rows*columns);
        while(data.length!==numOfPics){
           selectedImage = imageList[Math.floor(Math.random()*imageList.length)];
           if(!data.includes(selectedImage)){ //make there's no two pairs of the same picture
                data.push(selectedImage,selectedImage);
           }
        }
        data=this.shuffleImageList(data);
        return data;
    }
    
    initialBoard(rows,columns){
        let board=[];
        const imageData = this.chooseImages(rows,columns);
        const boardSize = rows*columns;
        for(let index=0;index<boardSize;index++){
            board[index]={
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