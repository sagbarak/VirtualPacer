import React, { Component } from 'react';
import background from '../graphics/back3.jpg';
import MemGame from '../components/MemGame';
import '../components/background.css';
const backgroundStyle = {
    width: "100%",
    height: "100%",
    position: "center",
    backgroundRepeat: "no-reapet",
    backgroundSize: "cover",
    backgroundImage: `url(${background})`
}

class Background extends Component {
     render() { 
        return ( 
            <div className='bgStyle'>
                <MemGame />
            </div>
        );
    }
}
 
export default Background;