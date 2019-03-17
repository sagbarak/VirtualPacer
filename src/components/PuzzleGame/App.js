
import React, { Component } from 'react';
import './App.css';
import CroppedPhoto from './CroppedPhoto'
import shuffle from 'shuffle-array';
import PuzzleBord from './PuzzleBord';
import Bord from './Bord';
import GridLayout from 'react-grid-layout';
import { Button } from 'react-bootstrap';
import Tiger from '../../graphics/image.jpg';


class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            input_num: 0
            
        }
    }

    handleInputChange(e) {
        //console.log("button"+ e);
        this.setState({input_num: e});
        var x = document.getElementById("500");
        console.log("image is ======== "+x) 
        x.style.display = "block";
        var y = document.getElementById("400");
        y.style.display = "none";
    }
    
  render() {
      let arr = [];
      const gridSize = this.state.input_num;
      const percentage = 100 / (gridSize - 1);
      let boxMap= [];
      let str=[];
   
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


    return (
      <div className="App">
         
          {/*<input type="text" name="fname" onChange={e => this.handleInputChange(e)}/>*/}
         <div className="buttons" id= "400">
          <Button variant="success" size='lg' onClick={e => this.handleInputChange(e=3)} >Easy</Button>
          <Button variant= "success" size='lg' onClick={e => this.handleInputChange(e=4)}>Medium</Button>
          <Button variant="success" size='lg' onClick={e => this.handleInputChange(e=5)}>Hard</Button>
          <Button variant="success" size='lg' onClick={e => this.handleInputChange(e=6)}>Professional</Button>
         </div>
     
        <img src={Tiger} className="im" id="500" width="250" height="320"   /*draggable = "true"*/ />   
          { /*boxMap.map(bo =>   */<Bord gridSize={gridSize} /*boxMap={boxMap} boxOrder={bo.BOrder} />)}*//>}
          
           {/*  <div className="gamePieces" >
               {boxMap.map(bo =>   <PuzzleBord gridSize={gridSize} boxOrder={bo.BOrder} newRow={bo.newRow} />)}
    </div>*/}  
     
       
          <div className= "pieces" style= {{paddingLeft: '0px', display : 'grid', 'grid-template-columns': 'repeat('+(gridSize*3)+',auto', width : '0px'}}>
         {arr.map(tile => <CroppedPhoto img_path={Tiger} startpxX={tile.xpos} startpxY={tile.ypos} gridSize={gridSize} idNum={tile.numName}/>)}
          </div>
        
      </div>
    );
  }
}

export default App;
