import React, { Component } from 'react';
import PropTypes from 'prop-types';
import blankCard from '../../graphics/blank.png';


const cardStyle={
    width:"20%",
    height:"40%",
    padding: 10,
    borderRadius: 80,
    border: "black",
    cursor: 'pointer'
}

class Card extends Component {
      render() { 
        const { id, imgUrl, faceUp, paired } = this.props.card;
        let image = blankCard;
        if(faceUp){
            image=imgUrl;
        }
        else{
            image=blankCard;
        }
        return ( 
                <img style={cardStyle} src={image} onClick={this.props.flipCard.bind(this,id)} />
        );
    }
}

 //PropTypes
Card.propTrypes = {
    cards: PropTypes.object.isRequired
}
export default Card;