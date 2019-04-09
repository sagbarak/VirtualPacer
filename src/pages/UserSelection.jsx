import React, { Component } from 'react';
import UserItem from '../components/Users/UserItem';
import CreateUser from '../components/Users/CreateUser';
import HomePage from '../pages/HomePage';
import '../components/background.css';
import Logo from '../graphics/logo4.png';


const screenStyle={
    position: "absolute",
    marginLeft: "17%",
    marginTop:"3%",
    textAlign:"left"
}

class UserSelection extends Component {
    state = {
        users: [],
        createUserScrn: false,
        gameScrn: false,
    }

    render() { 
        return (
            <div className="bgStyle">
                <img src={Logo} style={{position:"absolute",left:"3%"}}/>
                <div style={screenStyle}>
                {this.state.createUserScrn?
                    <CreateUser />
                    :
                    this.state.gameScrn?
                        <HomePage />
                        :
                        <div>
                            <h1>User List</h1>
                            <button onClick={()=>{this.toggleCreateUsr()}}>Create New User</button>
                            <div>
                                <UserItem />
                            </div>
                            <button onClick={()=>this.toggleGame()}>Go To Game!</button>
                        </div>
                }
                </div>
            </div>
         );
    }

    toggleCreateUsr(){
        this.setState({createUserScrn:!this.state.createUserScrn});
    }
    toggleGame(){
        this.setState({gameScrn: true});
    }
    
}
 
export default UserSelection;