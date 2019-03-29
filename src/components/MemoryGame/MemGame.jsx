import React, { Component } from 'react';
import Board from './Board';
import Modal from 'react-modal';
import { Button } from 'react-bootstrap';
import card1 from '../../graphics/card1.jpg';
import card2 from '../../graphics/card2.jpg';
import card3 from '../../graphics/card3.png';
import card4 from '../../graphics/card4.jpg';
import card5 from '../../graphics/card5.png';
import card6 from '../../graphics/card6.png';
import card7 from '../../graphics/card7.png';
import card8 from '../../graphics/card8.png';
import card9 from '../../graphics/card9.png';
import card10 from '../../graphics/card10.png';
import card11 from '../../graphics/card11.png';
import card12 from '../../graphics/card12.jpg';
import card13 from '../../graphics/card13.jpg';
import card14 from '../../graphics/card14.png';
import card15 from '../../graphics/card15.jpg';
import card16 from '../../graphics/card16.png';
import card17 from '../../graphics/card17.jpg';


Modal.setAppElement(document.getElementById('root'))

const modalStyle ={
        overlay: {
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(255, 255, 255, 0.50)'
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
class MemGame extends Component {
   state={
        imageList: [
            card1,card2,card3,card4,card5,card6,card7,card8,card9,card10,card11,card12,card13,card14,card15,card16,card17
        ],
        rows: this.props.rows,
        columns: this.props.columns,
        instruction: true,
     }
    
   
    handleCloseModal(){
        this.setState({instruction:false});
    }

    handleOpenModal(){
        this.setState({instruction:true});
    }
    render() { 
        
        return ( 
            <div className='bgStyle'>
                <Modal isOpen={this.state.instruction} style={modalStyle}>
                    <h3>Memory Game</h3>
                    <p>In this game you need to find pair of cards.
                        Find pairs as fast as you can.
                    </p>
                    <Button className="btn btn-success" onClick={this.handleCloseModal.bind(this)}>OK</Button>
                </Modal>
                    <Board rows={this.state.rows} columns={this.state.columns} imageList={this.state.imageList} 
                        openInsturction={this.handleOpenModal.bind(this)} nextLevel={this.props.nextLevel} />
            </div>
         );
    }
    
        
}
 

export default MemGame;