window.onload = function(){
	setTable();
}
/*To do list:
	improve AI
*/

var tictactoeTable = document.getElementById("tictactoeTable");
var squares = document.getElementsByClassName("tableSquare");
var playerOne = "X";
var playerTwo = "O";
var playerTurn = 1;
var computerPlaying = false;
var turn = 1;
var playerStatus = document.getElementById("status");
var turnBox = document.getElementById("turn");
var playerBox = document.getElementById("playerSelect");
var playPieceSelection = document.getElementById("selectXorO");
var winLoseDrawBox = document.getElementById("winLoseDraw");

function setTable(){
	if (tictactoeTable != null){
		for (i=0; i < tictactoeTable.rows.length; i++){
			for (j=0; j < tictactoeTable.rows[i].cells.length; j++){
				if (tictactoeTable.rows[i].cells[j].classList.contains('not-clickable')){
					tictactoeTable.rows[i].cells[j].classList.toggle('not-clickable');
				}
				tictactoeTable.rows[i].cells[j].innerHTML = "";
				tictactoeTable.rows[i].cells[j].onclick = function(){
					play(this);
				}
			}
		}
	}
}

function howManyPlayers(players){//this is the first screen. Asks for number of players
	setFadeOut(playerBox);
	setFadeIn(playPieceSelection);
	var txt = players.innerText || players.textContent;
	//if one player selected, computerPlaying = true
	if (txt == "One"){
		computerPlaying = true;
	} else {
		computerPlaying = false;
	}
}

function exOrOhes(content){//this is the Second screen
	var txt = content.innerText || content.textContent;
	//screen asks if player wants to be X or O, then switches off this screen and turns on the game table
	if (txt == "X"){
		playerOne = "X";
		playerTwo = "O";
		setFadeOut(playPieceSelection);
		setFadeIn(tictactoeTable);
		displayOn(playerStatus);
		displayOn(turnBox);
	} else {
		playerOne = "O";
		playerTwo = "X";
		setFadeOut(playPieceSelection);
		setFadeIn(tictactoeTable);
		displayOn(playerStatus);
		displayOn(turnBox);
	}
}

function play(tableCells){//Third screen. This is the game play screen.
	if(playerTurn == 1){
		tableCells.innerHTML = playerOne;
		tableCells.classList.toggle('not-clickable');
		checkForWin();
	} else if (playerTurn == 2){
		tableCells.innerHTML = playerTwo;
		tableCells.classList.toggle('not-clickable');
		checkForWin();
	}
}

function computerTurn(){//basic AI functionality. Need to improve
	var rowSelected = getRandomIntInclusive(0,2);
	var columnSelected = getRandomIntInclusive(0,2);
	var selectedCell = tictactoeTable.rows[rowSelected].cells[columnSelected];
	if (selectedCell.innerHTML != "X" && selectedCell.innerHTML != "O"){
		play(tictactoeTable.rows[rowSelected].cells[columnSelected]);
	} else {
		computerTurn();
	}
}

function checkForWin(){
	if ((turn == 5) && (checkForRow() != true)){
		console.log("draw");
		resetGame();
	} else if (checkForRow() == true){
		winLose(playerTurn);
	} else {
		turnSwitch(playerTurn);
	}
}

function checkForRow(){
		for (i=0; i<=2; i++){
			if ((tictactoeTable.rows[i].cells[0].innerHTML == "X" && tictactoeTable.rows[i].cells[1].innerHTML == "X" && tictactoeTable.rows[i].cells[2].innerHTML == "X") || (tictactoeTable.rows[i].cells[0].innerHTML == "O" && tictactoeTable.rows[i].cells[1].innerHTML == "O" && tictactoeTable.rows[i].cells[2].innerHTML == "O")){
				return true;//horizontal
			} else if ((tictactoeTable.rows[0].cells[i].innerHTML == "X" && tictactoeTable.rows[1].cells[i].innerHTML == "X" && tictactoeTable.rows[2].cells[i].innerHTML == "X") || (tictactoeTable.rows[0].cells[i].innerHTML == "O" && tictactoeTable.rows[1].cells[i].innerHTML == "O" && tictactoeTable.rows[2].cells[i].innerHTML == "O")){
				return true;//verticle
			} else if ((tictactoeTable.rows[0].cells[0].innerHTML == "X" && tictactoeTable.rows[1].cells[1].innerHTML == "X" && tictactoeTable.rows[2].cells[2].innerHTML == "X") || (tictactoeTable.rows[0].cells[0].innerHTML == "O" && tictactoeTable.rows[1].cells[1].innerHTML == "O" && tictactoeTable.rows[2].cells[2].innerHTML == "O")){
				return true;//diag forward
			} else if((tictactoeTable.rows[0].cells[2].innerHTML == "X" && tictactoeTable.rows[1].cells[1].innerHTML == "X" && tictactoeTable.rows[2].cells[0].innerHTML == "X") || (tictactoeTable.rows[0].cells[2].innerHTML == "O" && tictactoeTable.rows[1].cells[1].innerHTML == "O" && tictactoeTable.rows[2].cells[0].innerHTML == "O")){
				//diag backward
				return true;
			}
		};
}

function turnSwitch(whosTurn){
	if (whosTurn == 1){
		playerTurn = 2;
		playerStatus.innerHTML = "Player Two";
		if (computerPlaying == true){
			computerTurn();
		}
	} else {
		playerTurn = 1;
		playerStatus.innerHTML = "Player One";
		turn ++;
		turnBox.innerHTML = turn;
	}
}

function winLose(whoWon){
	if (computerPlaying == true && whoWon == 2){
		winLoseDrawBox.innerHTML = ("<p>Player Two Wins!</p>");
		tictactoeTable.style.opacity = 0;
		displayOn(winLoseDrawBox);
		setTimeout(resetGame, 3000);
	} else if (whoWon == 1){
		winLoseDrawBox.innerHTML = ("<p>Player One Wins!</p>");
		tictactoeTable.style.opacity = 0;
		displayOn(winLoseDrawBox);
		setTimeout(resetGame, 3000);
	} else {
		winLoseDrawBox.innerHTML = ("<p>Player Two Wins!</p>");
		tictactoeTable.style.opacity = 0;
		displayOn(winLoseDrawBox);
		setTimeout(resetGame, 3000);
	}

}


function resetGame(){
	turn = 1;
	playerTurn = 1;
	computerPlaying = false;
	turnBox.innerHTML = 1;
	displayOff(playerStatus);
	displayOff(turnBox);
	setFadeOut(tictactoeTable);
	displayOff(winLoseDrawBox);
	setFadeIn(playerBox);
	setTable();
}

function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

