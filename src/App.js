import React, {useState} from "react";
import './App.css';
import {Button} from 'react-bootstrap';
import {useBoard} from "./Context/GameProvidor";
import {observer} from "mobx-react";
import NavBar from './Components/NavBar';
import Setting from './Components/Settings'
import BoardComponent from "./Components/BoardComponent";

function App() {
    const game = useBoard();
    const [height, setHeight] = useState(5);
    const [width, setWidth] = useState(5);
    const [numOfMines, setNumOfMines] = useState(1);

    function handleStartGame() {
        game.startGame(height, width, numOfMines);
        setHeight(game.height);
        setWidth(game.width);
        setNumOfMines(game.numOfMines)
    }

    return (
        <div className="App">
            <NavBar/>

            <Setting height={height} onChangeHeight={setHeight} width={width} onChangeWidth={setWidth}
                     numOfMines={numOfMines} onChangeNumOfMines={setNumOfMines} numOfFlags={game.numOfFlags}/>

            <Button variant="success" onClick={() => {
                handleStartGame();
            }}>Start Game</Button>

            <BoardComponent/>

            <TimerView timer={myTimer}/>

        </div>
    );
}

export default observer(App);
