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
    playAgain();
  }
}

function playAgain () {

}

// Just outside the playAgain function for build.
var again = document.getElementById('notes');
againContent = '<a href="#" id="yes">Restart</a>';
again.innerHTML = againContent;


var yes = document.getElementById('yes');
var no = document.getElementById('no');


function restart () {
  board = {
    cells: []
  };
  var boardHolder = document.getElementsByClassName('board')
  boardHolder[0].innerHTML = "";
  console.log(boardHolder[0])
  console.log('restart');
  createBoard(2);
  startGame();

}

yes.addEventListener('click', restart);
no.addEventListener('click', goodbye);






  // You can use this function call to declare a winner (once you've
  // detected that they've won, that is!)


// Define this function to count the number of mines around the cell
// (there could be as many as 8). You don't have to get the surrounding
// cells yourself! Just use `lib.getSurroundingCells`:
//
//   var surrounding = lib.getSurroundingCells(cell.row, cell.col)
//
// It will return cell objects in an array. You should loop through
// them, counting the number of times `cell.isMine` is true.
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
