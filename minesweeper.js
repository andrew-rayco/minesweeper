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
      randomBoolean = Math.random() <= 0.2; // randomly create Boolean
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
function checkForWin (evt) {
  // get sounds from html
  var audio = document.getElementById('switch');
  var boom = document.getElementById('boom');
  var mark = document.getElementById('mark');
  var win = document.getElementById('win');

  // Check type of cell and play appropriate sound
  console.log(evt.target.classList[2])
  if (evt.type == 'contextmenu') {
    mark.play();
  } else if (evt.target.classList[2] == 'mine') {
    console.log(evt);
    boom.play();
  } else {
    audio.play();
  }

  var tally = 0;
  for (var i=0; i<board.cells.length; i++) {
    if ((board.cells[i].isMine == false && board.cells[i].hidden == false) || (board.cells[i].isMine == true && board.cells[i].isMarked == true)) {
      tally++;
    }
  }
  if (tally == board.cells.length) {
    lib.displayMessage('You win!');
    win.play();
  }
}


function restartButton () {
  var again = document.getElementById('notes');
  var againText = '<a href="#" id="restart">Restart</a>';
  again.innerHTML = againText;

  // click event on restart link
  var restartLink = document.getElementById('restart');
  restartLink.addEventListener('click', restart);

}
restartButton();


function restart () {
  var restartSound = document.getElementById('restart-sound');
  restartSound.play();
  var boardHolder = document.getElementsByClassName('board')
  boardHolder[0].innerHTML = ""; // clear board
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
