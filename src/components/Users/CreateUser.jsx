import React, { Component } from 'react';
import axios from 'axios';

class CreateUser extends Component {
    constructor(props){
        super(props);
        this.OnChangeId = this.OnChangeId.bind(this);
        this.OnChangeFirstName = this.OnChangeFirstName.bind(this);
        this.OnChangeLastName = this.OnChangeLastName.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        state = { 
            Id:"",
            firstName: "",
            lastName: ""
        }
    }

    render() { 
        return ( 
            <div>
            <h1>Add New User</h1>
            <form onSubmit={this.handleSubmit}>
                <label>ID:</label>
                    <input type="number" name="ID" onChange={this.OnChangeId} value={this.state.Id}/>
                <label>First Name:</label>
                    <input type="text" name="First Name"  onChange={this.OnChangeFirstName} value={this.state.firstName}/>
                <label>Last Name:</label>
                    <input type="text" name="Last Name"  onChange={this.OnChangeLastName} value={this.state.lastName}/>
                <input type="submit" value="Submit" />
            </form>
            </div>
         );
    }

    handleSubmit(event){
        e.preventDefault();
        const obj = {
            Id: this.state.Id,
            firstName: this.state.firstName,
            lastName: this.state.lastName
        };
        console.log(obj);
        axios.post('http://localhost:4000/vpData/add',obj)
            .then(res=> console.log(res.data));

        this.setState({
            Id: "",
            firstName: "",
            lastName: ""
        })
    }

    OnChangeId(e){
        this.setState({Id: e.target.value});
    }

    OnChangeFirstName(e){
        this.setState({firstName: e.target.value});
    }

    OnChangeLastName(e){
        this.setState({lastName: e.target.value});
    }

}
 
export default CreateUser;