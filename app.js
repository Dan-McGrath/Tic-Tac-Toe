const Player = (name, letter) => {
    const getName = () => name;
    const getLetter = () =>  letter;
    
    
    return {getName, getLetter}
}

const player1 = Player('Player 1', 'X');
const player2 = Player('Player 2', 'O');

const gameboard = (() => {
    let boardArr = []; 
    let board = document.querySelector('.gameboard');

    const createGameBoard = () => {
        //turn game board into 3 rows of divs
        
        let index = 0;

        while (boardArr.length < 9) {
            let square = document.createElement('div');
            square.classList.add('square')
            square.dataset.index = index;
            square.dataset.occupied = 'false';
            board.appendChild(square);
            const spot = {
                index: index,
                occupied: 'false',
            };
            boardArr.push(spot);
            index++;
        }
        return boardArr
    }
    return {createGameBoard, boardArr, board}
})();



const gamemaster = () => {
    //Start Game
    gameboard.createGameBoard()
    player1.playerMoves = [];
    player2.playerMoves = [];;

    //player 1 goes first
    let currentPlayer = player1;

    // figure out whose turn it is
    let gameSquare = document.querySelectorAll('.square');

    const playerInputHandler = (e) => {
        let index = e.target.dataset.index;
        let isOccupied = gameboard.boardArr[index].occupied;
        if (isOccupied === 'true') {
            return
        } else {
            e.target.textContent = currentPlayer.getLetter();
            gameboard.boardArr[index].occupied = 'true';
            e.target.dataset.occupied = 'true';
            gameboard.boardArr[index].takenBy = currentPlayer.getLetter();
        } 
        if (currentPlayer === player1 && isOccupied === 'false') {
            player1.playerMoves.push(Number(e.target.dataset.index));
            findWinner();
            currentPlayer = player2;
            
        } else {
            player2.playerMoves.push(Number(e.target.dataset.index));
            findWinner();
            currentPlayer = player1;
        }
        
    };
    
    // figure out if player won on this move

    const findWinner = () => {
        let winConditions = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ]


        // if a player won announce winner
        const checkWinner = () => {
            let result = false;
            for(let i = 0; i < winConditions.length; i++) {
                let playerMoves = currentPlayer.playerMoves;
                if (playerMoves.length >= 3) {
                    result = winConditions[i].every(ele => playerMoves.includes(ele));
                    if (result === true) {
                        let winner = currentPlayer.getName();
                        let winnerEle = document.querySelector('.winner');
                        winnerEle.textContent = `${winner} Wins!`
                        gameSquare.forEach(ele => ele.removeEventListener('click', playerInputHandler));
                        return result
                    }
                }
            }
            return result     
        }     
        return checkWinner()
    } 
    
    gameSquare.forEach(ele => ele.addEventListener('click', playerInputHandler));

    // clear game
    const resetBtn = document.createElement('button');
    resetBtn.classList.add('reset');
    
    resetBtn.textContent = 'Reset';

    const buttonDiv = document.querySelector('.buttons');
    buttonDiv.appendChild(resetBtn);

    const reset = () => {
        player1.playerMoves = [];
        player2.playerMoves = [];
        for (let i = 0; i < gameboard.boardArr.length; i++) {
            gameboard.boardArr[i].occupied = 'false';
            gameboard.boardArr[i].takenBy = '';
        }
        let square = document.querySelectorAll('.square');
        square.forEach(ele => ele.dataset.occupied = 'false');
        square.forEach(ele => ele.textContent = '');
        square.forEach(ele => ele.addEventListener('click', playerInputHandler));
        let winnerEle = document.querySelector('.winner');
        winnerEle.textContent = '';
    }
    resetBtn.addEventListener('click', reset);
};

gamemaster();



