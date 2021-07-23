import {makeAutoObservable} from "mobx";

export default class Cell {
    value;
    x;
    y;
    revealed;
    flag;
    superman;
    visited;

    constructor(x, y) {
        this.visited = false
        this.x = x;
        this.y = y;
        this.revealed = false;
        this.flag = false;
        this.value = 0;
        this.superman = false;
        makeAutoObservable(this);
    }

    setBomb = () => (this.value = "B"); //B means bomb

    isBomb = () => (this.value === "B"); //B means bomb

    toggleFlag = () => {
        if (!this.revealed)
            this.flag = !this.flag
    };

    toggleVisited = () => {
        if (this.visited)
            this.visited = false
    };

    toggleSuperMan = () => {
        this.superman = !this.superman
    };

    toggleRevealed = () => {
        if (!this.revealed && !this.flag)
            this.revealed = true
    };

}