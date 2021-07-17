import {makeAutoObservable} from "mobx";

export default class Cell {
    value;
    x;
    y;
    revealed;
    flag;

    constructor(x, y) {
        makeAutoObservable(this);
        this.x = x;
        this.y = y;
        this.revealed = false;
        this.flag = false;
        this.value = 0;
    }

    getVal = () => {
        return this.value
    };

    toggleFlag = () => (this.flag = !this.flag);

    toggleRevealed = () => (this.revealed = !this.revealed);

    clickCell = () => {
        if (this.flag !== true & this.revealed === false) {
            return this.revealed = true;
        } else {
            return this.value = this.value + 1
        }
    }
}