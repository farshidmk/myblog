import { Difficulty, GameWordCategory } from "@/types/game";

export type DowrChoosePlayer = {
  players: { name: string }[];
  categories: GameWordCategory["id"][];
  difficulty: Difficulty[];
};
