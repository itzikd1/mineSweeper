import {observer, useLocalObservable} from "mobx-react-lite";
import {Button} from "react-bootstrap";
import React from "react";


export default observer(({cell}) => {
    //make observer watch whats inside here
    const cellStore = useLocalObservable(() => ({
        cell: cell,
    }));

    return (
        <>
            <Button onClick={cell.clickCell}/>
        </>
    );

})