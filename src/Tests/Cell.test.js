import Cell from "../Model/Cell"

let cell=new Cell(1,1);

afterEach(() => {
    cell=new Cell(1,1)
});

test('creation of cell flag default is false', () => {
    expect(cell.flag).toBeFalsy();
});

test('creation of cell start with a value of 0', () => {
    expect(cell.value).toBe(0);
});

test('constructor creates cell with x=1', () => {
    expect(cell.x).toBe(1);});

test('constructor creates cell with y=1', () => {
    expect(cell.y).toBe(1);
});

test('creation of cell revealed field is false', () => {
    expect(cell.revealed).toBeFalsy();
});

test('creation of cell superman field should be false', () => {
    expect(cell.superman).toBeFalsy();
});

test('toggle of cell superman field should be true', () => {
    cell.toggleSuperMan();
    expect(cell.superman).toBeTruthy();
});

test('toggle of cell revealed field should be true', () => {
    cell.toggleRevealed();
    expect(cell.revealed).toBeTruthy();
});

test('toggle of cell flag field should be true', () => {
    cell.toggleFlag();
    expect(cell.flag).toBeTruthy();
});

test('set a bomb inside of cell should be true', () => {
    cell.setBomb();
    expect(cell.isBomb()).toBeTruthy();
});

test('toggle of flag when cell is revealed should return false', () => {
    cell.toggleRevealed();
    cell.toggleFlag();
    expect(cell.flag).toBeFalsy();
});

test('toggle of cell that has a bomb should return true', () => {
    cell.setBomb();
    cell.toggleFlag();
    expect(cell.isBomb()).toBeTruthy();
});

test('toggle of cell that has a bomb and flag should be false', () => {
    cell.toggleFlag();
    cell.setBomb();
    cell.toggleRevealed();
    expect(cell.revealed).toBeFalsy();
});

test('reveal cell that  has a flag should return false', () => {
    cell.toggleFlag();
    cell.toggleRevealed();
    expect(cell.revealed).toBeFalsy();
});

