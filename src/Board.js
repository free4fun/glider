import React from 'react';
import Square from './Square.js';
import './Board.css';

class Board extends React.Component {

  constructor(props) {
    super(props);
    this.state = { board: this.startBoard() };
    //this.randomizeBoolean = this.randomizeBoolean.bind(this);
  }

  randomizeBoolean(){
    return Math.random() >= 0.5;
  }

  updateBoard(nextGeneration) {
    for (var r = 0; r < this.props.rows; r++) {
      for (var c = 0; c < this.props.cols; c++) {
        var id = this.genSqrKey(r,c);
        console.log(id);
        var sqr = document.getElementById(id);
        if (nextGeneration[r][c] === 1)
          sqr.className = "alive";
        else
          sqr.className = "dead";
      }
    }
  }

  /*
  Any live cell with fewer than two live neighbours dies, as if by underpopulation.
  Any live cell with two or three live neighbours lives on to the next generation.
  Any live cell with more than three live neighbours dies, as if by overpopulation.
  Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.
  */
  play(b) {
    var nextGeneration = Array(parseInt(this.props.rows)).fill(0).map(row => new Array(parseInt(this.props.cols)).fill(0))
    for (var r = 0; r < this.props.rows; r++) {
      for (var c = 0; c < this.props.cols; c++) {
        var neighbours = 0;
        var rowsStart = Math.max(r - 1, 0);
        var colsStart = Math.max(c - 1, 0);
        var rowsEnd = Math.min(r + 1, this.props.rows - 1);
        var colsEnd = Math.min(c + 1, this.props.cols - 1);
      //  console.log("props.cols: "+this.props.cols+" props.rows: "+ this.props.rows)
      //  console.log("col: "+c+" row: "+r+" colsStart: "+colsStart+" colsEnd: "+colsEnd+" rowsStart: "+rowsStart+" rowsEnd: "+rowsEnd);
        for (var i = rowsStart; i <= rowsEnd; i++ ) {
          for (var j = colsStart; j <= colsEnd; j++ ) {
          //  console.log("i: "+i+" j: "+j+" neighbours: "+neighbours);
            if (i !== r && j !== c) {
              if (b[i][j] === 1) neighbours++;
            }
          }
        }
        if (neighbours >= 4) {
          nextGeneration[r][c] = b[r][c];
        //  console.log("1 c:"+c+" r:"+r+" b[c][r]:"+b[c][r]);
        }
        if (neighbours === 2 || neighbours === 3) {
          nextGeneration[c][r] = b[r][c];
        //  console.log("2 c:"+c+" r:"+r+" b[c][r]:"+b[c][r]);
        }
        if (neighbours < 2) {
          nextGeneration[r][c] = 0;
        //  console.log("3 c:"+c+" r:"+r+" b[c][r]:"+b[c][r]);
        }
        if (neighbours === 3 && b[r][c] === 0) {
          nextGeneration[r][c] = 1;
        //  console.log("4 c:"+c+" r:"+r+" b[c][r]:"+b[c][r]);
        }
      }
    }
    //console.log(nextGeneration);
    return nextGeneration;
  }

  calculateBoard() {
    //TODO mejorar el orden actualmente es O(n*m)
    let b = Array(parseInt(this.props.rows)).fill(0).map(row => new Array(parseInt(this.props.cols)).fill(0))
    for (var r = 0; r < this.props.rows; r++) {
      for (var c = 0; c < this.props.cols; c++) {
        var id = this.genSqrKey(r,c);
        console.log(id);
        var sqr = document.getElementById(id);
        console.log(sqr);/*
        if (sqr.className === "alive")
          b[r][c] = 1;
        else if (sqr.className === "dead")
          b[r][c] = 0;
        else b[r][c] = undefined;*/
      }
    }
    this.printTwoDimentionsArray(b);
    return b;
  }

  genSqrKey(r,c) {
    return r+"-"+c;
  }

  startBoard() {
    var row = [];
    var b = [];
    for (var r = 0; r < this.props.rows; r++) {
      row = [];
      for (var c = 0; c < this.props.cols; c++) {
        var key = this.genSqrKey(r,c);
        row.push(<Square key={key} id={key} status={this.randomizeBoolean()}/>);
      }
      b.push(<tr key={"r"+r} id={"r"+r} className="row">{row}</tr>);
    }
    return b;
  }

  componentDidMount() {
    setInterval(() => {
      //console.log(`${mountId} | updating state`);
      const state = this.state;
      var b = this.calculateBoard();
      var nextGeneration = this.play(b);
      this.updateBoard(nextGeneration);
  }, 1000);
}

  buttonPressed = () => {
  //  var b = this.calculateBoard();
    //console.log(b);
    //this.printTwoDimentionsArray(b)
  //  var nextGeneration = this.play(b);
  //  this.updateBoard(nextGeneration);
    //this.printTwoDimentionsArray(nextGeneration);
  }

  printTwoDimentionsArray(arr) {
    var str = "";
    for (var r = 0; r < this.props.rows; r++) {
      for (var c = 0; c < this.props.cols; c++) {
        str = "|" + arr[r][c] + "|" + str;
      }
    //  console.log(str);
      str = str + "\r\n\n";
    }
    //console.log("=====================================================");
    return(str);
  }

  printArrayOnScreen() {
    var arr = this.printTwoDimentionsArray(this.calculateBoard());
    //console.log(arr);
    return arr;
  }

  render() {
    return (
      <div key="container" id="container">
        <div key="board" id="board">
          <table key="table" className="board">
            <thead key="thead"></thead>
            <tbody key="tbody">{this.state.board}</tbody>
          </table>
        </div>
        <div key="divpre" id="divpre"><pre key="pre" id="pre">{this.printArrayOnScreen()}</pre></div><br/><br/>
        <button onClick={this.buttonPressed}>Next Generation</button>
      </div>
    );
  }
}
export default Board;
