import React, { Component } from 'react';
import background from '../graphics/back3.jpg';
import GameBoard from '../components/gameboard';

const backgroundStyle = {
    width: "100%",
    height: "853px",
    backgroundSize: 'cover',
    backgroundImage: `url(${background})`
}

class Background extends Component {
    state = { 
  
     }

    render() { 
        return ( <div>
            <section style={ backgroundStyle }>
                <GameBoard rows="5" columns="2" />
            </section>
        </div> );
    }
}
 
export default Background;