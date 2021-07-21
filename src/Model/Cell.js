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

    setBomb = () => (this.value = "B"); //B means bomb

    toggleFlag = () => {
        if (this.revealed === false)
            this.flag = !this.flag
    };

    toggleRevealed = () => {
        if (!this.revealed && !this.flag)
            this.revealed = true
    };

}