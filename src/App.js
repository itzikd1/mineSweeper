import './App.css';
import {Button} from 'react-bootstrap';
import NavBar from './Components/NavBar';
import Setting from './Components/Settings'
import React, {useState} from "react";
import BoardHtml from "./Components/BoardComponent";
import {useBoard} from "./Model/GameProvidor";
import {observer} from "mobx-react";


function App() {
    const game = useBoard();
    const [height, setHeight] = useState(3);
    const [width, setWidth] = useState(3);
    const [numOfMines, setNumOfMines] = useState(2);

    return (
        <div className="App">
            <NavBar/>
            <Setting height={height} onChangeHeight={setHeight} width={width} onChangeWidth={setWidth}
                     numOfMines={numOfMines} onChangeNumOfMines={setNumOfMines}/>
            <Button variant="success" onClick={() => {
                game.startGame(height, width, numOfMines);
                setHeight(game.height);
                setWidth(game.width)
            }}>Start Game</Button>
            <Button variant="warning" onClick={() => {
                game.setCellNeighbours()
            }}>update neigbors</Button>
            <BoardHtml></BoardHtml>
        </div>
    );
}

export default observer(App);
