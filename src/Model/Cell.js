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

    setValue = (val) => (this.value = val);

    setBomb = () => (this.value = 9);     //9 means bomb

    toggleFlag = () => (this.flag = !this.flag);

    toggleRevealed = () => (this.revealed = !this.revealed);

    clickCell = () => {
        console.log("cell clicked ", this);
        //if no flag and unrevealed, reveal the cell
        if (this.flag !== true & this.revealed === false) {
            return this.revealed = true;
        } else { //todo for testing, change in the future
            return this.value = this.value + 1
        }
    }
}