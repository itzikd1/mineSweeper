import {makeAutoObservable} from "mobx";

export default class Cell {
    value;
    x;
    y;
    revealed;
    flag;

    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.revealed = false;
        this.flag = false;
        this.value = 0;
        makeAutoObservable(this);
    }

    getVal = () => {
        return this.value
    };

    setBomb = () => (this.value = "B"); //B means bomb

    toggleFlag = () => (this.flag = !this.flag);

    toggleRevealed = () => (this.revealed = !this.revealed);

    clickCell = () => {
        //if no flag and unrevealed, reveal the cell
        if (!this.flag & !this.revealed) {
            this.revealed = true;
        } else {
            return this.value;
        }
    }
}