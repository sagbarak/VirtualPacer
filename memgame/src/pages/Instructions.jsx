import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link} from 'react-router-dom';
import MemGame from '../components/MemGame';
class Instructions extends Component {
    
    render() { 
        return ( 
            <Router>
                <div>
                    <Route exact path="/" render={props=>(
                        <div>
                            <h1>Memory Game</h1>
                            <p>In memory game, you need to find pairs of cards.
                                your goal is to find all pairs as fast as you can.
                            </p>
                            <Link to="/memgame">Start</Link>
                        </div> )} />
                    <Route path="/memgame" component={MemGame} />
                </div>
            </Router>
         );
    }
}
 
export default Instructions;