import React, { Component } from 'react';
import UserItem from '../components/Users/UserItem';
import '../components/background.css';
import { withRouter } from 'react-router-dom';

const screenStyle={
    position: "absolute",
    marginLeft: "17%",
    marginTop:"3%",
    textAlign:"left"
}

class UserSelection extends Component {
    constructor(props){
        super(props);
        
        this.state={
            users: [],
            createUserScrn: false,
            gameScrn: false,
        }
    }

    render() { 
        return (
            <div>
                <div style={screenStyle}>
                    <div>
                        <h1>User List</h1>
                        <button onClick={()=>{this.handleCreateUsr()}}>Create New User</button>
                        <div>
                            <UserItem />
                        </div>
                        <button onClick={()=>this.handleStartGame()}>Start Game!</button>
                    </div>            
                </div>
            </div>
         );
    }

    handleCreateUsr(){
        console.log(this.props);
        this.props.history.push('/createusr');
    }
    handleStartGame(){
        this.props.history.push('/gameselect');
    }
    
}
 
export default withRouter(UserSelection);