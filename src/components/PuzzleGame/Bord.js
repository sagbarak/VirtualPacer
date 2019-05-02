import React, { Component } from 'react';
import './App.css'
import PuzzleBord from './PuzzleBord';
import PacerPuzzleBord from '../Pacer/PacerPuzzleBord';
class Bord extends Component {
  
    checkWin()
    {
        this.props.checkWin();
    }

    moves(){
        this.props.moves();
    }

    mistakes(){
        this.props.mistakes();
    }
    render() {
       
        let pacer= this.props.pacer
        let gridSize = this.props.gridSize;
        
        //checkWin =  this.props.checkWin();
        let bMap= [];
        let startTimer=this.props.startTime;
        let isFinished= this.props.isFinished;
        for (let i=0; i<gridSize * gridSize; i++) {
        
          
             let boxOrder ={
               BOrder: i+100,
               POrder: i+1000,
               };
               bMap.push(boxOrder);
        }
      
        let str="repeat("+this.props.gridSize+", auto)" ;
        let bordMap
        if(!pacer){
            bordMap = bMap.map(bm => <PuzzleBord draggable = "false" gridSize={this.props.gridSize} checkWin ={()=>this.checkWin()} mistakes={()=>this.mistakes()} moves={()=>this.moves()}startTime={this.props.startTime} isFinished={this.props.isFinished} boxOrder= {bm.BOrder} />);
        }
        else{
            bordMap = bMap.map(bm => <PacerPuzzleBord draggable = "false" gridSize={this.props.gridSize} score={this.props.score} startTime={this.props.startTime} isFinished={this.props.isFinished} boxOrder= {bm.POrder} />);  
        }
        const bord_style = {
            
                display: "grid",
                'grid-gap': '0px',
                width: ((this.props.gridSize-1)),
                'grid-template-columns': str  ,
                
                /*'grid-template-rows': str ,*/
                
              
        };
        
        return (
            
            <div class="grid-container" draggable = "false" style={bord_style}>
              
               {bordMap}
            </div>
        );
    }
}

export default Bord;