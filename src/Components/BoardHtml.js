import CellHtml from "./CellHtml";
import {observer, useLocalObservable} from "mobx-react-lite";
import {useBoard} from "./BoardProvidor";
import React from "react";


export default observer(() => {
    const game = useBoard();
    let liveGame = game.startGame();

    //make observer watch whats inside here
    const gameStore = useLocalObservable(() => ({
        board: liveGame,

        //functions
        changeRevealed(x, y) {
            liveGame[x][y].revealed = !liveGame[x][y].revealed;
            console.log(liveGame[x][y]);
        }
    }));

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
//
//     //update cell
//     const updateCellHidden = (cellVal) => {
//         cellVal.revealed=true;
//     }

})

//

// }

