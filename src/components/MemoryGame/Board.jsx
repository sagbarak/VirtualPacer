import React, { Component } from 'react';
import Card from './card';
import uuid from 'uuid';
import Timer from './timer';
import FinishPopup from './FinishPopup';
import 'bootstrap/dist/css/bootstrap.css';
import { Button } from 'react-bootstrap';
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
let rowsVar = 2;
let columnsVar = 5; 

class Board extends Component {
    state = { 
        board: this.initialBoard(this.props.rows,this.props.columns),
        numOfOpenCards: 0,
        lastId: "",
        matchCounter:0,
        isFinished: false,
        firstClick: false,
        resetRequest: false
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
                <div style={boardStyle}>
                    <div>
                        <div style={{margin:"auto"}}><h1 style={titleStyle}>Memory Game</h1></div>
                        <Button variant="info" onClick={this.props.openInsturction}>Instruction</Button>
                        <Timer firstClick={this.state.firstClick} isFinished={this.state.isFinished} />
                        <div>
                            <Button variant="info" onClick={()=>this.resetGame(rowsVar,columnsVar)}>Reset</Button>
                        </div>
                        <div style={cardWrapper}>
                            {this.renderBoard()}
                            {this.checkIfGameOver()}
                            {this.state.isFinished ? (<FinishPopup nextLevel={()=>this.resetGame(rowsVar+1,columnsVar+1)} />) : null }
                        </div>
                    </div>
                </div>
            );
        }

        
    resetGame=(rows,columns)=>{
        rowsVar=rows;
        columnsVar=columns;
        let newState = Object.assign({},this.state);
        newState.board = this.initialBoard(rows,columns);
        newState.numOfOpenCars = 0;
        newState.lastId="";
        newState.isFinished=false;
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
    }


    checkIfGameOver(){
        if(this.state.matchCounter===(this.state.board.length/2)){
            sleep(200).then(()=>{
                this.setState({isFinished: true});
            })
            
        }
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