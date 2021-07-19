import React, {useContext} from "react";
import {useLocalObservable} from "mobx-react";
import Board from './Board';

const GameContext = React.createContext();

export function useBoard() {
    return useContext(GameContext);
}

export default function GameProvider({children, length, height, numOfMines}) {
    const game = useLocalObservable(() => new Board(length, height, numOfMines));
    return (
        <GameContext.Provider value={game}>
            {children}
        </GameContext.Provider>);
}
