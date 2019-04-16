import React, { Component } from 'react';
import Modal from 'react-modal';

const modalStyle = {
    overlay: {
      position: 'fixed',
      marginTop: "10%",
      marginLeft: "20%",
      marginRight: "20%",
      marginBottom: "10%",
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
class EndGame extends Component {
    state = {  }
    render() { 
        return ( 
            <div>
                 <Modal isOpen={true} style={modalStyle}>
                    <div style={{ textAlign:"center",SmarginLeft:"40%",marginTop:"20%" }}>
                        <h2>Thank You!!</h2>
                    </div>
                </Modal>
            </div>
         );
    }
}
 
export default EndGame;