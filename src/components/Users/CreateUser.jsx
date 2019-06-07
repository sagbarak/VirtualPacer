import React, { Component } from 'react';
import axios from 'axios';

const formStyle={
    position: "absolute",
    top: "3%",
    left: "26%",
    right: "30%",
    textAlign: "center",
    backgroundColor:"rgb(255,251,238)",
    borderRadius: "10px",
    border:"1px solid",
    fontFamily: "cursive"
}

const submitButton={
    border: "2px solid orange",
    borderRadius: "5px",
    background: "white",
    fontSize: "20px",
    padding: "1%"

}
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
            <div style={formStyle}>
                <div style={{padding:"5%"}}>
                <h2>Please fill the following details:</h2>
                <form name ="newUser" onSubmit={this.handleSubmit}>
                    <div style={{marginTop:"2%"}}>
                        <label style={{fontSize:"25px", padding:"0.5%"}}>Age: </label>
                        <input type="number" name="Age" onChange={this.OnChangeAge} value={this.state.age} /><br/>
                        <label style={{fontSize:"25px",padding:"0.5%"}}> Gender: </label>
                        <select name="gender" onChange={this.onChangeGender} value={this.state.gender}>
                            <option value="-">-</option>
                            <option value="Female">Female</option>
                            <option value="Male">Male</option>
                        </select>
                    </div>
                    <input style={submitButton} type="submit" value="Submit" />
                </form>
                </div>
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