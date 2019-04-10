import React, { Component } from 'react';
import './App.css'
import Modal from 'react-modal';
import { Button } from 'react-bootstrap';

class CroppedPhoto extends Component {
    state = {
        startTimer: this.props.startTime,
        isFinished: this.props.isFinished
        
    }
    drag(ev,id) {
        ev.dataTransfer.setData("id", id);
        console.log("drag data = "+ id);
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
          if(flag){
              alert("win");
              var millis=Date.now()-this.props.startTime;
              this.setState({startTime: millis/1000, isFinished:true})
               this.state.startTime=millis/1000;
               this.state.isFinished=true;
             }
          
        }
    allowDrop(ev){
        ev.preventDefault();
    }
    drop(ev){
        ev.preventDefault();
        var data = ev.dataTransfer.getData("id");
        var src = document.getElementById (data);
        var srcRepalce = src.parentNode;
        var srcParent = ev.target.parentNode;
        srcParent.appendChild(document.getElementById(data));
        srcRepalce.appendChild(document.getElementById(ev.target.id));
        this.checkWin();
    }
    render() {
       
        const puzzle_style = {
            backgroundImage: "url(" + this.props.img_path + ")",
            width: (486/this.props.gridSize),
            height: (486/this.props.gridSize),
            backgroundPosition: this.props.startpxX + " " + this.props.startpxY,
            backgroundSize: (this.props.gridSize * 100) + "%",
            border: 1+"px solid #aaaaaa"
        };
        const id_num=this.props.idNum
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

            <div draggable="true" onDragStart={event=>this.drag(event,id_num)} onDrop={event=> this.drop(event)} onDragOver={event=> this.allowDrop(event)} id={id_num} style={puzzle_style}>

            </div>
            </div>
        );
    }
}

export default CroppedPhoto;
