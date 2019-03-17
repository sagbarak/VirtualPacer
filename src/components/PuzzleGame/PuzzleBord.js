import React, { Component } from 'react';
import './App.css'

class PuzzleBord extends Component {

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
           alert("win");
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
            width: (435/this.props.gridSize),
            height: (486/this.props.gridSize),
            "background-color": "rgba(180, 180, 200, 0.3)",
            transpernt: "20%",
            /*padding: 10px;*/
            border: 1+"px solid #aaaaaa"
            
        };
        return (
      
          <div  id={box_order} onDrop={event=> this.drop(event)} onDragOver={event=> this.allowDrop(event)} style={puzzleBord_style}>

            </div>
         
          
        );
    }
}

export default PuzzleBord;
