import React, { Component } from 'react';
import Bord from '../PuzzleGame/Bord'
import Algorithem from './Algorithem'
class PacerBord extends Component {
constructor(props){
    super(props)
    this.state={
        gridSize: this.props.gridSize,
        score: this.props.score, 
    }
    
        
}

ready(){
   this.props.ready()
}

algorithem(){
    this.props.algorithem()
}

render(){

 
    const BordStyle= {
        float: 'right',   
    } 
    
    
    return(
        <div id= 'PacerBord' style={BordStyle}>
            <h1 style={{textAlign:"left"}}>OPPONENT</h1>
           
          <Bord gridSize={this.props.gridSize} pacer={true} score={this.props.score}></Bord>
          <Algorithem typeGame= {this.props.typeGame} algorithem={()=>this.algorithem()} 
              ready={()=>this.ready()} p={this.props.p} gridSize={this.props.gridSize} 
              flag={this.props.flag} firstTime={this.props.firstTime} isFinished={this.props.isFinished} 
              score={this.props.score}></Algorithem>
        </div>

    );
   
    
}


}

export default PacerBord;