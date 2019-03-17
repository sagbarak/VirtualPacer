import React, { Component } from 'react';
import './App.css'
import PuzzleBord from './PuzzleBord';
class Bord extends Component {
  
    render() {
        let gridSize = this.props.gridSize;
        let bMap= [];
        for (let i=0; i<gridSize * gridSize; i++) {
        
       
             let boxOrder ={
               BOrder: i+100,
               };
               bMap.push(boxOrder);
            }
       // let bMap= this.props.boxMap;
        console.log("bmap = = = = " +bMap)
        let str="repeat("+this.props.gridSize+", auto)" ;
        let bordMap = bMap.map(bm => <PuzzleBord gridSize={this.props.gridSize} boxOrder= {bm.BOrder} />);
          
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