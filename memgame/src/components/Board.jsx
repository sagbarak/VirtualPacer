import React, { Component } from 'react';
import Card from './Card';
import uuid from 'uuid';
import '../components/background.css';
import {BrowserRouter as Router, Route } from 'react-router-dom';
import Button from 'react-bootstrap/lib/Button';
import Timer from './timer';
import FinishPopup from './FinishPopup';

const boardStyle = {
    borderRadius: "10px",
    width: "60%",
    height: "100%",
    padding: "2%",
    backgroundColor: 'rgba(245,232,196,0.6)',
};

const titleStyle={
    color: "black",
    margin: "auto",
    textAlign: "center"
}

const cardWrapper={

    margin: "auto",
    width: "60%",
    height: "80%",
}

const sleep = (milliseconds) => {
    return new Promise(resolve => setTimeout(resolve,milliseconds));
}


class Board extends Component {
    state = { 
        board: this.initialBoard(this.props.rows,this.props.columns),
        numOfOpenCards: 0,
        lastId: "",
        matchCounter:0,
        resetRequest: false,
        isFinished: false
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
                    <h1 style={titleStyle}>Memory Game</h1>
                    <Timer reset={this.state.resetRequest} />
                    <div>
                        <Button onClick={()=>this.resetGame()} type="button" className="btn btn-secondary">Reset</Button>
                    </div>
                    <div style={cardWrapper}>
                       {this.renderBoard()}
                       {this.checkIfGameOver()}
                       {this.state.isFinished ? (
                       <FinishPopup nextLevel={this.props.nextLevel} />) : null
                       }

                    </div>
                    
                </div>
            );
        }

    resetGame(){
        let newState = this.state;
        newState.board = this.initialBoard(this.props.rows,this.props.columns);
        newState.numOfOpenCars= 0;
        newState.lastId="";
        newState.matchCounter=0;
        newState.resetRequest=true;
        newState.isFinished=false;
        this.setState(newState);
    }

    flipCard = (id) => {
        let newState = this.state;
        console.log("id " + id);
        console.log("last id " + newState.lastId);
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
                //alert("woo-hoo!!");  
                this.setState({isFinished: true});
                //this.resetGame();
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