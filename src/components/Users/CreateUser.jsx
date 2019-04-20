import React, { Component } from 'react';
import axios from 'axios';

class CreateUser extends Component {
    constructor(props) {
        super(props);
        this.OnChangeAge = this.OnChangeAge.bind(this);
        this.OnChangeFirstName = this.OnChangeFirstName.bind(this);
        this.OnChangeLastName = this.OnChangeLastName.bind(this);
        this.onChangeGender = this.onChangeGender.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

        this.state = {
            ObjectId: "",
            firstName: "",
            lastName: "",
            age: 0,
            gender:""
        }
    }

    render() {
        return (
            <div style={{ position: "relative", marginLeft: "20%", top: "5%" }}>
                <h1>Please </h1>
                <form name ="newUser" onSubmit={this.handleSubmit}>
                    <div>
                        <label>Age: </label>
                        <input type="number" name="Age" onChange={this.OnChangeAge} value={this.state.age} /><br/>
                        <label> Gender: </label>
                        <select name="gender" onChange={this.onChangeGender} value={this.state.gender}>
                            <option value="-">-</option>
                            <option value="Female">Female</option>
                            <option value="Male">Male</option>
                        </select>
                    </div>
                    <input type="submit" value="Submit" />
                </form>
            </div>
        );
    }


    handleSubmit(e) {
        e.preventDefault();
        var age=document.forms["newUser"]["Age"].value;
        if(age<5 || age>99){
            alert("Age not valid. needs to be between 5-99");
        }
        var gender = document.forms["newUser"]["gender"].value;
        if(gender=="-"){
            alert("Please choose your gender");
        }
        else{
            const obj = {
                "age": this.state.age,
                "gender":this.state.gender
            };
        
        axios.post('http://193.106.55.176:3000/vpdata/add', obj)
            .then(res => {
                console.log(res.data.userId);
                this.setState({ ObjectId: res.data.userId });
                console.log(this.state);
                setTimeout(() => {
                    this.props.history.push({
                        pathname: '/gameselect',
                        state: { userId: res.data.userId }
                    });
                }, 1000);
            });
        }
    }

    OnChangeAge(e) {
        this.setState({ age: e.target.value });
    }

    OnChangeFirstName(e) {
        this.setState({ firstName: e.target.value });
    }

    OnChangeLastName(e) {
        this.setState({ lastName: e.target.value });
    }

    onChangeGender(){
        this.setState({ gender: document.forms["newUser"]["gender"].value });
    }

}

export default CreateUser;