import CellHtml from "./CellComponent";
import {observer} from "mobx-react-lite";
import {useBoard} from "../Model/GameProvidor";
import React from "react";


function BoardComponent() {
    const game = useBoard();

    return (<>
            {game.board.map((row, x) => {
                return (
                    <div>
                        {row.map((cell, y) => (
                            <CellHtml cell={cell}/>
                        ))}
                    </div>
                );
            })}
        </>
    )
}

export default observer(BoardComponent)