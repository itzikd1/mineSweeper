import {makeAutoObservable} from "mobx";
import Cell from "./Cell";


export default class Board {

    height;
    width;
    board;

    constructor(height, width) {
        makeAutoObservable(this);
        this.height = height;
        this.width = width;
    }

    startGame = () => {
        this.board = [];
        for (let x = 0; x < this.width; x++) {
            let subCol = [];
            for (let y = 0; y < this.height; y++) {
                subCol.push(new Cell(x, y));
            }
            this.board.push(subCol);
        }
        return this.board;
    }
}
