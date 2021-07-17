import {observer} from "mobx-react-lite";
import {Button} from "react-bootstrap";
import React from "react";


export default observer(({cell}) => {

    return (
        <>
            <Button onClick={cell.clickCell}>{cell.getVal()}</Button>
        </>
    );

})