import React, { Component } from 'react';

class UserItem extends Component {
    state = { 
        name: ""
     }
    render() { 
        return ( 
            <div>{this.state.name}|<button>Edit</button>|<button>delete</button></div>
         );
    }
}
 
export default UserItem;