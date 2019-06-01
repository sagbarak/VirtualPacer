import React, { Component } from 'react';
import './App.css'
import Modal from 'react-modal';
import { Button } from 'react-bootstrap';
import { ECANCELED } from 'constants';

class CroppedPhoto extends Component {
    state = {
        startTimer: this.props.startTime,
        isFinished: this.props.isFinished
        
    }
    drag(ev,id) {
        ev.dataTransfer.setData("Text", ev.target.getAttribute('id'))
      }
      checkWin()
      {
        this.props.checkWin();
        }
    mistakes(){
        this.props.mistakes();
    }
    moves(){
        this.props.moves();
    }
    allowDrop(ev){
        ev.preventDefault();
    }
    drop(ev){
        this.moves();
        ev.preventDefault();
        let data = ev.dataTransfer.getData("Text");
        if(document.getElementById (data)!=null){
            let src = document.getElementById (data);
            let srcRepalce = src.parentNode;
            let srcParent = ev.target.parentNode;
            srcParent.appendChild(document.getElementById(data));
            srcRepalce.appendChild(document.getElementById(ev.target.id));
            let data2 = parseInt(data)+100;
            if(data2==srcParent.id ){
                this.checkWin();
            }
            else
            {
                this.mistakes();
                this.checkWin();
            }
        }
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
            width: (300/this.props.gridSize),
            height: (300/this.props.gridSize),
            backgroundPosition: this.props.startpxX + " " + this.props.startpxY,
            backgroundSize: (this.props.gridSize * 100) + "%",
            border: 1+"px solid #aaaaaa",
           
        };
        const id_num=this.props.idNum
        return (
            

            <div draggable="true" onDragStart={event=>this.drag(event,id_num)} onDrop={event=> this.drop(event)} onDragOver={event=> this.allowDrop(event)} id={id_num} style={puzzle_style}>

            </div>
            
        );
    }
}

export default CroppedPhoto;
