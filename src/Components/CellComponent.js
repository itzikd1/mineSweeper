import {observer} from "mobx-react";
import {useBoard} from "../Model/GameProvidor";
import {Button} from "react-bootstrap";
import React from "react";

function Cell({cell}) {
    const {revealed, flag, value} = cell;
    const game = useBoard();

    function cellState() {
        if (flag) {
            return "F"
        } else if (revealed)
            return value;
        else
            return "?"
    }

    return (
        <>
            <Button onContextMenu={(e) => game.rightClick(e, cell)}
                    onClick={() => {
                        game.unveilCell(cell);
                        if (game.gameStatus === "Lose")
                            console.log("lose")
                        // Todo alert player lost + show map
                    }
                    }>
                {cellState()}</Button>
        </>
    )
}

export default observer(Cell);
