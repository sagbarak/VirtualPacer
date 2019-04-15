
import React, { Component } from 'react';
import './App.css';
import CroppedPhoto from './CroppedPhoto'
import shuffle from 'shuffle-array';
import PuzzleBord from './PuzzleBord';
import Bord from './Bord';
import GridLayout from 'react-grid-layout';
import { Button } from 'react-bootstrap';
import Tiger from '../../graphics/image.jpg';
import Landscape from '../../graphics/image2Puzzle.jpg';//3
import Dogs from '../../graphics/dogsPuzzle.jpg';//3
import Dog from '../../graphics/dogPuzzle.jpg';//4
import koala from '../../graphics/koalaPuzzle.jpg';//4
import Pancakes from '../../graphics/pancakesPuzzle.jpg';//5
import vegi from '../../graphics/vegiPuzzle.jpg';//5
import Modal from 'react-modal';


class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            input_num: 0,
            startTimer: 0,
            isFinished: false,
            round: 1,
            level: 1
        }
    }

    checkWin()
    {
      //alert("$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$")
        let flag=true;
        var numB=this.state.input_num*this.state.input_num;   
        //console.log("this is GRIDS---> " + gridSize);
        console.log("this is numb---> " + numB);
        while(numB>0){
            var x = document.getElementById(100+(numB-1));
            //console.log("this is X---> " + x.id);
            var y=x.firstElementChild;
            //console.log("this is y---> " + y.id);
            if(y!=null){
              console.log("this is y---> and we are in");
                var number=parseInt(y.id)+100
                if(number!=x.id){
                    flag=false;
                }
             }
             else
                flag= false;
            numB--;
        }
        
        if (flag){
          //console.log("this is startTTTTTTT---> " + this.state.startTimer);  
          var millis=Date.now()-this.state.startTimer;
        // this.setState({startTimer: millis/1000, isFinished:true})
          //this.startTimer=millis/1000;
          //this.state.isFinished=true;
          this.setState({startTimer: millis/1000 , isFinished: true})
         // console.log("is finished ? " + isFinished);
         // console.log("is finished ? " + this.isFinished);
          console.log("is finished ? " + this.state.isFinished);
          //alert("win from app")
          //this.forceUpdate();
        }
      
          
    }


    handleInputChange(e) {
        //console.log("button"+ e);

        this.setState({input_num: e, level:(e-2)});
        var numB=this.state.input_num*this.state.input_num;   
        var i = 0
        while(numB>0){
          var x = document.getElementById(100+(numB-1));
          //console.log("this is X---> " + x.id);
          var y=x.firstElementChild;
          //console.log("this is y---> " + y.id);
          if(y!=null){
            console.log("this is y---> " + y.id)
            /*var element= document.getElementById("");
            element.remove(); */
            var bank = document.getElementById("300");
            bank.appendChild(document.getElementById(y.id));
            
          }
          numB--;
        }
      
        var x = document.getElementById("500");
     //   console.log("image is ======== "+x) 
        x.style.display = "block";
        var y = document.getElementById("400");
        y.style.display = "none";
        this.setState({isFinished: false, startTimer: Date.now()});
    }
    
    handleNextLevel(){
      if(this.state.input_num<5){
      this.handleInputChange(this.state.input_num+1)
    }
      else{
        alert("finished the game!!!")
      }

      
  }

    render() {
      console.log("is finished ???????????????????    " + this.state.isFinished);
     
      let arr = [];
      const gridSize = this.state.input_num;
      const startTime = this.state.startTimer;

      const percentage = 100 / (gridSize - 1);
      let boxMap= [];
      let image;
      /*let str=[];
      
      
      str.push(Dog);
      str.push(Dogs);
      str.push(Landscape);
      str.push(koala);
      str.push(Pancakes);
      str.push(vegi);
*/
      for (let i=0; i<gridSize * gridSize; i++) {
        
       
       /* let boxOrder ={
          BOrder: i+100,
          };*/

          let current_tile = {
              xpos: (percentage * (i % gridSize)) + '%',
              ypos: (percentage * Math.floor(i / gridSize)) + '%',
              numName: i
            };
          console.log("XPOS=" + current_tile.xpos);
          console.log("YPOS=" + current_tile.ypos);
          console.log(" numName=" + current_tile.numName);
         // console.log(" boxName=" + boxOrder);
          arr.push(current_tile)
         // boxMap.push(boxOrder)
      }
      
      shuffle(arr);
     // shuffle(str);
     if(this.state.round==1){
      if(this.state.level==1){
       image=Dogs; 
      }  
      else if(this.state.level==2){
        image=koala; 
       }
      else{
        image=Pancakes; 
       }
     } 
     else{
      if(this.state.level==1){
        image=Landscape; 
       }  
       else if(this.state.level==2){
         image=Dog; 
        }
       else{
         image=vegi; 
        }
     }
     //image=str.pop();

    return (
      <div className="App">
         
         <h1> Puzzle Game </h1>
          {/*<input type="text" name="fname" onChange={e => this.handleInputChange(e)}/>*/}
   
         <div className="buttons" id= "400">
          <Button variant="success" size='lg' onClick={e => this.handleInputChange(e=3)} >START</Button>
        {/*  <Button variant= "success" size='lg' onClick={e => this.handleInputChange(e=4)}>Medium</Button>
          <Button variant="success" size='lg' onClick={e => this.handleInputChange(e=5)}>Hard</Button>
          <Button variant="success" size='lg' onClick={e => this.handleInputChange(e=6)}>Professional</Button>
        */}</div>
     
         

        <img src={image} className="im" id="500" width="250" height="320"   draggable = "false" />   
          { /*boxMap.map(bo =>   */<Bord gridSize={gridSize} checkWin={()=>this.checkWin()} /*startTime={startTime} isFinished={isFinished}boxMap={boxMap} boxOrder={bo.BOrder} />)}*//>}
          
           { /*  <div className="gamePieces" >
               {boxMap.map(bo =>   <PuzzleBord gridSize={gridSize}  boxOrder={bo.BOrder} newRow={bo.newRow} />)}
    </div>*/}  
     
    <div>
            
            <Modal isOpen={this.state.isFinished }>
                          <h3>Well Done!!</h3>
                          <p>Time: {this.state.startTimer}
                          </p>
  
                          <Button onClick={()=>this.handleNextLevel()}>Next Level</Button>
                          <Button onClick={()=>this.resetGame()}>Reset</Button>
                          <Button onClick={()=>this.handleCloseModal()}>Close</Button>
                          </Modal>
          </div>
  
          <div className= "pieces" id= "300" style= {{paddingLeft: '0px', display : 'grid', 'grid-template-columns': 'repeat('+(gridSize*3)+',auto', width : '0px'}}>
         {arr.map(tile => <CroppedPhoto img_path={image} startpxX={tile.xpos} checkWin={()=>this.checkWin()} startpxY={tile.ypos}/* startTime={startTime} isFinished={isFinished}*/ gridSize={gridSize} idNum={tile.numName}/>)}
          </div>
        
      </div>
    );
  }
}

export default App;
