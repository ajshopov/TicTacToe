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
var themeMario = document.querySelector('input[value=mario]');
var themeDefault = document.querySelector('input[value=default]');
var audio = document.querySelector('audio');

var playerTurn = 'A';
var gameLogic = [0,0,0,0,0,0,0,0,0];
var winCounterP1 = 0;
var winCounterP2 = 0;
var gameOver = false;

getLocalStorage();

function playerMove(event){
  if(gameOver === false){
    if(!event.target.classList.contains('cross') && !event.target.classList.contains('nought')){
      if(playerTurn == 'A'){
        event.target.classList.add('cross');
        if(document.querySelector('input[name=theme]:checked').value === 'mario'){
          event.target.classList.add('crossMario');
        }
        gameLogic[event.target.getAttribute('data-cell')] = true;
        playerTurn = 'B';
      } else if (playerTurn == 'B'){
        event.target.classList.add('nought');
        if(document.querySelector('input[name=theme]:checked').value === 'mario'){
          event.target.classList.add('noughtMario');
        }
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
    activePlayer.classList.remove('activeXMario');
    activePlayer.classList.add('activeO');
    if(document.querySelector('input[name=theme]:checked').value === 'mario'){
      activePlayer.classList.add('activeOMario');
    }
  } else if(activePlayer.classList.contains('activeO')){
    activePlayer.classList.remove('activeO');
    activePlayer.classList.remove('activeOMario');
    activePlayer.classList.add('activeX');
    if(document.querySelector('input[name=theme]:checked').value === 'mario'){
      activePlayer.classList.add('activeXMario');
    }
  }
}

function check3Cells(cell1,cell2,cell3){
  if(cell1 === cell2 && cell1 === cell3 && cell1 !== 0){
    switch(cell1){
      case true:
        announceBox.classList.add('announcement');
        announceBox.textContent = 'P1 wins! Click here to play again';
        gameOver = true;
        winCounterP1++
        P1.textContent = winCounterP1;
        setLocalStorage();
        break;
      case false:
        announceBox.classList.add('announcement');
        announceBox.textContent = 'P2 wins! Click here to play again';
        gameOver = true;
        winCounterP2++
        P2.textContent = winCounterP2;
        setLocalStorage();
        break;
    }
  }
}

function setLocalStorage(){
  localStorage.setItem('scoreX', winCounterP1);
  localStorage.setItem('scoreY', winCounterP2);
}

function getLocalStorage(){
  P1.textContent = localStorage.getItem('scoreX');
  P2.textContent = localStorage.getItem('scoreY');
  winCounterP1 = localStorage.getItem('scoreX');
  winCounterP2 = localStorage.getItem('scoreY');
}

function checkForDraw(){
  if(gameOver === false){
    if(!gameLogic.includes(0)){
      gameOver = true;
      announceBox.classList.add('announcement');
      announceBox.textContent = 'Draw! Click here to play again';
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
    allBoxes[i].classList.remove('nought', 'cross', 'noughtMario', 'crossMario');
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

function changeTheme(){
  var usedBoxes = document.querySelectorAll('.grid div')
  if(document.querySelector('input[name=theme]:checked').value === 'mario'){
    document.body.style.background = "url('images/36173.jpg')";
    document.querySelector('h1').classList.add('h1Mario');
    P1.classList.add('score-fonts');
    P2.classList.add('score-fonts');
    for (var i = 0; i < usedBoxes.length; i++) {
      if(usedBoxes[i].classList.contains('nought')){
        usedBoxes[i].classList.add('noughtMario');
      } else if(usedBoxes[i].classList.contains('cross')){
        usedBoxes[i].classList.add('crossMario');
      }
    }
    if(activePlayer.classList.contains('activeX')){
    activePlayer.classList.add('activeXMario');
    } else if(activePlayer.classList.contains('activeO')){
      activePlayer.classList.add('activeOMario');
    }
    audio.play();
    audio.loop = true;
  } else {
    document.body.style.background = "url('images/pexels-photo-326240.jpeg')"; 
    document.querySelector('h1').classList.remove('h1Mario');
    P1.classList.remove('score-fonts');
    P2.classList.remove('score-fonts');
    for (var i = 0; i < usedBoxes.length; i++) {
      if(usedBoxes[i].classList.contains('nought')){
        usedBoxes[i].classList.remove('noughtMario');
      } else if(usedBoxes[i].classList.contains('cross')){
        usedBoxes[i].classList.remove('crossMario');
      }
    }
    activePlayer.classList.remove('activeXMario');
    activePlayer.classList.remove('activeOMario');
    audio.pause();
  }
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
themeMario.addEventListener('click', changeTheme)
themeDefault.addEventListener('click', changeTheme)