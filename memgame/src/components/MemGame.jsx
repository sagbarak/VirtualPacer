import React, { Component } from 'react';
import Board from './Board';
import blankCard from '../graphics/blank.png';
import card1 from '../graphics/card1.jpg';
import card2 from '../graphics/card2.jpg';
import card3 from '../graphics/card3.png';
import card4 from '../graphics/card4.jpg';
import card5 from '../graphics/card5.png';
import card6 from '../graphics/card6.png';
import card7 from '../graphics/card7.png';
import card8 from '../graphics/card8.png';
import card9 from '../graphics/card9.png';
import card10 from '../graphics/card10.png';
import card11 from '../graphics/card11.png';
import card12 from '../graphics/card12.jpg';
import card13 from '../graphics/card13.jpg';
import card14 from '../graphics/card14.png';
import card15 from '../graphics/card15.jpg';

class MemGame extends Component {
    state = { 
        imageList: [
            card1,card2,card3,card4,card5,card6,card7,card8,card9,card10,card11,card12,card13,card14,card15
        ],
        rows: 2,
        columns: 5
    }

     nextLevel(){
        let newState = this.state;
        newState.rows = this.newState.rows + 2;
        this.setState(newState);
    }

    render() { 
        return ( 
            <div>
                <Board rows={this.state.rows} columns={this.state.columns} nextLevel={this.nextLevel} imageList={this.state.imageList} />
            </div>
         );
    }
}
 
export default MemGame;