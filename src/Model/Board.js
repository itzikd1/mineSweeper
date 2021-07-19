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
        if (this.boardSize() > this.numOfMines)
            maxLoop = this.numOfMines;
        else
            console.log("to many bombs");
        // todo alert that bomb amount need to be smaller then
        for (let i = 0; i < maxLoop; i++) {
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
        console.log(randNums);

        //
        // //todo check that number of mines<board size
        // let boardSize = this.board.height * this.board.length;
        // let bombArray = randNums;
        // for (let x = 0; x < this.width; x++) {
        //     let subCol = [];
        //     for (let y = 0; y < this.height; y++) {
        //         //add the bombs
        //     }
        //     this.board.push(subCol);
        // }
        return this.board;
    }

}
