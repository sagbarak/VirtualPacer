import React, { Component } from 'react';
import './App.css'

class CroppedPhoto extends Component {
    drag(ev,id) {
        ev.dataTransfer.setData("id", id);
        console.log("drag data = "+ id);
      }
    render() {
       
        const puzzle_style = {
            backgroundImage: "url(" + this.props.img_path + ")",
            width: (435/this.props.gridSize),
            height: (486/this.props.gridSize),
            backgroundPosition: this.props.startpxX + " " + this.props.startpxY,
            backgroundSize: (this.props.gridSize * 100) + "%",
            border: 1+"px solid #aaaaaa"
        };
        const id_num=this.props.idNum
        return (
            
            <div draggable="true"  onDragStart={event=>this.drag(event,id_num)} id={id_num} style={puzzle_style}>

            </div>
           
        );
    }
}

export default CroppedPhoto;
