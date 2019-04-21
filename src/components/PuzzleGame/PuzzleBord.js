import React, { Component } from 'react';
import './App.css'
import App from './App';

import { Button } from 'react-bootstrap';

class PuzzleBord extends Component {
    state = {
        startTimer: this.props.startTime,
       isFinished: this.props.isFinished
        
    }
    checkWin()
    {
        this.props.checkWin();   
    }

    allowDrop(ev) {
        ev.preventDefault();
        
      }
      
              
      
      drop(ev) {
        ev.preventDefault();
        this.props.moves();
        var data = ev.dataTransfer.getData("Text");
        if(document.getElementById(data)!=null){
          ev.target.appendChild(document.getElementById(data));
          var data2 = parseInt(data)+100;
          if(data2==ev.target.id){
          this.checkWin();
          }

          else(
            this.props.mistakes() 
          )
        }
      }
  

    render() {
        const box_order=this.props.boxOrder;
        const puzzleBord_style = {
            width: (486/this.props.gridSize),
            height: (486/this.props.gridSize),
            "background-color": "rgba(180, 180, 200, 0.3)",
            transpernt: "20%",
            /*padding: 10px;*/
            border: 1+"px solid #aaaaaa"
            
        };
        return (
        
      
          <div  id={box_order} onDrop={event=> this.drop(event)} onDragOver={event=> this.allowDrop(event)} draggable = "false" style={puzzleBord_style}>

            </div>
         
        );
    }
}

export default PuzzleBord;
