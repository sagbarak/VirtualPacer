import React, { Component } from 'react';


class PacerPuzzleBord extends Component {
    state = {
        startTimer: this.props.startTime,
       isFinished: this.props.isFinished,

    }
    checkWin()
    {
//        this.props.checkWin();   
    }

    
      
              

    render() {

        const box_order=this.props.boxOrder;
        const puzzleBord_style = {
            width: (300/this.props.gridSize),
            height: (300/this.props.gridSize),
            "background-color": "rgba(180, 180, 200, 0.3)",
            transpernt: "20%",
            /*padding: 10px;*/
            border: 1+"px solid #aaaaaa"
            
        };
        return (
      
          <div  id={box_order} draggable = "false" style={puzzleBord_style}>
             
          </div>
    

        );
    }
}

export default PacerPuzzleBord;
