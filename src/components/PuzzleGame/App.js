
import React, { Component } from 'react';
import './App.css';
import CroppedPhoto from './CroppedPhoto'
import shuffle from 'shuffle-array';
import PuzzleBord from './PuzzleBord';
import Bord from './Bord';
import PacerBord from '../Pacer/PacerBord'
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
            typeGame: "puzzle",
            input_num: 0,
            startTimer: 0,
            isFinished: false,
            round: 1,
            level: 1,
            totalMistakes: 0,
            totalMoves: 0, 
            score : 0,
            correctAns: 0,
            flag: false,
            firstTime: true,
            boxMap: [],
            arr: [],
            image: "",
            p: []
           // userId: this.props.location.state.userId,
        }      
       
    }

    
     sendResultsToDB(){
      //get existing array of result from db to update
      axios.get('http://193.106.55.176:3000/vpdata/'+this.state.userId).then(
          res=>{
             let resultArr = res.data.result;
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

    algorithem(){
      console.log("algo: " + this.state.p)
         
      if(this.state.input_num>=3){    
        var success=this.state.p.pop()
        var x= document.getElementById(success)
        console.log(x)
          if(x!=null){
              x.style.backgroundColor= "green"
          }
      }
    
    }

    ready(){
      const numP= (this.state.input_num*this.state.input_num)
         
      for(let i=0;i<numP;i++){
          var x = 1000+i
          this.state.p.push(x)
      }
      shuffle(this.state.p)
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
        var numP=numB
        while(numB>0){
            var x = document.getElementById(100+(numB-1));
            var y=x.firstElementChild;
            if(y!=null){
                var number=parseInt(y.id)+100
                if(number!=x.id){
                    flag=false;
                }
                else{
                  this.state.correctAns++    
                }
             }
             else
                flag= false;
            numB--;
        }
       this.setState({score: this.state.correctAns/numP })
        this.state.correctAns=0
        if (flag){
          var millis=Date.now()-this.state.startTimer;
          this.setState({startTimer: millis/1000 , isFinished: true,p: [], flag:false, newGame: true})
          //this.sendResultsToDB();  
          
        }
      
          
    }


    handleInputChange(e) {
      
        this.setState({input_num: e, level:(e-2), score: 0})
        this.state.level=  e-2
        this.setState.input_num=e 
        this.state.arr= []
        var numB=this.state.input_num*this.state.input_num; 
        
      const gridSize = e;
      const percentage = 100 / (gridSize - 1);
      for (let i=0; i<gridSize * gridSize; i++) {
          let current_tile = {
              xpos: (percentage * (i % gridSize)) + '%',
              ypos: (percentage * Math.floor(i / gridSize)) + '%',
              numName: i
            };
          this.state.arr.push(current_tile)
          console.log(current_tile)
      }
      shuffle(this.state.arr);
     if(this.state.round==1){
      if(this.state.level==1){
       this.setState({image: Dogs})
      }  
      else if(this.state.level==2){
        this.setState({image: koala}); 
       }
      else{
        this.setState({image: Pancakes}) 
       }
     } 
     else{
      if(this.state.level==1){
        this.setState({image: Landscape}); 
       }  
       else if(this.state.level==2){
        this.setState({image: Dog}) 
        }
       else{
        this.setState({image: vegi}) 
        }
     }  
        var i = 0
        while(numB>0){
          var x = document.getElementById(100+(numB-1));
          var y=x.firstElementChild;
          if(y!=null){
            var bank = document.getElementById("300");
            bank.appendChild(document.getElementById(y.id));
            
          }
          numB--;
        }
      
        var x = document.getElementById("500");
        x.style.display = "block";
        var z = document.getElementById("600");
        z.style.display = "block";
        var y = document.getElementById("400");
        y.style.display = "none";
        this.clean()
        this.setState({isFinished: false,flag: true ,firstTime: false,totalMistakes: 0, totalMoves: 0,startTimer: Date.now()});
      
    }


clean(){
 for(let i=0; i<this.state.input_num*this.state.input_num;i++){
 // alert('white')  
  let y= document.getElementById(1000+i)
    y.style.backgroundColor= "rgba(180, 180, 200, 0.3)"
   // alert('white')
 }
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
    
     

    return (
      <div className="App" >
         
          {/*<input type="text" name="fname" onChange={e => this.handleInputChange(e)}/>*/}
   
        <div className="buttons" id= "400">
          <Button variant="success" size='lg' onClick={e => this.handleInputChange(e=3)} >START</Button>
        </div>
     
        <ModalIstruction/>
        <div id='600' draggable = "false" style={{display:'none' ,position:"relative",marginLeft:"20%",marginTop:"5%"}}>
        <img src={this.state.image} className="im" id="500" width="250" height="320"   draggable = "false" />   
          <div id= 'bords'  style= {{display: "grid", 'grid-gap': "20%", 'grid-template-columns': "auto auto"}}>
           <div id = 'playerBord'>
             <h1>PLAYER</h1>
            <Bord gridSize={this.state.input_num} mistakes={()=>this.mistakes()} moves={()=>this.moves()} checkWin={()=>this.checkWin()} pacer={false} style= {{float: 'left',overflow: 'auto'}}></Bord>
            </div>
            <PacerBord typeGame= {this.state.typeGame} ready={()=> this.ready()} p={this.state.p} gridSize={this.state.input_num} algorithem={()=>this.algorithem()}  firstTime={this.state.firstTime} flag={this.state.flag} isFinished={this.state.isFinished} mistakes={()=>this.mistakes()} moves={()=>this.moves()} score= {this.state.score} checkWin={()=>this.checkWin()} ></PacerBord>

          </div>
             <div className="gamePieces" >
               {this.state.boxMap.map(bo =>   <PuzzleBord gridSize={this.state.input_num}  boxOrder={bo.BOrder} newRow={bo.newRow} />)}
            </div>  
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
            <div id= 'PuzzlePieces' style={{ position:"relative",overflow: 'auto' ,width:'70%',left:"24%"}}>
              <div id= "300" style= {{ position:"relative" ,paddingLeft: '0px', display : 'grid', 'grid-template-columns': 'repeat('+(this.state.input_num*3)+',auto', width : '0px'}}>
                {this.state.arr.map(tile => <CroppedPhoto img_path={this.state.image} startpxX={tile.xpos} mistakes={()=>this.mistakes()} moves={()=>this.moves()} checkWin={()=>this.checkWin()} startpxY={tile.ypos} gridSize={this.state.input_num} idNum={tile.numName}/>)}
              </div>
          </div>
      </div>
    );
  }
}

export default App;
