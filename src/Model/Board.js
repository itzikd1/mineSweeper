import {makeAutoObservable} from "mobx";
import Cell from "./Cell";


export default class Board {
    board = [];
    numOfMines = 2;
    points = 0;

    constructor() {
        makeAutoObservable(this);
    }

    startGame = (height, width, numOfMines) => {
        this.board = [];
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
        const {x, y} = cell;
        const updatedBoard = [...this.board];
        const updatedRow = [...updatedBoard[x]];
        const updatedCell = new Cell(this.board[x][y]);
        updatedCell.toggleRevealed();
        updatedRow[y] = updatedCell;
        updatedBoard[x] = updatedRow;
        this.board = updatedBoard;
    }


}
