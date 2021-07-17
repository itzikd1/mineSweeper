import React, {useContext} from "react";
import {useLocalObservable} from "mobx-react";
import Board from '../Model/Board';

const BoardContext = React.createContext();

export function useBoard() {
    return useContext(BoardContext);
}

export default function GameProvider({children}) {
    const game = useLocalObservable(() => new Board(3, 3));
    return (
        <BoardContext.Provider value={game}>
            {children}
        </BoardContext.Provider>);
}
