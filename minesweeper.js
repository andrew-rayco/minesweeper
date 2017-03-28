document.addEventListener('DOMContentLoaded', startGame)

var board = {
  cells: []
};

function Board(row, col, isMine, isMarked, hidden) {
  this.row = row,
  this.col = col,
  this.isMine = isMine,
  this.isMarked = isMarked,
  this.hidden = hidden
};


function createBoard(size) {
  var randomBoolean;
  var count = 0;
  var mineCheck = 0;
  // create a loop with length of size
  for (var i=0; i<size; i++) {
    for (var j=0; j<size; j++) {
      randomBoolean = Math.random() <= 0.2;
      board.cells[count] = new Board(i, j, randomBoolean, false, true);
      count++;
    }
  }
  for (var i=0; i<board.cells.length; i++) {
    if (board.cells[i].isMine == false) {
      mineCheck++
    }
  }
  if (mineCheck === board.cells.length) {
    createBoard(size);
  }
};
createBoard(2); // Create board with size parameter


function startGame () {
  // Don't remove this function call: it makes the game work!
  for (var i=0; i<board.cells.length; i++) {
    board.cells[i].surroundingMines = countSurroundingMines(board.cells[i]);
  }

  var cellClick = document.getElementsByClassName('board')[0];
  cellClick.addEventListener('click', checkForWin);
  cellClick.addEventListener('contextmenu', checkForWin);
  lib.initBoard()
}


// Define this function to look for a win condition:
//
// 1. Are all of the cells that are NOT mines visible?
// 2. Are all of the mines marked?
function checkForWin () {
  var tally = 0;
  for (var i=0; i<board.cells.length; i++) {
    if ((board.cells[i].isMine == false && board.cells[i].hidden == false) || (board.cells[i].isMine == true && board.cells[i].isMarked == true)) {
      tally++;
    }
  }
  if (tally == board.cells.length) {
    lib.displayMessage('You win!');
  }
}

function sizeCounter (val) {
  sizeSliderValue = val;
}

function restartButton () {



  // find the div with id of 'notes'
  var again = document.getElementById('notes');
  // build the html string with restart link and input slider
  var againText = '<a href="#" id="restart">Restart</a>';
  againText += '<input id="size-slider" type="range" min="2" max="6" onmousemove="sizeCounter(value)" />';
  // show the string (necessary to build the input so we can then access the value. Otherwise get null)
  again.innerHTML = againText;



  // get slider value and add it to the string
  // var sizeSliderValue = document.getElementById('size-slider').value;
  againText += '<p>' + sizeSliderValue + '</p>';
  // show the string again. this time with the count
  again.innerHTML = againText;
  console.log(sizeSliderValue);

  // click event on restart link
  var restartLink = document.getElementById('restart');
  restartLink.addEventListener('click', restart);

  // mouseup event on size slider to detect and update size.
  var sliderClick = document.getElementById('size-slider');
  sliderClick.addEventListener('click', function () {
    again.innerHTML = againText;
    console.log(sizeSliderValue);
  } )
}
restartButton();


function restart () {
  var boardHolder = document.getElementsByClassName('board')
  boardHolder[0].innerHTML = "";
  createBoard(3);
  startGame();
}


function countSurroundingMines (cell) {
  var count = 0;
  var surroundingCells = lib.getSurroundingCells(cell.row, cell.col);
  for (var i=0; i<surroundingCells.length; i++) {
    if (surroundingCells[i].isMine == true) {
      count++;
    }
  }
  return count;
}
