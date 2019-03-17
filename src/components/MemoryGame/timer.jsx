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
    state = { 
        seconds: 0,
        clockRun: false,
        clockStopped: false,
        firstClick: this.props.firstClick
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
        if(this.props.firstClick && this.state.clockRun===false){
            this.setState({clockRun:true});
            this.increaseSeconds();
        }
    }

    stopClock(){
        if(this.props.isFinished && !this.state.clockStopped){
            this.setState({clockRun:false,clockStopped:true});
            clearInterval(this.timer);
        }
    }

    increaseSeconds(){
        setInterval(()=>{
            this.setState({seconds: this.state.seconds + 1 });
        },1000)    
    }

    render() { 
        return (
        <div style={timerStyle}>
            {this.getMinutes()} : {this.getSeconds()} 
            {this.startClock()}
            {this.stopClock()}
        </div> 
        );
    }
}
 
export default Timer;