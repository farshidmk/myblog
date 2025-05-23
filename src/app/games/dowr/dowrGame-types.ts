import { Difficulty, GameWordCategory } from "@prisma/client";

export type DowrChoosePlayer = {
  players: { name: string }[];
  categories: GameWordCategory["id"][];
  difficulty: Difficulty[];
};
