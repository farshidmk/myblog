export enum Difficulty {
  easy = "easy",
  medium = "medium",
  hard = "hard",
}

export type GameWordCategory = {
  id: string;
  name: string;
};

export type GameWord = {
  id: string;
  word: string;
  categoryId: string;
  difficulty: Difficulty;
};
