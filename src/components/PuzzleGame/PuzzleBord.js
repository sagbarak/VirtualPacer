import React, { Component } from 'react';
import './App.css'
import App from './App';
import Modal from 'react-modal';
import { Button } from 'react-bootstrap';

class PuzzleBord extends Component {
    state = {
        startTimer: this.props.startTime,
       isFinished: this.props.isFinished
        
    }
    checkWin()
    {
        let flag=true;
        var numB=this.props.gridSize*this.props.gridSize;   
        while(numB>0){
            var x = document.getElementById(100+(numB-1));
            var y=x.firstElementChild;
            if(y!=null){
                var number=parseInt(y.id)+100
                if(number!=x.id){
                    flag=false;
                }
             }
             else
                flag= false;
            numB--;
        }
        
        if (flag){
          var millis=Date.now()-this.props.startTime;
         this.setState({startTime: millis/1000, isFinished:true})
          this.state.startTime=millis/1000;
          this.state.isFinished=true;
        }
      
          
    }

    allowDrop(ev) {
        ev.preventDefault();
      }
      
              
      
      drop(ev) {
        ev.preventDefault();
        var data = ev.dataTransfer.getData("id");
        ev.target.appendChild(document.getElementById(data));
        var data2 = parseInt(data)+100;
        if(data2==ev.target.id){
         this.checkWin();
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
        <div>
            <div>
            
            <Modal isOpen={this.state.isFinished}>
                          <h3>Well Done!!</h3>
                          <p>Time: {this.state.startTime}
                          </p>
  
                          <Button onClick={()=>this.handleNextLevel()}>Next Level</Button>
                          <Button onClick={()=>this.resetGame()}>Reset</Button>
                          <Button onClick={()=>this.handleCloseModal()}>Close</Button>
                          </Modal>
          </div>
  
      
          <div  id={box_order} onDrop={event=> this.drop(event)} onDragOver={event=> this.allowDrop(event)} style={puzzleBord_style}>

            </div>
         
        </div>   
        );
    }
}

export default PuzzleBord;
