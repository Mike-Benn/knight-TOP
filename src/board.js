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

    let adjacencyList = new Map();
    
    const getBoard = () => board;

    const getAdjacencyList = () => adjacencyList;

    // Returns Gamespace at coordinates
    const getSpaceAt = (row , col) => {
        if (row < 0 || row > 7 || col < 0 || col > 7) {
            return "The coordinates entered are out of bounds, please choose a row and column value between 0 and 7.";
        } else {
            return board[row][col];
        }

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

    // Checks all 8 moves of a knight to see if the move is valid, if it is then adds the possible move as an adjacent space
    const generateAdjacents = (row , col) => {
        let adjArray = [];

        if (row - 2 >= 0 && col - 1 >= 0) {
            adjArray.push(getSpaceAt(row - 2 , col - 1));
        }

        if (row - 2 >= 0 && col + 1 <= 7) {
            adjArray.push(getSpaceAt(row - 2 , col + 1));
        }

        if (row - 1 >= 0 && col - 2 >= 0) {
            adjArray.push(getSpaceAt(row - 1 , col - 2));
        }

        if (row - 1 >= 0 && col + 2 <= 7) {
            adjArray.push(getSpaceAt(row - 1 , col + 2));
        }

        if (row + 1 <= 7 && col - 2 >= 0) {
            adjArray.push(getSpaceAt(row + 1 , col - 2));
        }

        if (row + 1 <= 7 && col + 2 <= 7) {
            adjArray.push(getSpaceAt(row + 1, col + 2));
        }

        if (row + 2 <= 7 && col - 1 >= 0) {
            adjArray.push(getSpaceAt(row + 2 , col - 1));
        }

        if (row + 2 <= 7 && col + 1 <= 7) {
            adjArray.push(getSpaceAt(row + 2 , col + 1));
        }
        return adjArray;
    }

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

    
    const generateAdjacencyList = () => {
        let rows = 8;
        let columns = 8;

        for (let i = 0; i < rows; i++) {
            for (let j = 0; j < columns; j++) {
                let gamespace = getSpaceAt(i , j);
                let adjacentNodes = generateAdjacents(i , j);
                adjacencyList.set(gamespace , adjacentNodes);
            }
        }
    }

    // Prints total moves and path taken to target space from starting space
    const knightMoves = (start , end) => {
        let startingNode = getSpaceAt(start[0] , start[1]);
        let currentNode = startingNode;
        let targetNode = getSpaceAt(end[0] , end[1]);
        let visited = new Set();
        visited.add(currentNode);
        let distance = 1;
        let primaryQueue = []; 
        let secondaryQueue = [];
        let adjacentNodes = getAdjacencyList().get(currentNode);
        let parent = new Map();
        let lastParent = currentNode;
        for (let i = 0; i < adjacentNodes.length; i++) {
            primaryQueue.push(adjacentNodes[i]);
            parent.set(adjacentNodes[i] , lastParent);
        }
    
        while (primaryQueue.length > 0 || secondaryQueue.length > 0) {

            while (primaryQueue.length > 0) {
                currentNode = primaryQueue.shift();
                visited.add(currentNode);
                if (currentNode === targetNode) {
                    let returnArray = [distance , []];
                    let i = 0
                    while (i < 10) {
                        returnArray[1].push(currentNode.getName());
                        if (parent.get(currentNode) !== startingNode) {
                            currentNode = parent.get(currentNode);
                        } else {
                            returnArray[1].push(parent.get(currentNode).getName());
                            printResults(returnArray);
                            return;
                            
                        }
                    }
                    
                } else {
                    adjacentNodes = getAdjacencyList().get(currentNode);
                    for (let i = 0; i < adjacentNodes.length; i++) {
                        if (visited.has(adjacentNodes[i]) === false) {
                            secondaryQueue.push(adjacentNodes[i]);
                            parent.set(adjacentNodes[i] , currentNode);
                        }
                    }
                }
            }
            
            primaryQueue = secondaryQueue;
            secondaryQueue = [];
            
            distance++;
        }
        
    }

    // Used in knightMoves to print results to console
    const printResults = (array) => {
        let distance = array[0];
        let path = array[1];
        let length = path.length;

        console.log(`You made it in ${distance} moves! Here's your path:`);
        for (let i = length - 1; i >= 0; i--) {
            console.log(`[${path[i][0]},${path[i][1]}]`);
        }

    }
    return {
        getBoard,
        getAdjacencyList,
        getSpaceAt,
        resetBoard,
        generateBoard,
        generateAdjacencyList,
        printAdjacencyList,
        knightMoves

    }

}
