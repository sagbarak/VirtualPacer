import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import MemoryGame from '../components/MemoryGame/MemGame';
import PuzzleGame from '../components/PuzzleGame/App'

class App extends Component {
  render() {
    return (
    <Router>
        <div>
          <h2>Virtual Pacer Games</h2>
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <ul className="navbar-nav mr-auto">
            <li><Link to={'/PuzzleGame'} className="nav-link"> PuzzleGame </Link></li>
            <li><Link to={'/MemoryGame'} className="nav-link">MemoryGame</Link></li>
          </ul>
          </nav>
          <Switch>
              <Route path='/MemoryGame' component={MemoryGame} />
              <Route path='/PuzzleGame' component={PuzzleGame} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;