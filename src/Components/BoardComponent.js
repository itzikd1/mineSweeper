import CellComponent from "./CellComponent";
import {observer} from "mobx-react-lite";
import {useBoard} from "../Context/GameProvidor";
import {Container} from "react-bootstrap"
import React, {useState} from "react";
import ModalPopUpComponent from "./ModalPopUpComponent"


function BoardComponent() {
    const game = useBoard();

    const [modalShowLose, setModalShowLose] = useState(false);
    const [modalShowWin, setModalShowWin] = useState(false);
    const [modalFlagShow, setModalFlagShow] = useState(false);

    function onRightMouseClick(cell) {
        return (e) => {
            game.flagClick(e, cell, setModalFlagShow);
            if (game.gameStatus === "Win") {
                setModalShowWin(true);
                game.solveBoard()
            }
        };
    }

    function onLeftMouseClick(cell) {
        return (e) => {
            game.unveilCell(e, cell);
            if (game.gameStatus === "Lose") {
                setModalShowLose(true);
                game.solveBoard()
            }
            if (game.gameStatus === "Win") {
                setModalShowWin(true);
                game.solveBoard()
            }
        };
    }

    return (<>
            <Container className='board-container'>
                {game.board.map((row, rowIndex) => {
                    return (
                        <tr key={rowIndex}>
                            {row.map((cell, colIndex) => (
                                <CellComponent onLeftMouseClick={onLeftMouseClick} onRightMouseClick={onRightMouseClick}
                                               className='cell-container' key={colIndex} cell={cell}/>
                            ))}
                        </tr>
                    );
                })}
            </Container>
            <ModalPopUpComponent modalShowLose={modalShowLose} setModalShowLose={setModalShowLose}
                                 modalShowWin={modalShowWin} setModalShowWin={setModalShowWin}
                                 modalFlagShow={modalFlagShow} setModalFlagShow={setModalFlagShow}/>
        </>
    )
}

export default observer(BoardComponent)