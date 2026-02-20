"use client";
import { createContext, useState } from "react";
import { DowrContextType } from "../_types/dowrType";
import { Difficulty } from "@/types/game";

export const DowrGameContext = createContext<DowrContextType>({
  numberOfPlayers: 4,
  setNumberOfPlayers: () => {},
  players: [],
  setPlayers: () => {},
  wordsDifficulty: [Difficulty.easy],
  setWordsDifficulty: () => {},
  gameStep: "choose players",
  setGameStep: () => {},
});

type Props = {
  children: React.ReactNode;
};

const DowrGameProvider = ({ children }: Props) => {
  const [numberOfPlayers, setNumberOfPlayers] =
    useState<DowrContextType["numberOfPlayers"]>(4);
  const [players, setPlayers] = useState<DowrContextType["players"]>([]);
  const [wordsDifficulty, setWordsDifficulty] = useState<
    DowrContextType["wordsDifficulty"]
  >([]);
  const [gameStep, setGameStep] =
    useState<DowrContextType["gameStep"]>("choose players");
  return (
    <DowrGameContext.Provider
      value={{
        numberOfPlayers,
        players,
        wordsDifficulty,
        setNumberOfPlayers,
        setPlayers,
        setWordsDifficulty,
        gameStep,
        setGameStep,
      }}
    >
      {children}
    </DowrGameContext.Provider>
  );
};

export default DowrGameProvider;
