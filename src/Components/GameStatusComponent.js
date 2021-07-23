import React from "react";
import {useBoard} from "../Context/GameProvidor";
import {observer} from "mobx-react";


function GameStatusComponent() {
    const game = useBoard();
    const imageWidth="200px";
    let content;
    if (game.gameStatus === "Win" || game.gameStatus === "Won") {
        content = <div><img style={{maxWidth: imageWidth}} src={"win.png"} alt={"Win"}/></div>
    } else if (game.gameStatus === "Lose" || game.gameStatus === "Lost") {
        content = <div><img style={{maxWidth: imageWidth}} src={"gameOver.png"} alt={"Lost"}/></div>
    } else
        content = <div><img style={{maxWidth: imageWidth}} src={"think.gif"} alt={"Normal"}/></div>;


    return (
        <>
            {content}
        </>
    );
}
export default observer(GameStatusComponent);
