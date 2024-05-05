import { Gamespace } from "./gamespace";
export { Board };

function Board() {
    let board = [
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        []
    ];
    
    const getBoard = () => board;

    const getSpaceAt = (row , col) => {
        return board[row][col];
    }

    const resetBoard = () => {
        board = [
            [],
            [],
            [],
            [],
            [],
            [],
            [],
            []
        ]
    };

    const generateBoard = () => {
        let rows = 8;
        let columns = 8;
        resetBoard();

        for (let i = 0; i < rows; i++) {
            for (let j = 0; j < columns; j++) {
                let gamespace = Gamespace();
                gamespace.setCoordinates(i , j);
                gamespace.setName(`${i}${j}`);
                board[i][j] = gamespace;
                
            }
        }

    }


}
