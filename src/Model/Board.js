import {makeAutoObservable} from "mobx";
import Cell from "./Cell";


export default class Board {
    height = 5;
    width = 5;
    board = [];
    numOfMines = 3;
    numOfFlags = 3;
    points = 0;
    gameStatus = "Normal";

    constructor() {
        makeAutoObservable(this);
    }

    //set board height - max 300
    setHeight = value => {
        if (value > 300) {
            this.height = 300;
        } else if (value < 1) {
            this.height = 1;
        } else
            this.height = value;
    };

    //set bored width - max 300
    setWidth = value => {
        if (value > 300)
            this.width = 300;
        else if (value < 1)
            this.width = 1;
        else
            this.width = value;
    };

    //get board size
    getBoardSize = () => this.height * this.width;

    //set number of mines - max as board size
    setNumOfMines = value => {
        if (value > this.getBoardSize())
            this.numOfMines = this.getBoardSize();
        else if (value < 1)
            this.numOfMines = 1;
        else
            this.numOfMines = value;
    };

    //check if cell is bomb
    isBomb = (x, y) => this.board[x][y].value === "B";

    //check if cell is zero
    isZero = (x, y) => this.board[x][y].value === 0;

    //check if cell has a flag
    isFlag = (x, y) => this.board[x][y].flag === true;

    //increase board value at x,y by 1
    increaseBoardValue = (x, y) => {
        this.board[x][y].value += 1
    };

    //start game, set board size, deploy minds, update numbers according to bombs
    startGame = (height, width, numOfMines) => {
        //board properties
        this.board = [];
        this.setHeight(height);
        this.setWidth(width);
        this.setNumOfMines(numOfMines);
        this.numOfFlags = this.numOfMines;
        this.gameStatus = "Normal";
        this.points = 0;
        //create the board cells
        for (let width = 0; width < this.width; width++) {
            let subCol = [];
            for (let height = 0; height < this.height; height++) {
                subCol.push(new Cell(width, height));
            }
            this.board.push(subCol);
        }
        //deploy minds
        this.deployMines();
        //set numbers around bombs
        this.setCellNeighbours();
    };

    //toggle cell - left click
    unveilCell = (e, cell) => {
        //shift key + left click --> flag mode
        if (e.shiftKey) {
            this.flagClick();
            this.checkIfWin();
        } else {
            //regular click
            if (cell.revealed && cell.isBomb())
                return;
            else if (cell.value === 0) {
                this.revealAllEmpty(cell.x, cell.y);
                this.exposeZeroNeighbors()
            } else
                cell.toggleRevealed();
            if (cell.isBomb())
                this.gameStatus = "Lose";
            else
                this.checkIfWin();
        }
    };

    //toggle cell - right click
    flagClick = (e, cell, setModalFlagShow) => {
        e.preventDefault();
        if (!cell.revealed) {
            //remove flag
            if (cell.flag) {
                cell.toggleFlag();
                this.numOfFlags += 1
            } else {
                //add flag
                if (this.numOfFlags > 0) {
                    cell.toggleFlag();
                    this.numOfFlags -= 1;
                    this.checkIfWin();
                } else {
                    //if no flags left
                    setModalFlagShow(true)
                }
            }
        }
    };

    //deploy mines in random way
    deployMines = () => {
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
    };

    //go over board and update value of cells around bombs
    setCellNeighbours = () => {
        for (let x = 0; x < this.width; x++) {
            for (let y = 0; y < this.height; y++) {
                //if found bomb, go around the bomb and add 1 to all values
                if (this.isBomb(x, y)) {
                    if (x > 0) {
                        if (!this.isBomb(x - 1, y)) {
                            this.increaseBoardValue(x - 1, y);
                        }
                        if (y > 0 && !this.isBomb(x - 1, y - 1)) {
                            this.increaseBoardValue(x - 1, y - 1);
                        }
                        if (y < this.height - 1 && !this.isBomb(x - 1, y + 1)) {
                            this.increaseBoardValue(x - 1, y + 1);
                        }
                    }
                    if (x < this.width - 1) {
                        if (!this.isBomb(x + 1, y)) {
                            this.increaseBoardValue(x + 1, y);
                        }
                        if (y > 0 && !this.isBomb(x + 1, y - 1)) {
                            this.increaseBoardValue(x + 1, y - 1);
                        }
                        if (y < this.height - 1 && !this.isBomb(x + 1, y + 1)) {
                            this.increaseBoardValue(x + 1, y + 1);
                        }
                    }
                    if (y > 0) {
                        if (!this.isBomb(x, y - 1)) {
                            this.increaseBoardValue(x, y - 1);
                        }
                    }
                    if (y < this.height - 1) {
                        if (!this.isBomb(x, y + 1)) {
                            this.increaseBoardValue(x, y + 1);
                        }
                    }
                }
            }
        }
    };

//check if all flags are on bombs -> true = win
    checkIfWin = () => {
        if (this.numOfFlags === 0) {
            for (let x = 0; x < this.width; x++) {
                for (let y = 0; y < this.height; y++) {
                    //check for every cell if it has a bomb and if it is flagged
                    if ((this.isBomb(x, y) && !this.isFlag(x, y)) || (!this.isBomb(x, y) && this.isFlag(x, y)))
                        return
                }
            }
            this.gameStatus = "Win"
        }
    };

    solveBoard = () => {
        for (let x = 0; x < this.width; x++) {
            for (let y = 0; y < this.height; y++) {
                this.board[x][y].revealed = true
            }
        }
    }
    //if clicked cell is empty, reveal all the neighbors connected to it
    revealAllEmpty = (x, y) => {
        if (!this.isZero(x, y) || this.isBomb(x, y) || this.isFlag(x, y) || this.board[x][y].revealed)
            return;
        this.board[x][y].revealed = true;
        //check neighbors in recursion
        //left side
        if (x > 0) {
            if (this.isZero(x - 1, y))
                this.revealAllEmpty(x - 1, y);
            if (y > 0 && this.isZero(x - 1, y - 1))
                this.revealAllEmpty(x - 1, y - 1);
            if (y < this.height - 1 && this.isZero(x - 1, y + 1))
                this.revealAllEmpty(x - 1, y + 1)
        }
        //right side
        if (x < this.width - 1) {
            if (this.isZero(x + 1, y))
                this.revealAllEmpty(x + 1, y);
            if (y > 0 && this.isZero(x + 1, y - 1))
                this.revealAllEmpty(x + 1, y - 1);
            if (y < this.height - 1 && this.isZero(x + 1, y + 1))
                this.revealAllEmpty(x + 1, y + 1)
        }
        //above
        if (y > 0) {
            if (this.isZero(x, y - 1))
                this.revealAllEmpty(x, y - 1)
        }
        //under
        if (y < this.height - 1) {
            if (this.isZero(x, y + 1))
                this.revealAllEmpty(x, y + 1)
        }
    };

    //go over board and reveal numbers around the zeroes
    exposeZeroNeighbors = () => {
        for (let x = 0; x < this.width; x++) {
            for (let y = 0; y < this.height; y++) {
                if (this.isZero(x, y) && this.board[x][y].revealed === true) {
                    //left side
                    if (x > 0) {
                        if (!this.isBomb(x - 1, y) && !this.isFlag(x - 1, y)) {
                            this.board[x - 1][y].revealed = true
                        }
                        if (y > 0 && !this.isBomb(x - 1, y - 1) && !this.isFlag(x - 1, y - 1)) {
                            this.board[x - 1][y - 1].revealed = true
                        }
                        if (y < this.height - 1 && !this.isBomb(x - 1, y + 1) && !this.isFlag(x - 1, y + 1)) {
                            this.board[x - 1][y + 1].revealed = true
                        }
                    }
                    //right side
                    if (x < this.width - 1) {
                        if (!this.isBomb(x + 1, y) && !this.isFlag(x + 1, y)) {
                            this.board[x + 1][y].revealed = true
                        }
                        if (y > 0 && !this.isBomb(x + 1, y - 1) && !this.isFlag(x + 1, y - 1)) {
                            this.board[x + 1][y - 1].revealed = true
                        }
                        if (y < this.height - 1 && !this.isBomb(x + 1, y + 1) && !this.isFlag(x + 1, y + 1)) {
                            this.board[x + 1][y + 1].revealed = true
                        }
                    }
                    //above
                    if (y > 0) {
                        if (!this.isBomb(x, y - 1) && !this.isFlag(x, y - 1)) {
                            this.board[x][y - 1].revealed = true
                        }
                    }
                    //under
                    if (y < this.height - 1) {
                        if (!this.isBomb(x, y + 1) && !this.isFlag(x, y + 1)) {
                            this.board[x][y + 1].revealed = true
                        }
                    }
                }
            }
        }
        return this.board;
    }


    supermanMode = () => {
        for (let x = 0; x < this.width; x++) {
            for (let y = 0; y < this.height; y++) {
                this.board[x][y].revealed = true;
            }
        }
    };
}
