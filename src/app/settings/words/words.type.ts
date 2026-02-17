import { Difficulty } from "@/types/game";

export type WordsListResponse = {
  data: WordResponse[];
  meta: {
    total: number;
    skip: number;
    take: number;
    count: number;
  };
};

export type WordResponse = {
  id: number;
  word: string;
  difficulty: Difficulty;
  wordCategoryId: number;
  wordCategoryName: string;
};

export type ApiErrorPayload = {
  message?: string;
  errors?: string[];
};
