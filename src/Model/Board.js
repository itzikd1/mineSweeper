import {makeAutoObservable} from "mobx";
import Cell from "./Cell";


export default class Board {
    height;
    width;
    board = [];
    numOfMines = 2;
    points = 0;

    constructor() {
        makeAutoObservable(this);
    }

    startGame = (height, width, numOfMines) => {
        this.board = [];
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

    unveilCell = (cell) => {
        cell.toggleRevealed();
    };

    boardSize() {
        return this.height * this.width
    }

    deployMines() {
        //create random array - way to deploy minds
        let randNums = [];
        let maxLoop;
        for (let i = 0; i < this.boardSize(); i++) {
            randNums.push(i)
        }
        // shuffle the array
        let i = randNums.length - 1;
        let j = 0;
        let temp;
        while (i != 0) {
            //which spot to switch with
            j = Math.floor(Math.random() * (i + 1));
            temp = randNums[i];
            randNums[i] = randNums[j];
            randNums[j] = temp;
            i--
        }

        //take only the number of bombs that you need
        const slicedArray = randNums.slice(0, this.numOfMines);

        // todo alert that bomb amount need to be smaller than board size

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

}
