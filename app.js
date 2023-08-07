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
        let index = 0;
        while (boardArr.length < 9) {
            
            let square = document.createElement('div');
            square.classList.add('square')
            square.dataset.index = index;
            square.dataset.occupied = 'false';
            board.appendChild(square);
            const spot = {
                name: index,
                occupied: 'false',
            };
            boardArr.push(spot);
            index++;
        }
        return boardArr
    }
    return {createGameBoard, boardArr}
})();



const gamemaster = () => {
    //Start Game
    gameboard.createGameBoard()


    //player 1 goes first
    let playerInput = player1.getLetter();

    // figure out whose turn it is
    let gameSquare = document.querySelectorAll('.square');

    const playerInputHandler = (e) => {
        
        let index = e.target.dataset.index;

        let isOccupied = gameboard.boardArr[index].occupied;
        if (isOccupied === 'false') {
            e.target.textContent = playerInput;
            gameboard.boardArr[index].occupied = 'true';
            e.target.dataset.occupied = 'true';
            
        } 
        if (playerInput === 'X') {
           playerInput = player2.getLetter(); 
        } else {
            playerInput = player1.getLetter();
        }
        

    };
    
    // figure out if player won on this move

    const findWinner = (e) => {
        console.log('Hello')
    } 
    // if a player won announce winner
    gameSquare.forEach(ele => ele.addEventListener('click', playerInputHandler));
    gameSquare.forEach(ele => ele.addEventListener('click', findWinner));
    // clear game
};

gamemaster();



