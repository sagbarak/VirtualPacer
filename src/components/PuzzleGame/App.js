
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
import axios from 'axios';
import ModalIstruction from './ModalInstruction'


const modalStyle ={
  overlay: {
    position: 'fixed',
    marginTop: "10%",
    marginLeft: "20%",
    marginRight: "20%",
    marginBottom: "10%",
    backgroundColor: 'rgba(255, 255, 255, 0.0)'
},
content: {
    position: 'absolute',
    marginLeft: "5%",
    border: '1px solid #ccc',
    background: '#fff',
    overflow: 'auto',
    WebkitOverflowScrolling: 'touch',
    borderRadius: '8px',
    outline: 'none',
    padding: '20px'
  }
}
class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            input_num: 0,
            startTimer: 0,
            isFinished: false,
            round: 1,
            level: 1,
            totalMistakes: 0,
            totalMoves: 0, 
           // instruction: true,
            userId: this.props.location.state.userId,
          //  newGame: true,
        }      
    }

    
    sendResultsToDB(){
      //get existing array of result from db to update
      axios.get('http://193.106.55.176:3000/vpdata/'+this.state.userId).then(
          res=>{
             let resultArr = res.data.result;
             console.log(res)
             //add new results object to the array
             resultArr.push({
                 game: "puzzle",
                 time:this.state.startTimer, 
                 level:this.state.level, 
                 mistakes: this.state.totalMistakes,
                 moves: this.state.totalMoves,
                 quality: (1-(this.state.totalMistakes/this.state.totalMoves))
              });
             //post to server the result array to update
             axios.post('http://193.106.55.176:3000/vpdata/update/'+this.state.userId,{result: resultArr})
             .then(res=>{console.log(res);});  
          }
      )
  }

    moves(){
      this.state.totalMoves++;

    }

    
    mistakes(){
      this.state.totalMistakes++;
    }

    checkWin()
    {
        let flag=true;
        var numB=this.state.input_num*this.state.input_num;   
        while(numB>0){
            var x = document.getElementById(100+(numB-1));
            var y=x.firstElementChild;
            if(y!=null){
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
          var millis=Date.now()-this.state.startTimer;
          this.setState({startTimer: millis/1000 , isFinished: true, newGame: true})
          this.sendResultsToDB();  
          
        }
      
          
    }


    handleInputChange(e) {
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
       // alert("2")
       // this.state.newGame= true;
    } 



    
    handleNextLevel(){
      if(this.state.input_num<5){
      this.handleInputChange(this.state.input_num+1)
          }
      else{
        this.props.history.push('/endgame');
      }
}


    render() {
    

      
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
        
          let current_tile = {
              xpos: (percentage * (i % gridSize)) + '%',
              ypos: (percentage * Math.floor(i / gridSize)) + '%',
              numName: i
            };
          arr.push(current_tile)
      }
      
      
      shuffle(arr);
      
      

     // shuffle(str);
     //image=str.pop();
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
     

    return (
      <div className="App">
         
          {/*<input type="text" name="fname" onChange={e => this.handleInputChange(e)}/>*/}
   
        <div className="buttons" id= "400">
          <Button variant="success" size='lg' onClick={e => this.handleInputChange(e=3)} >START</Button>
        </div>
     
        <ModalIstruction/>
        <div style={{position:"relative",left:"20%",marginTop:"5%"}}>
        <img src={image} className="im" id="500" width="250" height="320"   draggable = "false" />   
          { /*boxMap.map(bo =>   */<Bord gridSize={gridSize} mistakes={()=>this.mistakes()} moves={()=>this.moves()} checkWin={()=>this.checkWin()} /*startTime={startTime} isFinished={isFinished}boxMap={boxMap} boxOrder={bo.BOrder} />)}*//>}
          
           { /*  <div className="gamePieces" >
               {boxMap.map(bo =>   <PuzzleBord gridSize={gridSize}  boxOrder={bo.BOrder} newRow={bo.newRow} />)}
    </div>*/}  
        </div>
     
    <div>
            
            <Modal isOpen={this.state.isFinished } style={modalStyle}>
                          <h3>Well Done!!</h3>
                          <p>Time: {this.state.startTimer}</p>
                          <p> Mistakes: {this.state.totalMistakes}</p>
                          <p> Moves: {this.state.totalMoves}
                          </p>
  
                          <Button bsStyle="success" onClick={()=>this.handleNextLevel()}>Next Level</Button>
                          </Modal>
          </div>
  
          <div id= "300" style= {{position:"relative", left:"18%" ,paddingLeft: '0px', display : 'grid', 'grid-template-columns': 'repeat('+(gridSize*3)+',auto', width : '0px'}}>
         {arr.map(tile => <CroppedPhoto img_path={image} startpxX={tile.xpos} mistakes={()=>this.mistakes()} moves={()=>this.moves()} checkWin={()=>this.checkWin()} startpxY={tile.ypos}/* startTime={startTime} isFinished={isFinished}*/ gridSize={gridSize} idNum={tile.numName}/>)}
          </div>
        
      </div>
    );
  }
}

export default App;
