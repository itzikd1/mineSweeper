import {observer} from "mobx-react";
import {useBoard} from "../Context/GameProvidor";
import {Button} from "react-bootstrap";
import React, {useState} from "react";
import {CenteredModal} from "./PopUpModel/CenteredModal";

function Cell({cell}) {
    const {revealed, flag, value} = cell;
    const game = useBoard();
    const [modalShow, setModalShow] = useState(false);
    const [modalFlagShow, setModalFlagShow] = useState(false);

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
            <Button
                onContextMenu={(e) => game.flagClick(e, cell, setModalFlagShow)}
                onClick={(e) => {
                    game.unveilCell(e, cell);
                    if (game.gameStatus === "Lose") {
                        setModalShow(true);
                    }
                }
                }>
                {cellState()}</Button>
            <CenteredModal show={modalShow} onHide={() => {
                setModalShow(false);
                game.gameStatus = "Lost"
            }}
                           title={"You Lost!"} text={"You hit a bomb"}/>
            <CenteredModal show={modalFlagShow} onHide={() => {
                setModalFlagShow(false);
            }}
                           title={"No Flags Left"}
                           text={"You have used all your flags. you cant place anymore flags on the map."}/>
        </>
    )
}

export default observer(Cell);
