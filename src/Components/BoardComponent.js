import CellComponent from "./CellComponent";
import {observer} from "mobx-react-lite";
import {useBoard} from "../Context/GameProvidor";
import React from "react";


function BoardComponent() {
    const game = useBoard();

    return (<>
            {game.board.map((row, x) => {
                return (
                    <div key={x}>
                        {row.map((cell, y) => (
                            <CellComponent key={y} cell={cell}/>
                        ))}
                    </div>
                );
            })}
        </>
    )
}

export default observer(BoardComponent)