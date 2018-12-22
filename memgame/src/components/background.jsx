import React, { Component } from 'react';
import background from '../graphics/back3.jpg';
import BoardGame from '../components/boardgame';
import GameBoard from '../components/gameboard';

const backgroundStyle = {
    width: "100%",
    height: "835px",
    backgroundSize: 'cover',
    backgroundImage: `url(${background})`
}

class Background extends Component {
    state = { 
  
     }

    render() { 
        return ( <div>
            <section style={ backgroundStyle }>
                <GameBoard rows="4" columns="2" />
            </section>
        </div> );
    }
}
 
export default Background;