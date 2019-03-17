import React, { Component } from 'react';
import './FinishPopup.css';
const popupStyle = {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
}

class FinishPopup extends Component {

    render() { 
        return ( 
            //<Popup isOpen={this.props.isOpen} nextLevel={this.props.nextLevel}>
            <div>
                <h1>Well Done!</h1>
                <button onClick={this.props.nextLevel}>Next Level</button>
            </div>
           // </Popup>
        );
    }
}

export default FinishPopup;