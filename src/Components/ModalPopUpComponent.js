import {CenteredModal} from "./PopUpModel/CenteredModal";
import React from "react";
import {observer} from "mobx-react";
import {useBoard} from "../Context/GameProvidor";

function ModalPopUpComponent({modalShowLose, setModalShowLose, modalShowWin, setModalShowWin, modalFlagShow, setModalFlagShow}) {
    const game = useBoard();

    return (
        <>
            <CenteredModal show={modalShowLose} onHide={() => {
                setModalShowLose(false);
                game.gameStatus = "Lost"
            }}
                           title={"You Lost!"} text={"You hit a bomb"}/>

            < CenteredModal
                show={modalShowWin}
                onHide={() => {
                    setModalShowWin(false);
                    game.gameStatus = "Won"
                }
                }
                title={"You Won!"}
                text={"You have found all the bombs!"}
            />

            <CenteredModal show={modalFlagShow} onHide={() => {
                setModalFlagShow(false);
            }}
                           title={"No Flags Left"}
                           text={"You have used all your flags. you cant place anymore flags on the map."}/>
        </>
    );
}
export default observer(ModalPopUpComponent);