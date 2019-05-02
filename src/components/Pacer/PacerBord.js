import React, { Component } from 'react';
import Bord from '../PuzzleGame/Bord'
import Algorithem from './Algorithem'
class PacerBord extends Component {
constructor(props){
    super(props)
    this.state={
        gridSize: this.props.gridSize,
        score: this.props.score    
    }
    
        
}

algorithem(p){
    this.props.algorithem(p)
}

render(){

 
    const BordStyle= {
        float: 'right',   
    } 
    
    
    return(
        <div id= 'PacerBord' style={BordStyle}>
            <h1>OPPONENT</h1>
           
          <Bord gridSize={this.props.gridSize} pacer={true} score={this.props.score}></Bord>
          <Algorithem typeGame= {this.props.typeGame} gridSize={this.props.gridSize} algorithem={(p)=>this.algorithem(p)} flag={this.props.flag} firstTime={this.props.firstTime} isFinished={this.props.isFinished} score={this.props.score}></Algorithem>
        </div>

    );
   
    
}


}

export default PacerBord;