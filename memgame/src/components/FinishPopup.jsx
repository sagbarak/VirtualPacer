import React, { Component } from 'react';

const popupStyle = {
    position: "auto",
    width: "100%",
    height: "100%",
    top: "0",
    left: "0",
    right: "0",
    bottom: "0",
    margin: "auto",
    backgroundColor: "rgba(0,0,0, 0.5)" 
}
class FinishPopup extends Component {
    render() { 
        return ( 
        <div style={popupStyle}>
            <h1>
                Well done!!
            </h1>
            <button onClick={this.props.nextLevel}>Next Level</button>
        </div> );
    }
}
 
export default FinishPopup;