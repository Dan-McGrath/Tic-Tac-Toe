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
        let name = 1;
        while (boardArr.length < 9) {
            let square = document.createElement('div');
            square.classList.add('square')
            square.dataset.index = index;
            square.dataset.occupied = 'false';
            board.appendChild(square);
            const spot = {
                index: index,
                occupied: 'false',
                name: name,
            };
            boardArr.push(spot);
            index++;
            //Number by row
            if (name > 2) {
                name = 0
            }
            name++;
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
            gameboard.boardArr[index].takenBy = playerInput
        } 
        if (playerInput === 'X') {
           playerInput = player2.getLetter(); 
        } else {
            playerInput = player1.getLetter();
        }
        

    };
    
    // figure out if player won on this move

    const findWinner = (e) => {
        let player1Score = 0;
        let player2Score = 0;
        
        console.log(gameboard.boardArr);
    } 
    // if a player won announce winner
    gameSquare.forEach(ele => ele.addEventListener('click', playerInputHandler));
    gameSquare.forEach(ele => ele.addEventListener('click', findWinner));
    // clear game
};

gamemaster();



