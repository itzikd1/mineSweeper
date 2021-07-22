import React, {useContext} from "react";
import {useLocalObservable} from "mobx-react";
import Board from '../Model/Board';

const GameContext = React.createContext();

export function useBoard() {
    return useContext(GameContext);
}

export default function GameProvider({children}) {
    const game = useLocalObservable(() => new Board());
    return (
        <GameContext.Provider value={game}>
            {children}
        </GameContext.Provider>);
}
