import React, { Component } from 'react';

class CreateUser extends Component {
    state = {  }
    render() { 
        return ( 
            <form onSubmit={this.handleSubmit}>
                <label>
                    First Name:
                    <input type="text" name="First Name" />
                </label>
                <label>
                    Last Name:
                    <input type="text" name="Last Name" />
                </label>
                <label>
                    ID:
                    <input type="number" name="ID" />
                </label>
                <input type="submit" value="Submit" />
            </form>
         );
    }

    handleSubmit(event){
        
    }
}
 
export default CreateUser;