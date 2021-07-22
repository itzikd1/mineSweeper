import React, {useState} from "react";
import './App.css';
import {Button} from 'react-bootstrap';
import {useBoard} from "./Context/GameProvidor";
import {observer} from "mobx-react";
import NavBarComponent from './Components/NavBarComponent';
import Setting from './Components/SettingsComponent'
import BoardComponent from "./Components/BoardComponent";
import GameStatusComponent from "./Components/GameStatusComponent";

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
            <NavBarComponent/>

            <GameStatusComponent></GameStatusComponent>

            <Setting height={height} onChangeHeight={setHeight} width={width} onChangeWidth={setWidth}
                     numOfMines={numOfMines} onChangeNumOfMines={setNumOfMines} numOfFlags={game.numOfFlags}/>

            <Button variant="success" onClick={() => {
                handleStartGame();
            }}>Start Game</Button>

            <BoardComponent/>
        </div>
    );
}

export default observer(App);
