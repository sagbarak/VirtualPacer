import React, { Component } from 'react';
import UserItem from '../components/Users/UserItem';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import CreateUser from '../components/Users/CreateUser';

class UserSelection extends Component {
    state = {
        users: []
      }
    render() { 
        return (
            <Router>
                <div>
                    <h1>User List</h1>
                    <li><Link to={'/CreateUser'}>Create New User</Link></li>
                    <div>
                        <UserItem />
                    </div>
                    <Route path="/CreateUser" component={CreateUser} />
                </div>
            </Router>
         );
    }
}
 
export default UserSelection;