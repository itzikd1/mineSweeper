import './App.css';
import {Button} from 'react-bootstrap';
import NavBar from './Components/NavBar';
import Setting from './Components/Settings'
import React, {useState} from "react";
import BoardComponent from "./Components/BoardComponent";
import {useBoard} from "./Context/GameProvidor";
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
                     numOfMines={numOfMines} onChangeNumOfMines={setNumOfMines} numOfFlags={game.numOfFlags}/>

            <Button variant="success" onClick={() => {
                game.startGame(height, width, numOfMines);
                setHeight(game.height);
                setWidth(game.width);
            }}>Start Game</Button>
            <BoardComponent></BoardComponent>
        </div>
    );
}

export default observer(App);
