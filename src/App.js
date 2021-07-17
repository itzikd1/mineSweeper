import './App.css';
import {Button} from 'react-bootstrap';
import NavBar from './Components/NavBar';
import Setting from './Components/Settings'
import React from "react";
import BoardHtml from "./Components/BoardComponent";


function App() {

    return (
        <div className="App">
            <NavBar/>
            <Setting/>
            <Button variant="success">Start Game</Button>
            <BoardHtml></BoardHtml>
        </div>
    );
}

export default App;
