import CellComponent from "./CellComponent";
import {observer} from "mobx-react-lite";
import {useBoard} from "../Context/GameProvidor";
import {Container} from "react-bootstrap"
import React from "react";


function BoardComponent() {
    const game = useBoard();

    return (<>
            <Container className='board-container'>
                {game.board.map((row, x) => {
                    return (
                        <tr key={x}>
                            {row.map((cell, y) => (
                                <CellComponent className='cell-container' key={y} cell={cell}/>
                            ))}
                        </tr>
                    );
                })}
            </Container>
        </>
    )
}

export default observer(BoardComponent)