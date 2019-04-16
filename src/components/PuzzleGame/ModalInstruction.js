import './App.css'
import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import Modal from 'react-modal';

class ModalIstruction extends Component {
    constructor(props){
        super(props);
        this.state={
            instruction: true
        }
    }
    handleCloseModal(){
        this.setState({instruction: false});
        //var x = document.getElementById("Modal");
        //   console.log("image is ======== "+x) 
           //var y = document.getElementById("400");
          // x.style.display = "none";         
        //this.state.instruction = false
        //alert("close : "+ this.state.instruction)
        //ReactDOM.render(document.getElementById("Modal"))
        //return this.state.instruction
      }

      handleOpenModal(){
        this.setState({instruction: true});
        //var x = document.getElementById("Modal");
  
        //x.style.display = "block";
  
        //this.state.instruction = true
        //alert("open : "+ this.state.instruction)
        //ReactDOM.render(this.mod ,document.getElementById("Modal"))
        //return this.state.instruction
      }
  

    render(){
        const modalStyle ={
            overlay: {
              position: 'fixed',
              top: 30,
              left: 70,
              right: 70,
              bottom: 30,
              backgroundColor: 'rgba(255, 255, 255, 0.0)'
            },
            content: {
              position: 'absolute',
              top: '150px',
              left: '200px',
              right: '200px',
              bottom: '150px',
              border: '1px solid #ccc',
              background: '#fff',
              overflow: 'auto',
              WebkitOverflowScrolling: 'touch',
              borderRadius: '8px',
              outline: 'none',
              padding: '20px'
            }
        }
        return(
        <div id = "Modal">
         <Modal isOpen={this.state.instruction} style={this.modalStyle}>
                    <h3>Puzzle Game</h3>
                    <p>In this game, there are puzzle pieces that in the right combination will create a fixed image.</p>
                    <p>Your goal is to find this combination and to restore the picture. You have the whole image on the left to help you.</p>
                    <p>At the end of the level your results will be shown to you</p>
                    <p>Notice! if you drag a piece over another piece they will switch, mistake will be considered only if the piece that you drag isn't in the right place</p>

                    <h5>Good Luck!</h5>
                    <Button className="btn btn-success" onClick={this.handleCloseModal.bind(this)}>OK</Button>
                </Modal>  
               
                <div style={{padding:"0.5%"}}><Button bsStyle="light" onClick={this.handleOpenModal.bind(this)}>Instruction</Button></div>
         </div>
   

        );


    
    }
}
export default ModalIstruction;
