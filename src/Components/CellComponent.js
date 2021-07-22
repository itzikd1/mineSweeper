import {observer} from "mobx-react";
import {useBoard} from "../Context/GameProvidor";
import React, {useState} from "react";
import {CenteredModal} from "./PopUpModel/CenteredModal";
import "../Css/board.css";
import {Container} from "react-bootstrap";

function Cell({cell}) {
    const {revealed, flag, value, superman} = cell;
    const game = useBoard();
    const [modalShowLose, setModalShowLose] = useState(false);
    const [modalShowWin, setModalShowWin] = useState(false);
    const [modalFlagShow, setModalFlagShow] = useState(false);

    //cell display
    function cellState() {
        if (superman) {
            if (flag)
                return <img className='img-trans' src={"flag.png"} alt={"Flag"}/>;
            if (cell.isBomb())
                return <img className='img-trans' src={"bomb.png"} alt={"Bomb"}/>;
            else {
                return <img className='img-trans' src={value + ".png"} alt={"Value"}/>;
            }
        }
        if (flag) {
            return <img src={"flag.png"} alt={"Flag"}/>;
        } else if (revealed)
            if (cell.isBomb())
                return <img src={"bomb.png"} alt={"Bomb"}/>;
            else {
                return <img src={value + ".png"} alt={"Value"}/>;
            }
        else
            return <img src={"question1.png"} alt={"?"}/>;
    }


    return (
        <>
            <td
                onContextMenu={(e) => {
                    game.flagClick(e, cell, setModalFlagShow);
                    if (game.gameStatus === "Win") {
                        setModalShowWin(true);
                        game.solveBoard()
                    }
                }}
                onClick={(e) => {
                    game.unveilCell(e, cell);
                    if (game.gameStatus === "Lose") {
                        setModalShowLose(true);
                        game.solveBoard()
                    }
                    if (game.gameStatus === "Win") {
                        setModalShowWin(true);
                        game.solveBoard()
                    }
                }
                }>
                {cellState()}
            </td>

            {/*modals*/}
            <CenteredModal show={modalShowLose} onHide={() => {
                setModalShowLose(false);
                game.gameStatus = "Lost"
            }}
                           title={"You Lost!"} text={"You hit a bomb"}/>

            <CenteredModal show={modalShowWin} onHide={() => {
                setModalShowWin(false);
                game.gameStatus = "Won"
            }}
                           title={"You Won!"} text={"You have found all the bombs!"}/>

            <CenteredModal show={modalFlagShow} onHide={() => {
                setModalFlagShow(false);
            }}
                           title={"No Flags Left"}
                           text={"You have used all your flags. you cant place anymore flags on the map."}/>
        </>
    )
}

export default observer(Cell);
