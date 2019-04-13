import React, { Component } from 'react';
import {Button} from 'react-bootstrap';
import MemGame from './MemGame';


class ChooseLevel extends Component {
    constructor(props){
        super(props)
        this.state={
            rows:0,
            columns: 0, 
            screenMenu: true,
            selectedLevel: 1,
            userId: this.props.location.state.userId
        }
        this.handleLevelClick = this.handleLevelClick.bind(this);
        this.increaseLevel = this.increaseLevel.bind(this);
    }
    
    render() { 
        console.log(this.state);
        console.log(this.props);
        return ( 
            <div style={{marginLeft:"15%",marginTop:"1%"}}>
                {this.state.screenMenu ?
                <div style={{marginLeft:"40%",marginTop:"20%", align:"center"}}>
                    <div style={{padding:"0.3%",margin:"auto"}}><Button bsStyle="primary" onClick={()=>this.handleLevelClick(1)}>Easy</Button></div>
                    <div style={{padding:"0.3%",margin:"auto"}}><Button bsStyle="primary" onClick={()=>this.handleLevelClick(2)}>Medium</Button></div>
                    <div style={{padding:"0.3%",margin:"auto"}}><Button bsStyle="primary" onClick={()=>this.handleLevelClick(3)}>Hard</Button></div>
                    <div style={{padding:"0.3%",margin:"auto"}}><Button bsStyle="primary" onClick={()=>this.handleLevelClick(4)}>Professional</Button></div>
                </div>
                :
                <MemGame rows={this.state.rows} columns={this.state.columns} nextLevel={()=>{this.increaseLevel()}} 
                    userId={this.state.userId} level={this.state.selectedLevel}/>
                }
            </div>
         );
    }

    handleLevelClick(level){
        if(level===1){
            this.setState({rows:2,columns:2,selectedLevel: level});
        }
        if(level===2){
            this.setState({rows:2,columns:5,selectedLevel: level});
        }
        if(level===3){
            this.setState({rows:3,columns:4,selectedLevel: level});
        }
        if(level===4){
            this.setState({rows:4,columns:4,selectedLevel: level});
        }
        console.log("level:" + level);
        this.toggleMenu()
    }

    toggleMenu(){
        this.setState({screenMenu: false});
    }

    increaseLevel=()=>{
        console.log("increase")
        if(this.state.selectedLevel<4){
            this.handleLevelClick(this.state.selectedLevel+1);
        }
    }
    
}
 
export default ChooseLevel;