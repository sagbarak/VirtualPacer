import React, { Component } from 'react';
import blankCard from '../graphics/blank.png';
const cardStyle={
    width:100,
    height:100,
    padding: 10,
    borderRadius: 60,
    border: "black"
}

class Card extends Component {
    state = { 
        faceDown: true,
        image: blankCard,
        match: false
     }

    getImage(){
        return this.state.image;
    }
    setImage(){
        let stateChange = this.state;
        if(!this.state.match){
            if(this.state.faceDown){
              stateChange.image=this.props.image;
              stateChange.faceDown=false;
              this.setState(stateChange)
            }
              else{
                stateChange.image=blankCard;
                stateChange.faceDown=true;
                this.setState(stateChange);
            }
        }
    }
   
    render() { 
        return (
            <img onClick={()=>{this.setImage()}} src={this.state.image} style={cardStyle} />
        );
    }
}
 
export default Card;

