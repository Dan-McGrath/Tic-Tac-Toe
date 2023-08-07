const gameboard = (() => {
    let boardArr = []; 
    let board = document.querySelector('.gameboard');
    
    const playerInputHandler = (e) => {
        let index = e.target.dataset.index;
        let isOccupied = boardArr[index].occupied;
        if (isOccupied === 'false') {
            e.target.textContent = 'O'
        } 
        return
    };
    
    const createGameBoard = () => {
        let index = 0;
        while (boardArr.length < 9) {
            
            let square = document.createElement('div');
            square.classList.add('square')
            square.dataset.index = index;
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

const gamemaster = {};

const player = {};
