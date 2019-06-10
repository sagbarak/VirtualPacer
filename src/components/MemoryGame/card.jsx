import React, { Component } from 'react';
import PropTypes from 'prop-types';
import blankCard from '../../graphics/blank.png';
import './card.css';


const cardStyle={
    width:"100%",
    height:"100%",
    padding: 10,
    borderRadius: 100,
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
                <img className="row-of-icons" style={cardStyle} src={image} onMouseDown={this.props.flipCard.bind(this,id)} />
        );
    }
}

 //PropTypes
Card.propTrypes = {
    cards: PropTypes.object.isRequired
}
export default Card;