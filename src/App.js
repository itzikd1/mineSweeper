import './App.css';
import {Button} from 'react-bootstrap';
import NavBar from './Components/NavBar';
import Board from './Components/Board';
import Setting from './Components/Settings'
import React from "react";

function App() {
    return (
        <div className="App">
            <NavBar/>
            <Setting/>
            <Button variant="success">Start Game</Button>
            <Board height="10" width="10"/>
        </div>
    );
}

export default App;
