import {makeAutoObservable} from "mobx";

export default class Cell {
    value: 0;
    x: 0;
    y: 0;
    revealed: false;
    flag: false;

    constructor(x, y) {
        makeAutoObservable(this);
        this.x = x;
        this.y = y;
        this.revealed = false;
        this.flag = false;
        this.value = 0;
    }

    toggleFlag = () => (this.flag = !this.flag);

    toggleRevealed = () => (this.revealed = !this.revealed);

    clickCell = () => {
        if (this.flag !== true & this.revealed === false) {
            return this.revealed = true;
        }
    }
}