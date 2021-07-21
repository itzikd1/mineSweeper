import {makeAutoObservable} from "mobx";
import Cell from "./Cell";


export default class Board {
    height;
    width;
    board = [];
    numOfMines = 2;
    points = 0;
    gameStatus = "Normal";

    constructor() {
        makeAutoObservable(this);
    }

    //start game, set board size, deploy minds, update numbers according to bombs
    startGame = (height, width, numOfMines) => {
        this.board = [];
        if (height > 300)
            height = 300;
        if (width > 300)
            width = 300;
        this.height = height;
        this.width = width;
        this.numOfMines = numOfMines;
        this.points = 0;
        for (let x = 0; x < width; x++) {
            let subCol = [];
            for (let y = 0; y < height; y++) {
                subCol.push(new Cell(x, y));
            }
            this.board.push(subCol);
        }
        //deploy minds
        this.deployMines();
        return this;
    };

    //toggle cell - left click
    unveilCell = (cell) => {
        cell.toggleRevealed();
        if (cell.isBomb())
            this.gameStatus = "Lose";
        return this.gameStatus
    };

    //toggle cell - right click
    rightClick = (e, cell) => {
        e.preventDefault();
        cell.toggleFlag()
    };

    //get board size
    getBoardSize() {
        return this.height * this.width
    }

    //deploy mines in random way
    deployMines() {
        //create random array - way to deploy minds
        let randNums = [];
        for (let i = 0; i < this.getBoardSize(); i++) {
            randNums.push(i)
        }
        // shuffle the array
        let i = randNums.length - 1;
        let j = 0;
        let temp;
        while (i !== 0) {
            //which spot to switch with
            j = Math.floor(Math.random() * (i + 1));
            temp = randNums[i];
            randNums[i] = randNums[j];
            randNums[j] = temp;
            i--
        }
        //take only the number of bombs that you need
        const slicedArray = randNums.slice(0, this.numOfMines);
        //sort the array and deploy to board
        slicedArray.sort(function (a, b) {
            return a - b
        });
        let arrayLocation = 0;
        let countLoop = 0;
        for (let x = 0; x < this.width; x++) {
            for (let y = 0; y < this.height; y++) {
                if (slicedArray[arrayLocation] === countLoop) {
                    arrayLocation++;
                    this.board[x][y].setBomb();
                }
                countLoop++
            }
        }
        return this.board;
    }

    //check if cell is bomb
    isBomb(x, y) {
        return this.board[x][y].value === "B";
    }

    //go over board and update value of cells around bombs
    setCellNeighbours = () => {
        for (let x = 0; x < this.width; x++) {
            for (let y = 0; y < this.height; y++) {
                //if found bomb, go around the bomb and add 1 to all values
                if (this.isBomb(x, y)) {
                    if (x > 0) {
                        if (!this.isBomb(x - 1, y)) {
                            this.board[x - 1][y].value += 1
                        }
                        if (y > 0 && !this.isBomb(x - 1, y - 1)) {
                            this.board[x - 1][y - 1].value += 1
                        }
                        if (y < this.height - 1 && !this.isBomb(x - 1, y + 1)) {
                            this.board[x - 1][y + 1].value += 1
                        }
                    }
                    if (x < this.width - 1) {
                        if (!this.isBomb(x + 1, y)) {
                            this.board[x + 1][y].value += 1
                        }
                        if (y > 0 && !this.isBomb(x + 1, y - 1)) {
                            this.board[x + 1][y - 1].value += 1
                        }
                        if (y < this.height - 1 && !this.isBomb(x + 1, y + 1)) {
                            this.board[x + 1][y + 1].value += 1
                        }
                    }
                    if (y > 0) {
                        if (!this.isBomb(x, y - 1)) {
                            this.board[x][y - 1].value += 1
                        }
                    }
                    if (y < this.height - 1) {
                        if (!this.isBomb(x, y + 1)) {
                            this.board[x][y + 1].value += 1
                        }
                    }
                }
            }
        }
        return this.board;
    }


}
