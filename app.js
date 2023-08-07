const Player = (name, letter) => {
    const getName = () => name;
    const getLetter = () => letter;
    
    return {getName, getLetter}
}

const player1 = Player('Player 1', 'X');
const player2 = Player('Player 2', 'O');

const gameboard = (() => {
    let boardArr = []; 
    let board = document.querySelector('.gameboard');
    
    const playerInputHandler = (e) => {
        let index = e.target.dataset.index;
        let isOccupied = boardArr[index].occupied;
        if (isOccupied === 'false') {
            e.target.textContent = 'O'; // Temp input
            boardArr[index].occupied = 'true';
            e.target.dateset.occupied = 'true';
        } 
        return
    };
    
    const createGameBoard = () => {
        let index = 0;
        while (boardArr.length < 9) {
            
            let square = document.createElement('div');
            square.classList.add('square')
            square.dataset.index = index;
            square.dataset.occupied = 'false';
            square.addEventListener('click', playerInputHandler)
            board.appendChild(square);
            const spot = {
                name: index,
                occupied: 'false',
            };
            boardArr.push(spot);
            index++;
        }
    }
    return {createGameBoard}
})();

gameboard.createGameBoard()

const gamemaster = () => {
    // figure out whose turn it is
    // figure out if player won on this move
    // if a player won announce winner
    // clear game
};



