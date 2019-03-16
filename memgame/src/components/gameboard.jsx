import React, { Component } from 'react';
import Card from '../components/card';
import blankCard from '../graphics/blank.png';
import card1 from '../graphics/card1.jpg';
import card2 from '../graphics/card2.jpg';
import card3 from '../graphics/card3.png';
import card4 from '../graphics/card4.jpg';
import card5 from '../graphics/card5.png';
import card6 from '../graphics/card6.png';
import card7 from '../graphics/card7.png';
import card8 from '../graphics/card8.png';
import card9 from '../graphics/card9.png';
import card10 from '../graphics/card10.png';
import card11 from '../graphics/card11.png';
import card12 from '../graphics/card12.jpg';
import card13 from '../graphics/card13.jpg';
import card14 from '../graphics/card14.png';
import card15 from '../graphics/card15.jpg';


const boardStyle = {
    borderRadius: "10px",
    width: "60%",
    height: "800px",
    backgroundColor: 'rgba(245,232,196,0.6)',
};

const titleStyle={
    color: "black",
    margin: "auto",
    textAlign: "center"
}
const card={
    color: "gray",
    width: "20px",
    height: "40px"
}
const cardWrapper={
    margin: "auto",
    width: "60%",
    height: "250px",
}

const cardStyle={
    width:100,
    height:100,
    padding: 10,
    borderRadius: 60,
    border: "black"
}
const sleep = (milliseconds) => {
    return new Promise(resolve => setTimeout(resolve,milliseconds));
}

class GameBoard extends Component {
    imageList=[card1,card2,card3,card4,card5,card6,card7,card8,card9,card10,card11,card12,card13,card14,card15];
    state = { 
        board: this.initialBoard(this.props.rows,this.props.columns),
        boardImages: this.chooseImages(this.props.rows,this.props.columns),
        boardStates: this.initialBoardState(this.props.rows,this.props.columns),
        boardPairs: this.initialBoardPairs(this.props.rows,this.props.columns),
        numOfOpenCars: 0,
        lastIndex: -1,
        matchCounter:0
    }

    flipCard(index){
        let StateChange = this.state;
        
        if(!StateChange.boardStates[index]){ // if the state of the card is false, turn it face up and count the number of open cards
           console.log("fliped card" + index);
            StateChange.boardStates[index]=true;  
            StateChange.board[index]=this.state.boardImages[index];
            StateChange.numOfOpenCars+=1;
        }

        if(StateChange.numOfOpenCars===2){ // if there is two open cards, compare between them
            console.log("check for match");
            if(StateChange.boardImages[index]===StateChange.boardImages[StateChange.lastIndex]){ //if they both has same image than change the change their values in boardPairs to true
                console.log("MATCH");
                StateChange.boardPairs[index]=true;
                StateChange.boardPairs[StateChange.lastIndex]=true;
                StateChange.matchCounter++;
            }
            else{ //else, turn them to face down
                sleep(500).then(()=>{
                StateChange.board[index]=blankCard;
                StateChange.boardStates[index]=false;  
                StateChange.board[StateChange.lastIndex]=blankCard;
                StateChange.boardStates[StateChange.lastIndex]=false;  
                });

                console.log("NO MATCH");
            }
            StateChange.numOfOpenCars=0; //reset open cards counter
        }
        if(StateChange.numOfOpenCars===1){ //if only one card is open then save the index of the last card
            StateChange.lastIndex=index;
        }
        if(StateChange.matchCounter===(StateChange.board.length/2)){
            alert("Woo-hoo!!");
        }
        this.setState(StateChange);
    }



    //render board base on Card components
    renderBoard(){
        return(this.state.board.map((image,index)=>{ return (<img onClick={()=>this.flipCard(index)} key={index} src={image} style={cardStyle} />)}));
    }

    render() { 
        return ( <div>
            <div style={boardStyle}>
                <h1 style={titleStyle}>Memory Game</h1>
                <div style={cardWrapper}>
                    {this.renderBoard()}
                </div>
            </div>
        </div> );
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
        let imageList = this.imageList;
        const numOfPics=(rows*columns);
        while(data.length!=numOfPics){
           selectedImage = imageList[Math.floor(Math.random()*imageList.length)];
           if(!data.includes(selectedImage)){ //make there's no two pairs of the same picture
                data.push(selectedImage,selectedImage);
           }
        }
        data=this.shuffleImageList(data);
        //data=this.transferImageArrayTo2DArray(data,rows,columns);
        return data;
    }
    
    initialBoard(rows,columns){
        let board=[];
        const boardSize = rows*columns;
        for(let index=0;index<boardSize;index++){
            board[index]=blankCard;
        }
        return board;
    }
    
    initialBoardState(rows,columns){
        let boardState=[];
        const boardSize = rows*columns;
        for(let index=0;index<boardSize;index++){
            boardState[index]=false;
        }
        return boardState;
    }

    initialBoardPairs(rows,columns){
        let boardState=[];
        const boardSize = rows*columns;
        for(let index=0;index<boardSize;index++){
            boardState[index]=false;
        }
        return boardState;
    }

    transferImageArrayTo2DArray(board,rows,columns){
        let newBoard=[];
        let index=0;
        for(let r=0;r<rows;r++){
            newBoard[r]=[];
                for(let c=0;c<columns;c++){
                    newBoard[r][c]=board[index];
                    index++;
                }
            }
        return newBoard;
    }

    cardfliped(){
        console.log(2 + " fliped!");
    }

}
 
export default GameBoard;