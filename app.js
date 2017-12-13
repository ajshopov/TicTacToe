var topLeft = document.querySelector('.top-left');
var topMid = document.querySelector('.top-mid');
var topRight = document.querySelector('.top-right');
var midLeft = document.querySelector('.mid-left');
var midMid = document.querySelector('.mid-mid');
var midRight = document.querySelector('.mid-right');
var bottomLeft = document.querySelector('.bottom-left');
var bottomMid = document.querySelector('.bottom-mid');
var bottomRight = document.querySelector('.bottom-right');
var resetGame = document.querySelector('.reset-game');
var P1 = document.querySelector('.win-count-P1');
var P2 = document.querySelector('.win-count-P2');
var announceBox = document.querySelector('.display-result');
var activePlayer = document.querySelector('.active-player');

var playerTurn = 'A';
var gameLogic = [0,0,0,0,0,0,0,0,0];
var winCounterP1 = 0;
var winCounterP2 = 0;
var gameOver = false;

// P1.onchange = populateStorage;
// P2.onchange = populateStorage;

// function populateStorage(){
//   sessionStorage.setItem('P1', winCounterP1);
//   sessionStorage.setItem('P2', winCounterP2);
// }  
// sessionStorage.setItem('score1', '')

function playerMove(event){
  if(gameOver === false){
    if(!event.target.classList.contains('cross') && !event.target.classList.contains('nought')){
      if(playerTurn == 'A'){
        event.target.classList.add('cross');
        gameLogic[event.target.getAttribute('data-cell')] = true;
        playerTurn = 'B';
      } else if (playerTurn == 'B'){
        event.target.classList.add('nought');
        gameLogic[event.target.getAttribute('data-cell')] = false;
        playerTurn = 'A';
      }
      switchActivePlayer();
      checkForWin();
      checkForDraw();

    }
  }
}

function switchActivePlayer(){
  if(activePlayer.classList.contains('activeX')){
    activePlayer.classList.remove('activeX');
    activePlayer.classList.add('activeO');
  } else if(activePlayer.classList.contains('activeO')){
    activePlayer.classList.remove('activeO');
    activePlayer.classList.add('activeX');
  }
}

function check3Cells(cell1,cell2,cell3){
  if(cell1 === cell2 && cell1 === cell3 && cell1 !== 0){
    switch(cell1){
      case true:
        console.log('winner: player 1, crosses');
        announceBox.classList.add('announcement');
        announceBox.textContent = 'X wins! Click here to play again';
        gameOver = true;
        winCounterP1++
        P1.textContent = winCounterP1;
        break;
      case false:
        console.log('winner: player 2, noughts');
        announceBox.classList.add('announcement');
        announceBox.textContent = 'O wins! Click here to play again';
        gameOver = true;
        winCounterP2++
        P2.textContent = winCounterP2;
        break;
    }
  }
}

function checkForDraw(){
  if(gameOver === false){
    if(!gameLogic.includes(0)){
      gameOver = true;
      announceBox.classList.add('announcement');
      announceBox.textContent = 'Draw! Click here to play again';
      console.log('draw');
    }
  }
}

function checkForWin(){
  check3Cells(gameLogic[0], gameLogic[1], gameLogic[2]);
  check3Cells(gameLogic[3], gameLogic[4], gameLogic[5]);
  check3Cells(gameLogic[6], gameLogic[7], gameLogic[8]);
  check3Cells(gameLogic[0], gameLogic[3], gameLogic[6]);
  check3Cells(gameLogic[1], gameLogic[4], gameLogic[7]);
  check3Cells(gameLogic[2], gameLogic[5], gameLogic[8]);
  check3Cells(gameLogic[0], gameLogic[4], gameLogic[8]);
  check3Cells(gameLogic[2], gameLogic[4], gameLogic[6]);
}


function restart(){
  gameLogic = [0,0,0,0,0,0,0,0,0];
  gameOver = false;
  var allBoxes = document.querySelectorAll('.grid div')
  for (var i = 0; i < allBoxes.length; i++) {
    allBoxes[i].classList.remove('nought', 'cross');
  }
  announceBox.classList.remove('announcement');
  announceBox.textContent = "";
}

function resetScoreboard(){
  winCounterP1 = 0;
  winCounterP2 = 0;
  P1.textContent = winCounterP1;
  P2.textContent = winCounterP2;
  restart();
}

topLeft.addEventListener('click', playerMove)
topMid.addEventListener('click', playerMove)
topRight.addEventListener('click', playerMove)
midLeft.addEventListener('click', playerMove)
midMid.addEventListener('click', playerMove)
midRight.addEventListener('click', playerMove)
bottomLeft.addEventListener('click', playerMove)
bottomMid.addEventListener('click', playerMove)
bottomRight.addEventListener('click', playerMove)
resetGame.addEventListener('click', resetScoreboard)
announceBox.addEventListener('click', restart)