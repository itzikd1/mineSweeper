import {observer} from "mobx-react";
import {useBoard} from "../Model/GameProvidor";
import {Button} from "react-bootstrap";
import React from "react";

function Cell({cell}) {
    const {revealed, flag, value} = cell;
    const game = useBoard();

    return (
        <>
            <Button onClick={() => game.unveilCell(cell)}>{revealed ? "2" : "?"}</Button>
        </>
    )
}

export default observer(Cell);
