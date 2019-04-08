import React, { Component } from 'react';
import './App.css'
import App from './App';
import Modal from 'react-modal';
import { Button } from 'react-bootstrap';

class PuzzleBord extends Component {
    state = {
        startTimer: this.props.startTime,
       isFinished: this.props.isFinished
        
    }
    checkWin()
    {
        let flag=true;
        //alert(this.props.boxOrder);
        var numB=this.props.gridSize*this.props.gridSize;
        console.log(numB);
        while(numB>0){
            var x = document.getElementById(100+(numB-1));
            //console.log(this.props.boxOrder);
            var y=x.firstElementChild;
            //console.log(x);
           //console.log(y.id+100);
            if(y!=null/*&&(y.id+100)==x.id*/){
               
                var number=parseInt(y.id)+100
                if(number!=x.id){
                    flag=false;
                }
                //else
                  //  alert(55555);
             }
             else
                flag= false;

            numB--;
        }
        
        if (flag){
          // alert("win");
          var millis=Date.now()-this.props.startTime;
         
         this.setState({startTime: millis/1000, isFinished:true})
        //  App.setState({isFinished: true})
          this.state.startTime=millis/1000;
          this.state.isFinished=true;
          console.log(this.props.isFinished)
          // alert(/*Math.floor(millis/1000)*/millis/1000)
        }
      
          
    }

    allowDrop(ev) {
        console.log("here1");
        ev.preventDefault();
        //console.log("here2");
        //ev.AllowDrop=true;
      }
      
              
      
      drop(ev) {
        ev.preventDefault();
        var data = ev.dataTransfer.getData("id");
        //console.log("drop data = "+ data);
        //console.log("ev data = "+ ev.target.id);
    //    if(ev.target.firstElementChild!=data){alert("ok");}
    console.log("here0");
        if(ev.target.firstElementChild==null){
            console.log("here1");
        ev.target.appendChild(document.getElementById(data));
        }
        else{
            console.log("here2");
            var src = document.getElementById (ev.dataTransfer.getData ("src"));
            var srcParent = src.parentNode;
            var tgt = ev.currentTarget.firstElementChild;

            ev.currentTarget.replaceChild (src, tgt);
            srcParent.appendChild (tgt);

        }
        var data2 = parseInt(data)+100;
        if(data2==ev.target.id){
           // alert("ok");
          //  console.log("VVVVV");
         this.checkWin();
        }
        else
        {

            //alert("wrong");
/*            alert(typeof(data));*/
          //  console.log("data2 = "+data2 + " ev = " + ev.target.id);
        }
      }
  

    render() {
        const box_order=this.props.boxOrder;
//const row= this.props.newRow
        console.log("pz- box_order="+ box_order)
        console.log("pz- props.boxorder="+ this.props.boxOrder)
        const puzzleBord_style = {
            width: (/*435*/486/this.props.gridSize),
            height: (486/this.props.gridSize),
            "background-color": "rgba(180, 180, 200, 0.3)",
            transpernt: "20%",
            /*padding: 10px;*/
            border: 1+"px solid #aaaaaa"
            
        };
        return (
        <div>
            <div>
            
            <Modal isOpen={this.state.isFinished}>
                          <h3>Well Done!!</h3>
                          <p>Time: {this.state.startTime}
                          </p>
  
                          <Button onClick={()=>{this.handleNextLevel()}}>Next Level</Button>
                          <Button onClick={()=>{this.resetGame()}}>Reset</Button>
                          <Button onClick={()=>{this.handleCloseModal()}}>Close</Button>
                          </Modal>
          </div>
  
      
          <div  id={box_order} onDrop={event=> this.drop(event)} onDragOver={event=> this.allowDrop(event)} style={puzzleBord_style}>

            </div>
         
        </div>   
        );
    }
}

export default PuzzleBord;
