import './App.css'
import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import Modal from 'react-modal';
import example from '../../graphics/puzzleinst.JPG';

const instButtonStyle = {
  position: "absolute",
  bottom:"92%",
  padding: "0.5%"
}
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
            marginTop: "10%",
            marginLeft: "20%",
            marginRight: "20%",
            marginBottom: "1%",
            backgroundColor: 'rgba(255, 255, 255, 0.0)'
        },
        content: {
            position: 'absolute',
            marginLeft: "5%",
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
           <div style={instButtonStyle}><Button bsStyle="warning" onClick={this.handleOpenModal.bind(this)}>Instruction</Button></div>

         <Modal isOpen={this.state.instruction} style={modalStyle}>
                    <h3>Puzzle Game</h3>
                    <p>In this game you need to build the puzzle as shown on the picture.</p>
                    <p>Below are the puzzle pieces to build the puzzle.</p>
                    <p>Drag them to the right square on the right board.</p>
                    <p>Can you do it faster than your opponent?</p>

                    <h5>Good Luck!</h5>
                    <Button className="btn btn-warning" onClick={this.handleCloseModal.bind(this)}>Let's Go!</Button>
                    <h6 style={{paddingTop:"2%"}}>Example:</h6>
                    <img src={example} style={{width:"60%",padding:0,position:"relative", top:"3%", left:"15%"}} />
                </Modal>  
               
               
         </div>
   

        );


    
    }
}
export default ModalIstruction;
