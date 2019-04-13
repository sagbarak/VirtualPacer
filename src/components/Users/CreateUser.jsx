import React, { Component } from 'react';
import axios from 'axios';

class CreateUser extends Component {
    constructor(props){
        super(props);
        this.OnChangeAge = this.OnChangeAge.bind(this);
        this.OnChangeFirstName = this.OnChangeFirstName.bind(this);
        this.OnChangeLastName = this.OnChangeLastName.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

        this.state = { 
            ObjectId: "",
            firstName: "",
            lastName: "",
            age:0
        }
    }

    render() { 
        return ( 
            <div style={{position:"relative", marginLeft:"20%",top:"5%"}}>
            <h1>Register</h1>
            <form onSubmit={this.handleSubmit}>
                <div>
                <label>First Name:</label>   
                    <input type="text" name="First Name"  onChange={this.OnChangeFirstName} value={this.state.firstName}/>
                </div>
                <div>
                <label>Last Name:</label>
                    <input type="text" name="Last Name"  onChange={this.OnChangeLastName} value={this.state.lastName}/>
                </div>
                <div>
                <label>Age:</label>
                <input type="number" name="Age" onChange={this.OnChangeAge} value={this.state.age}/>
                </div>
                <input type="submit" value="Submit" />
            </form>
            </div>
         );
    }
 

    handleSubmit(e){
        e.preventDefault();
        const obj = {
            "firstname": this.state.firstName,
            "lastname": this.state.lastName,
            "age": this.state.age
        };

        axios.post('http://localhost:3000/vpdata/add',obj)
            .then(res=> {
                console.log(res.data.userId); 
                this.setState({ObjectId:res.data.userId});
                console.log(this.state);
                setTimeout(()=>{
                    this.props.history.push({
                        pathname: '/gameselect',
                        state: { userId: res.data.userId }
                    });
                },1000);
            });     
    }

    OnChangeAge(e){
        this.setState({age: e.target.value});
    }

    OnChangeFirstName(e){
        this.setState({firstName: e.target.value});
    }

    OnChangeLastName(e){
        this.setState({lastName: e.target.value});
    }

}
 
export default CreateUser;