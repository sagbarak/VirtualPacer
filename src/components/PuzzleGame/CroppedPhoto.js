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
        this.props.checkWin();
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
    handleCloseModal(){
        this.setState({isFinished: false});
    }

    handleNextLevel(){
        this.handleCloseModal();
        
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
            

            <div draggable="true" onDragStart={event=>this.drag(event,id_num)} onDrop={event=> this.drop(event)} onDragOver={event=> this.allowDrop(event)} id={id_num} style={puzzle_style}>

            </div>
            
        );
    }
}

export default CroppedPhoto;
