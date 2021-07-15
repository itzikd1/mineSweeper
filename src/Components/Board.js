import {Button} from "react-bootstrap";
import React from "react";


export default function Board({height, width}) {

    let board = [];

    for (let x = 0; x < width; x++) {
        let subCol = [];
        for (let y = 0; y < height; y++) {
            subCol.push({
                value: 0,
                x: x,
                y: y,
                revealed: false,
                flagged: false,
            });
        }
        board.push(subCol);
    }
    return (<>
            {board.map((singleRow, index1) => {
                return (
                    <div key={index1}>
                        {singleRow.map((singleCol, index2) => {
                            return <Button key={index2}>ok</Button>
                        })}
                    </div>
                )
            })}
        </>
    );
}

