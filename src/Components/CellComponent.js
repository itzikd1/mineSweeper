import {observer} from "mobx-react";
import {useBoard} from "../Context/GameProvidor";
import React, {useState} from "react";
import {CenteredModal} from "./PopUpModel/CenteredModal";
import "../Css/board.css";

function Cell({cell, onRightMouseClick, onLeftMouseClick}) {
    const {revealed, flag, value, superman} = cell;

    //cell display
    function getCellImage() {
        if (superman && !revealed) {
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
                onContextMenu={onRightMouseClick(cell)}
                onClick={onLeftMouseClick(cell)}>
                {getCellImage()}
            </td>
        </>
    )
}

export default observer(Cell);
