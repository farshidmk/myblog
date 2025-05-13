import { Difficulty } from "@prisma/client";
import { Dispatch, SetStateAction } from "react";

export type DowrContextType = {
  players: string[];
  setPlayers: Dispatch<SetStateAction<string[]>>;
  wordsDifficulty: Difficulty[];
  setWordsDifficulty: Dispatch<SetStateAction<Difficulty[]>>;
  numberOfPlayers: number;
  setNumberOfPlayers: Dispatch<SetStateAction<number>>;
  gameStep: "choose players" | "in game" | "show result";
  setGameStep: Dispatch<SetStateAction<DowrContextType["gameStep"]>>;
};
