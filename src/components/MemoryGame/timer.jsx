import React, { Component } from 'react';
const timerStyle={
    border: "2px solid black",
    borderRadius: "10px",
    textAlign: "center",
    padding: "0.5%",
    position: "auto",
    backgroundColor: 'rgba(255,255,255,0.6)'
}

class Timer extends Component {
    constructor(props){
        super(props);
        this.state = {
            seconds: 0,
            clockRun: false,
            clockStopped: true,
            result: 0
        }
    }
     
    resetTimer(){
        if(this.state.clockRun===true){
            clearInterval(this.Timer);
            this.setState({seconds:0})
        }
    }

    getSeconds(){
        let seconds = ('0' + (this.state.seconds % 60).toString()).slice(-2);
        return (seconds);
    }
    getMinutes(){
        let minutes = ('0' + Math.floor((this.state.seconds / 60)).toString()).slice(-2);
        return (minutes);
    }
  
    startClock(){
        if(this.props.firstClick && (!this.state.clockRun)){
            this.setState({clockRun:true,clockStopped:false});
            this.increaseSeconds();
        }
    }

    stopClock(){
        if((!this.props.isFinished) && (!this.state.clockStopped)){
            this.setState({clockRun:false,clockStopped:true});
            clearInterval(this.Timer);
        }
    }

    increaseSeconds(){
        setInterval(()=>{
            if(!this.props.isFinished){
                this.setState({seconds: this.state.seconds + 1});
            }else{
            clearInterval(this);
            this.setState({result:this.state.seconds});
            }
        },1000)    
    }

    renderStartStop(){
        let newState=this.state;
        if(this.props.firstClick && (!this.props.isFinished)){
            if(this.state.clockRun===false){
                newState.clockRun=true;
                newState.clockStopped=false;
                this.setState(newState);
                this.increaseSeconds();
            }
        }
        if(this.props.firstClick && this.props.isFinished && this.state.clockStopped===false){
            newState.clockRun=false;
            newState.clockStopped=true;
            newState.result=this.state.seconds;
            this.setState(newState);
            clearInterval(this.Timer);
            console.log("time stopped");
            let result = this.state.result;
            this.props.onStop(result);
        }
    }

    render() { 
        return (
        <div style={timerStyle}>
            {this.getMinutes()} : {this.getSeconds()} 
            {this.renderStartStop()}
        </div> 
        );
    }
}
 
export default Timer;