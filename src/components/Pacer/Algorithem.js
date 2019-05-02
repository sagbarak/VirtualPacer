import React, { Component } from 'react';
import shuffle from 'shuffle-array';

class Algorithem extends Component {
constructor(props){
    super(props)
    this.state={
        typeGame: this.props.typeGame,
        gridSize: this.props.gridSize,// memory bord size
        score: this.props.score,
        shuffled: false,
        p: [],
        isFinished: this.props.isFinished,
        clearInterval: false,
        firstTime: this.props.firstTime,
        flag: true,
        updateScore: true
    }

        let myInterval= setInterval(()=>{ 
            console.log("interval number : " + myInterval)
            this.state.score=this.props.score
            //if(this.state.updateScore&&!this.state.firstTime){
                this.state.score=this.props.score
                this.setState({score: this.props.score, gridSize: this.props.gridSize})
                
            console.log("score 1 is : " + this.props.score)
            console.log("score 2 is : " + this.state.score)
            
        },2000  )
    
    
}

 algorithem(p)
 {
    if(this.state.typeGame=="puzzle"){
       this.props.algorithem(p)
    }
    else if(this.state.typeGame=="memory"){
      // memory algorithem
    }
    
 }

 interval(){
    this.state.isFinished=this.props.isFinished;
    if(this.state.flag){
        this.state.flag=false
   var intervalP= setInterval(()=>{
    console.log("second interval num: "+ intervalP)
        console.log("is finished? " + this.state.isFinished)
        if(this.state.isFinished){
            this.state.clearInterval=true
            console.log("clearInterval 0 =   "+ this.state.clearInterval)
            this.setState({shuffled: false,p: [], isFinished: false,gridSize: this.props.gridSize})
        }
        this.algorithem(this.state.p)},5000  )
    }
 }
 
 ready(){
    const numP= (this.state.gridSize*this.state.gridSize)
         
         for(let i=0;i<numP;i++){
             var x = 1000+i
             this.state.p.push(x)
         }
         
         this.setState({shuffled: true})
         shuffle(this.state.p)
    
 }

render(){
  
if(this.state.gridSize==0||this.state.isFinished){
    this.state.gridSize=this.props.gridSize
}

else{
    if(!this.state.shuffled){ 
        console.log("option 1")
        this.ready()
    }
        this.interval()
    
}

    return(
        <div>

        </div>

 
    )
}

}

 export default Algorithem;