var topLeft = document.querySelector('.top-left');
var topMid = document.querySelector('.top-mid');
var topRight = document.querySelector('.top-right');
var midLeft = document.querySelector('.mid-left');
var midMid = document.querySelector('.mid-mid');
var midRight = document.querySelector('.mid-right');
var bottomLeft = document.querySelector('.bottom-left');
var bottomMid = document.querySelector('.bottom-mid');
var bottomRight = document.querySelector('.bottom-right');
var newGame = document.querySelector('.new-game');
var P1 = document.querySelector('.win-count-P1');
var P2 = document.querySelector('.win-count-P2');

var playerTurn = 'A';
var gameLogic = [0,0,0,0,0,0,0,0,0];
var gameOver = false;
var winCounterP1 = 0;
var winCounterP2 = 0;


function playerMove(event){
  if(!gameOver){
    if(playerTurn == 'A'){
      event.target.classList.add('cross');
      //console.log(event.target.getAttribute('data-cell'));
      gameLogic[event.target.getAttribute('data-cell')] = true;
      console.log(gameLogic);
      playerTurn = 'B';
    } else if (playerTurn == 'B'){
      event.target.classList.add('nought');
      //console.log(event.target.getAttribute('data-cell'));
      gameLogic[event.target.getAttribute('data-cell')] = false;
      console.log(gameLogic);
      playerTurn = 'A';
    }
    event.target.removeEventListener('click', playerMove);
    checkForWin();
    checkForDraw();
  }
}

function check3Cells(cell1,cell2,cell3){
  if(cell1 === cell2 && cell1 === cell3 && cell1 !== 0){
    switch(cell1){
      case true:
        console.log('winner: player 1, crosses');
        alert('winner: player 1, crosses');
        winCounterP1++
        P1.textContent = winCounterP1;
        break;
      case false:
        console.log('winner: player 2, noughts');
        alert('winner: player 2, noughts');
        winCounterP2++
        P2.textContent = winCounterP2;
        break;
    }
  }
}

function checkForDraw(){
  var sum = gameLogic.reduce(function(a, b) {
    return a + b;
    }, 0);
  if(sum === 5){
    console.log('draw');
    alert('draw');
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

  topLeft.classList.remove('nought', 'cross');
  topMid.classList.remove('nought', 'cross');
  topRight.classList.remove('nought', 'cross');
  midLeft.classList.remove('nought', 'cross');
  midMid.classList.remove('nought', 'cross');
  midRight.classList.remove('nought', 'cross');
  bottomLeft.classList.remove('nought', 'cross');
  bottomMid.classList.remove('nought', 'cross');
  bottomRight.classList.remove('nought', 'cross');

  topLeft.addEventListener('click', playerMove);
  topMid.addEventListener('click', playerMove);
  topRight.addEventListener('click', playerMove);
  midLeft.addEventListener('click', playerMove);
  midMid.addEventListener('click', playerMove);
  midRight.addEventListener('click', playerMove);
  bottomLeft.addEventListener('click', playerMove);
  bottomMid.addEventListener('click', playerMove);
  bottomRight.addEventListener('click', playerMove);

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
newGame.addEventListener('click', restart)