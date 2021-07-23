import Board from "../Model/Board";

let board = new Board();

afterEach(() => {
    board = new Board();
});

test('creation of Board constructor - height', () => {
    expect(board.height).toBe(5);
});

test('creation of Board constructor - width', () => {
    expect(board.width).toBe(5);
});

test('creation of Board constructor - number of mines', () => {
    expect(board.numOfMines).toBe(3);
});

test('creation of Board constructor - number of flags', () => {
    expect(board.numOfFlags).toBe(3);
});

test('creation of Board constructor - gameStatus', () => {
    expect(board.gameStatus).toBe("Normal");
});

test('board height over 300', () => {
    board.setHeight(500);
    expect(board.height).toBe(300);
});

test('board height under 1', () => {
    board.setHeight(-5);
    expect(board.height).toBe(1);
});

test('board height between 1-300', () => {
    board.setHeight(34);
    expect(board.height).toBe(34);
});

test('board width over 300', () => {
    board.setWidth(500);
    expect(board.width).toBe(300);
});

test('board width under 1', () => {
    board.setWidth(-5);
    expect(board.width).toBe(1);
});

test('board width between 1-300', () => {
    board.setWidth(34);
    expect(board.width).toBe(34);
});

test('board size should be 25', () => {
    expect(board.getBoardSize()).toBe(25);
});

test('board size should be 36', () => {
    board.setWidth(4);
    board.setHeight(9);
    expect(board.getBoardSize()).toBe(36);
});

test('number of mines should be 4', () => {
    board.setNumOfMines(4);
    expect(board.numOfMines).toBe(4);
});

test('create more mines then board size, number of mines should be 25', () => {
    board.setNumOfMines(555);
    expect(board.numOfMines).toBe(25);
});


test('start game - check number of mines,height and width', () => {
    board.startGame(2,2,2);
    expect(board.numOfMines).toBe(2);
    expect(board.height).toBe(2);
    expect(board.width).toBe(2);
});


test('start game - check number of mines,flags,zeroes on board', () => {
    board.startGame(2,2,2);
    let countBombs=0
    let countZeroes= 0
    let countFlag= 0
    for(let i=0; i<board.height; i++)
        for(let j=0; j<board.width; j++) {
            if (board.isBomb(i, j))
                countBombs++;
            if(board.isZero(i,j))
                countZeroes++;
            if(board.isFlag(i,j))
                countFlag++;
        }
    expect(countBombs).toBe(2);
    expect(countZeroes).toBe(0);
    expect(countFlag).toBe(0);
});

