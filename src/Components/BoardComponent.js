import CellHtml from "./CellComponent";
import {observer} from "mobx-react-lite";
import {useBoard} from "./BoardProvidor";
import React from "react";


export default observer(() => {
    const game = useBoard();
    let liveGame = game.startGame();

    return (<>
            <div>
            </div>
            {liveGame.map((row, x) => {
                return (
                    <div>
                        {row.map((cell, y) => (
                            <CellHtml cell={cell}/>
                        ))}
                    </div>
                );
            })}
        </>
    );
})