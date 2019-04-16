import React, { Component } from 'react';
import './App.css'
import PuzzleBord from './PuzzleBord';
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
        let gridSize = this.props.gridSize;
        //checkWin =  this.props.checkWin();
        let bMap= [];
        let startTimer=this.props.startTime;
        let isFinished= this.props.isFinished;
        for (let i=0; i<gridSize * gridSize; i++) {
        
       
             let boxOrder ={
               BOrder: i+100,
               };
               bMap.push(boxOrder);
            }
       // let bMap= this.props.boxMap;
        //console.log("bmap = = = = " +bMap)
        let str="repeat("+this.props.gridSize+", auto)" ;
        let bordMap = bMap.map(bm => <PuzzleBord gridSize={this.props.gridSize} checkWin ={()=>this.checkWin()} mistakes={()=>this.mistakes()} moves={()=>this.moves()}startTime={this.props.startTime} isFinished={this.props.isFinished} boxOrder= {bm.BOrder} />);
          
        const bord_style = {
            
                display: "grid",
                'grid-gap': '0px',
                width: ((this.props.gridSize-1)),
                'grid-template-columns': str  ,
                
                /*'grid-template-rows': str ,*/
                
              
        };
        
        return (
            <div  class="grid-container" style={bord_style}>
               {bordMap}
            </div>
        );
    }
}

export default Bord;