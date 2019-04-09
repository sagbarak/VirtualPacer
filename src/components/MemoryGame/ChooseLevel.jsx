import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import MemGame from './MemGame';


class ChooseLevel extends Component {
    constructor(props){
        super(props)
        this.state={
            rows:0,
            columns: 0, 
            screenMenu: true,
            selectedLevel: 1
        }
       // this.handleLevelClick = this.handleLevelClick.bind(this);
    }
    
    render() { 
        return ( 
            <div>
            {this.state.screenMenu ?
            <div>
                <Button onClick={()=>this.handleLevelClick(1)}>Easy</Button>
                <Button onClick={()=>this.handleLevelClick(2)}>Medium</Button>
                <Button onClick={()=>this.handleLevelClick(3)}>Hard</Button>
                <Button onClick={()=>this.handleLevelClick(4)}>Crazy</Button>
            </div>
            :
            <MemGame rows={this.state.rows} columns={this.state.columns} nextLevel={()=>{this.increaseLevel()}} />
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