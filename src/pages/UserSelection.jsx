import React, { Component } from 'react';
import UserItem from '../components/Users/UserItem';
import CreateUser from '../components/Users/CreateUser';
import { create } from 'domain';

class UserSelection extends Component {
    state = {
        users: [],
        createUserScrn: false
      }
    render() { 
        return (
            <React.Fragment>
            {this.state.createUserScrn?
                <CreateUser />
                :
                <div>
                    <h1>User List</h1>
                    <button onClick={()=>{this.toggleCreateUsr()}}>Create New User</button>
                    <div>
                        <UserItem />
                    </div>
                </div>
            }
            </React.Fragment>
         );
    }

    toggleCreateUsr(){
        this.setState({createUserScrn:!this.state.createUserScrn});
    }
    
}
 
export default UserSelection;